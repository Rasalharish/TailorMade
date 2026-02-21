"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Scissors,
    Truck,
    Clock,
    CheckCircle2,
    MapPin,
    ArrowLeft,
    Phone,
    Navigation,
    Shirt,
    Package
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

const MOCK_ORDER_DATA = {
    "TM-9821-X": {
        item: "Navy Blue Suit",
        status: "At_Hub",
        tailor: "Master Ibrahim",
        customer: "John Doe",
        address: "123 Tailor Lane, Bangalore",
        date: "21 Feb 2026",
        phone: "+91 98765 43210",
        timeline: [
            { status: "Order Placed", time: "09:00 AM", done: true },
            { status: "Partner Assigned", time: "09:15 AM", done: true },
            { status: "Sample Picked Up", time: "10:30 AM", done: true },
            { status: "At Distribution Hub", time: "12:00 PM", done: true, current: true },
            { status: "With Tailor", time: "Scanning...", done: false },
            { status: "Stitching Started", time: "Pending", done: false },
        ]
    }
};

export default function OrderDetailsPage() {
    const params = useParams();
    const orderId = params.id as string;
    const order = MOCK_ORDER_DATA[orderId as keyof typeof MOCK_ORDER_DATA] || MOCK_ORDER_DATA["TM-9821-X"];

    // Simulate live movement
    const [progress, setProgress] = useState(40);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => (prev < 45 ? prev + 0.5 : prev));
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <main className="min-h-screen bg-secondary/10 py-8 md:py-16">
            <div className="container px-4 md:px-8 max-w-5xl mx-auto">
                <Link href="/orders" className="flex items-center text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Orders
                </Link>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left Column: Tracking Map & Timeline */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Live Tracking Map (Mock) */}
                        <Card className="overflow-hidden border-none shadow-xl bg-white">
                            <CardHeader className="bg-primary text-primary-foreground p-6">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <CardTitle className="text-xl">Live Tracking</CardTitle>
                                        <CardDescription className="text-primary-foreground/70">
                                            Order ID: {orderId}
                                        </CardDescription>
                                    </div>
                                    <Badge variant="secondary" className="bg-white/20 text-white border-none px-3 py-1 animate-pulse">
                                        <Truck className="h-3 w-3 mr-1" /> Live
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="p-0 relative h-[400px] bg-[#f0f4f8]">
                                {/* Animated Logistics Visualization */}
                                <div className="absolute inset-0 overflow-hidden">
                                    {/* Mock Roadmap Grid */}
                                    <div className="absolute inset-0 opacity-20"
                                        style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

                                    {/* Path Line */}
                                    <div className="absolute top-1/2 left-[10%] right-[10%] h-1 bg-gray-300 -translate-y-1/2" />
                                    <div
                                        className="absolute top-1/2 left-[10%] h-1 bg-primary -translate-y-1/2 transition-all duration-1000"
                                        style={{ width: `${progress}%` }}
                                    />

                                    {/* Nodes */}
                                    <div className="absolute top-1/2 left-[10%] -translate-x-1/2 -translate-y-1/2 text-center">
                                        <div className="h-10 w-10 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg border-4 border-white">
                                            <MapPin className="h-5 w-5" />
                                        </div>
                                        <span className="text-[10px] font-bold mt-2 block">Pickup</span>
                                    </div>

                                    <div className="absolute top-1/2 left-[40%] -translate-x-1/2 -translate-y-1/2 text-center">
                                        <div className="h-12 w-12 bg-primary rounded-full flex items-center justify-center text-white shadow-xl border-4 border-white animate-bounce-slow">
                                            <Truck className="h-6 w-6" />
                                        </div>
                                        <span className="text-[10px] font-bold mt-2 block">Hub</span>
                                    </div>

                                    <div className="absolute top-1/2 left-[70%] -translate-x-1/2 -translate-y-1/2 text-center opacity-50">
                                        <div className="h-10 w-10 bg-gray-400 rounded-full flex items-center justify-center text-white border-4 border-white">
                                            <Scissors className="h-5 w-5" />
                                        </div>
                                        <span className="text-[10px] font-bold mt-2 block">Tailor</span>
                                    </div>

                                    <div className="absolute top-1/2 left-[90%] -translate-x-1/2 -translate-y-1/2 text-center opacity-30">
                                        <div className="h-10 w-10 bg-gray-400 rounded-full flex items-center justify-center text-white border-4 border-white">
                                            <CheckCircle2 className="h-5 w-5" />
                                        </div>
                                        <span className="text-[10px] font-bold mt-2 block">Delivery</span>
                                    </div>
                                </div>

                                {/* Logistics Status Box */}
                                <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur p-4 rounded-xl border shadow-lg flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="h-12 w-12 bg-secondary rounded-full flex items-center justify-center">
                                            <Navigation className="h-6 w-6 text-primary" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold">Partner is at Bangalore Hub</p>
                                            <p className="text-xs text-muted-foreground">Arrived 12:05 PM • Next stop: Master Ibrahim</p>
                                        </div>
                                    </div>
                                    <Button variant="outline" size="sm" className="gap-2">
                                        <Phone className="h-4 w-4" /> Call Partner
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Order Timeline */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Order Status Timeline</CardTitle>
                            </CardHeader>
                            <CardContent className="px-10 pb-10">
                                <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-primary before:via-primary/50 before:to-transparent">
                                    {order.timeline.map((step, idx) => (
                                        <div key={idx} className="relative flex items-center justify-between gap-6">
                                            <div className="flex items-center gap-6">
                                                <div className={`h-10 w-10 rounded-full flex items-center justify-center border-4 border-background z-10 ${step.done ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'}`}>
                                                    {step.done ? <CheckCircle2 className="h-5 w-5" /> : <Clock className="h-5 w-5" />}
                                                </div>
                                                <div>
                                                    <p className={`font-bold ${step.current ? 'text-primary' : 'text-foreground'}`}>
                                                        {step.status}
                                                    </p>
                                                    <p className="text-xs text-muted-foreground">
                                                        {step.time}
                                                    </p>
                                                </div>
                                            </div>
                                            {step.current && (
                                                <Badge className="bg-primary/10 text-primary border-none text-[10px]">CURRENT</Badge>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Column: Order Info */}
                    <div className="space-y-6">
                        <Card className="sticky top-8">
                            <CardHeader>
                                <CardTitle className="text-lg">Order Summary</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="flex items-center gap-4 p-4 bg-secondary/20 rounded-lg">
                                    <div className="h-10 w-10 bg-white rounded flex items-center justify-center shadow-sm">
                                        <Shirt className="h-6 w-6 text-primary" />
                                    </div>
                                    <div>
                                        <p className="font-bold">{order.item}</p>
                                        <p className="text-xs text-muted-foreground">Premium Collection</p>
                                    </div>
                                </div>

                                <div className="space-y-4 text-sm">
                                    <div className="flex justify-between items-start">
                                        <div className="flex items-center gap-2 text-muted-foreground">
                                            <Scissors className="h-4 w-4" />
                                            <span>Assigned Tailor</span>
                                        </div>
                                        <span className="font-bold text-right">{order.tailor}</span>
                                    </div>
                                    <div className="flex justify-between items-start">
                                        <div className="flex items-center gap-2 text-muted-foreground">
                                            <Clock className="h-4 w-4" />
                                            <span>Collection Date</span>
                                        </div>
                                        <span className="font-bold text-right">{order.date}</span>
                                    </div>
                                    <div className="flex justify-between items-start">
                                        <div className="flex items-center gap-2 text-muted-foreground">
                                            <MapPin className="h-4 w-4" />
                                            <span>Delivery Address</span>
                                        </div>
                                        <span className="font-bold text-right max-w-[150px] leading-tight">{order.address}</span>
                                    </div>
                                </div>

                                <div className="pt-6 border-t space-y-3">
                                    <Button className="w-full gap-2">
                                        <Phone className="h-4 w-4" /> Contact Customer Support
                                    </Button>
                                    <Button variant="outline" className="w-full gap-2">
                                        <Package className="h-4 w-4" /> Download Invoice
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Customer Info Card */}
                        <Card>
                            <CardContent className="p-6">
                                <div className="flex items-center gap-4">
                                    <div className="h-12 w-12 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                                        JD
                                    </div>
                                    <div>
                                        <p className="font-bold">{order.customer}</p>
                                        <p className="text-xs text-muted-foreground">{order.phone}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>

            <style jsx global>{`
                @keyframes bounce-slow {
                    0%, 100% { transform: translate(-50%, -50%) translateY(-5px); }
                    50% { transform: translate(-50%, -50%) translateY(5px); }
                }
                .animate-bounce-slow {
                    animation: bounce-slow 3s infinite ease-in-out;
                }
            `}</style>
        </main>
    );
}
