import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Scissors,
    Truck,
    Clock,
    CheckCircle2,
    ChevronRight,
    MapPin,
    Calendar,
    Shirt
} from "lucide-react";
import Link from "next/link";

const MOCK_ORDERS = [
    {
        id: "TM-9821-X",
        date: "21 Feb 2026",
        type: "Pickup",
        status: "At_Hub",
        item: "Navy Blue Suit",
        tailor: "Master Ibrahim",
        address: "123 Tailor Lane, Bangalore",
        progress: 40
    },
    {
        id: "TM-9745-Y",
        date: "18 Feb 2026",
        type: "Visit",
        status: "Stitching",
        item: "Linen Shirt (Custom)",
        tailor: "Sartorial Sam",
        address: "456 Fashion Ave, Bangalore",
        progress: 75
    },
    {
        id: "TM-9612-Z",
        date: "10 Feb 2026",
        type: "DIY",
        status: "Ready_for_Delivery",
        item: "Cotton Trousers",
        tailor: "Stitch Studio",
        address: "789 Design Blvd, Bangalore",
        progress: 100
    }
];

const STATUS_CONFIG: Record<string, { label: string; color: string; icon: any }> = {
    'Pending_Pickup': { label: 'Pending Pickup', color: 'bg-yellow-100 text-yellow-800', icon: Clock },
    'At_Hub': { label: 'At Distribution Hub', color: 'bg-blue-100 text-blue-800', icon: Truck },
    'Stitching': { label: 'With Tailor', color: 'bg-purple-100 text-purple-800', icon: Scissors },
    'QC_Pending': { label: 'Quality Check', color: 'bg-orange-100 text-orange-800', icon: CheckCircle2 },
    'Ready_for_Delivery': { label: 'Out for Delivery', color: 'bg-green-100 text-green-800', icon: MapPin },
};

export default function OrdersPage() {
    return (
        <main className="min-h-screen bg-secondary/10 py-8 md:py-16">
            <div className="container px-4 md:px-8 max-w-4xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-serif font-bold tracking-tight">My Orders</h1>
                        <p className="text-muted-foreground">Track and manage your custom tailoring requests.</p>
                    </div>
                    <Link href="/book">
                        <Button className="gap-2">
                            <Scissors className="h-4 w-4" /> New Booking
                        </Button>
                    </Link>
                </div>

                <div className="space-y-6">
                    {MOCK_ORDERS.map((order) => {
                        const status = STATUS_CONFIG[order.status] || STATUS_CONFIG['Pending_Pickup'];
                        const StatusIcon = status.icon;

                        return (
                            <Card key={order.id} className="overflow-hidden hover:shadow-md transition-shadow border-l-4 border-l-primary">
                                <div className="p-6">
                                    <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
                                        <div className="flex items-start gap-4">
                                            <div className="h-12 w-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center shrink-0">
                                                <Shirt className="h-6 w-6" />
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <h3 className="font-bold text-lg">{order.item}</h3>
                                                    <Badge variant="secondary" className="text-[10px] font-bold">
                                                        {order.id}
                                                    </Badge>
                                                </div>
                                                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                                    <span className="flex items-center gap-1">
                                                        <Calendar className="h-3 w-3" /> {order.date}
                                                    </span>
                                                    <span className="flex items-center gap-1 capitalize">
                                                        <Badge variant="outline" className="text-[10px] px-1 h-4">{order.type}</Badge>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-end gap-2">
                                            <Badge className={`${status.color} border-none px-3 py-1 flex items-center gap-1 text-xs`}>
                                                <StatusIcon className="h-3 w-3" />
                                                {status.label}
                                            </Badge>
                                            <span className="text-xs text-muted-foreground font-medium">
                                                Tailor: <span className="text-foreground">{order.tailor}</span>
                                            </span>
                                        </div>
                                    </div>

                                    {/* Progress Bar */}
                                    <div className="space-y-2 mb-6">
                                        <div className="flex justify-between text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                                            <span>Progress</span>
                                            <span>{order.progress}%</span>
                                        </div>
                                        <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-primary transition-all duration-500"
                                                style={{ width: `${order.progress}%` }}
                                            />
                                        </div>
                                    </div>

                                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-4 border-t text-sm">
                                        <div className="flex items-center gap-2 text-muted-foreground">
                                            <MapPin className="h-4 w-4" />
                                            <span className="truncate max-w-[250px]">{order.address}</span>
                                        </div>
                                        <Link href={`/orders/${order.id}`}>
                                            <Button variant="ghost" size="sm" className="gap-2 text-primary hover:text-primary hover:bg-primary/10">
                                                View Details <ChevronRight className="h-4 w-4" />
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </Card>
                        );
                    })}
                </div>

                {/* Promotional Card */}
                <Card className="mt-12 bg-primary text-primary-foreground border-none">
                    <CardContent className="p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="space-y-2 text-center md:text-left">
                            <h3 className="text-xl font-bold">Need help with your order?</h3>
                            <p className="text-primary-foreground/80 text-sm">
                                Our concierge team is available 24/7 for any alterations or logistics queries.
                            </p>
                        </div>
                        <Button variant="secondary" className="whitespace-nowrap">
                            Contact Support
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </main>
    );
}
