import os
from flask import Flask, request, jsonify
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

url: str = os.environ.get("SUPABASE_URL")
key: str = os.environ.get("SUPABASE_KEY")

print(f"Debug: URL is {'Set' if url else 'None'}")
print(f"Debug: Key is {'Set' if key else 'None'}")

try:
    if not url or not key:
        raise ValueError("Supabase URL or Key is missing")
    supabase: Client = create_client(url, key)
    print("Debug: Supabase client initialized successfully")
except Exception as e:
    print(f"Critical Error initializing Supabase: {e}")
    # Don't exit, let Flask run so we can see the logs, but API will fail
    supabase = None

@app.route('/health', methods=['GET'])
def health_check():
    status = "healthy"
    db_status = "connected" if supabase else "disconnected"
    return jsonify({
        "status": status,
        "database": db_status,
        "supabase_initialized": supabase is not None
    }), 200

def validate_qc(order_id, status):
    """
    Helper function to flag an order for Admin review 
    once a tailor marks it as QC_Pending.
    """
    if status == 'QC_Pending':
        # In a real system, this might send an email or update a specific 'needs_review' flag.
        # For now, we will just log it.
        print(f"Order {order_id} flagged for Admin QC Review.")
        return True
    return False

@app.route('/order/create', methods=['POST'])
def create_order():
    if not supabase:
        return jsonify({"error": "Database connection unavailable"}), 503
    """
    Capture design images and measurement data from the customer.
    Expected JSON:
    {
        "customer_id": "uuid",
        "measurements": { "bust": 10, "waist": 10, "length": 10, "custom_notes": {}, "sample_garment_ref": "url" },
        "order_details": { "type": "visit", "details": {} }
    }
    """
    data = request.get_json()
    customer_id = data.get('customer_id')
    measurements_data = data.get('measurements')
    order_details = data.get('order_details')

    if not customer_id or not measurements_data:
        return jsonify({"error": "Missing required fields"}), 400

    try:
        # 1. Insert Measurements
        measure_payload = {
            "customer_id": customer_id,
            "bust": measurements_data.get('bust'),
            "waist": measurements_data.get('waist'),
            "length": measurements_data.get('length'),
            "custom_notes": measurements_data.get('custom_notes'),
            "sample_garment_ref": measurements_data.get('sample_garment_ref')
        }
        measure_res = supabase.table('measurements').insert(measure_payload).execute()
        measurement_id = measure_res.data[0]['id']

        # 2. Insert Order
        order_payload = {
            "customer_id": customer_id,
            "measurement_id": measurement_id,
            "type": order_details.get('type', 'visit'),
            "status": 'Pending_Pickup',
            "details": order_details.get('details', {})
        }
        order_res = supabase.table('orders').insert(order_payload).execute()

        return jsonify({
            "message": "Order created successfully",
            "order": order_res.data[0],
            "measurement": measure_res.data[0]
        }), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/hub/dashboard', methods=['GET'])
def hub_dashboard():
    if not supabase:
        return jsonify({"error": "Database connection unavailable"}), 503
    """
    View for the Admin to see all orders currently 'At_Hub'.
    """
    try:
        response = supabase.table('orders').select('*, profiles(full_name)').eq('status', 'At_Hub').execute()
        return jsonify(response.data), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/order/status', methods=['PATCH'])
def update_order_status():
    if not supabase:
        return jsonify({"error": "Database connection unavailable"}), 503
    """
    Allow Tailors to move an order to 'QC_Pending' and upload a photo.
    Expected JSON:
    {
        "order_id": "uuid",
        "status": "QC_Pending",
        "finished_garment_photo": "url"
    }
    """
    data = request.get_json()
    order_id = data.get('order_id')
    new_status = data.get('status')
    photo_url = data.get('finished_garment_photo')

    if not order_id or not new_status:
        return jsonify({"error": "Missing order_id or status"}), 400

    try:
        # Update payload
        update_payload = {"status": new_status}
        
        # If there's a photo, we assume we store it in details for now as the schema 
        # doesn't have a specific column for it on the orders table directly, 
        # or we update details json.
        if photo_url:
            # First fetch existing details to merge
            existing = supabase.table('orders').select('details').eq('id', order_id).execute()
            current_details = existing.data[0]['details'] or {}
            current_details['finished_garment_photo'] = photo_url
            update_payload['details'] = current_details

        response = supabase.table('orders').update(update_payload).eq('id', order_id).execute()
        
        # Trigger QC Logic
        validate_qc(order_id, new_status)

        return jsonify({"message": "Status updated", "order": response.data[0]}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
