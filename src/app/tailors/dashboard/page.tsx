"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Scissors,
    Truck,
    Clock,
    CheckCircle2,
    TrendingUp,
    Users,
    Package,
    ArrowUpRight,
    Star,
    ChevronRight,
    Search
} from "lucide-react";
import { Input } from "@/components/ui/input";

const MOCK_ASSIGNMENTS = [
    {
        id: "TM-9821-X",
        item: "Navy Blue Suit",
        customer: "John Doe",
        deadline: "25 Feb",
        status: "Cutting",
        priority: "High",
        payout: "₹ 4,500"
    },
    {
        id: "TM-9745-Y",
        item: "Linen Shirt",
        customer: "Sarah Jenkins",
        deadline: "Today",
        status: "Pending_Approval",
        priority: "Urgent",
        payout: "₹ 1,200"
    },
    {
        id: "TM-9612-Z",
        item: "Cotton Trousers",
        customer: "Michael Scott",
        deadline: "28 Feb",
        status: "Stitching",
        priority: "Medium",
        payout: "₹ 2,800"
    }
];

export default function TailorDashboard() {
    return (
        <main className="min-h-screen bg-secondary/10 pb-12">
            {/* Dashboard Header */}
            <div className="bg-white border-b pt-12 pb-8">
                <div className="container px-4 md:px-8 max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="flex items-center gap-4">
                            <div className="h-16 w-16 bg-primary text-white rounded-xl flex items-center justify-center font-serif text-3xl font-bold shadow-lg">
                                MI
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold">Welcome back, Master Ibrahim</h1>
                                <p className="text-muted-foreground text-sm flex items-center gap-2">
                                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Shop Online</Badge>
                                    Bangalore Hub • 4.9⭐ Rating
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <Button variant="outline" size="sm">Manage Shop</Button>
                            <Button size="sm">Request New Order</Button>
                        </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                        <Card className="border-none shadow-sm">
                            <CardContent className="p-4">
                                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">Total Earnings</p>
                                <div className="flex items-center justify-between">
                                    <h3 className="text-xl font-bold">₹ 84,200</h3>
                                    <span className="text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded font-bold flex items-center gap-0.5">
                                        +12% <ArrowUpRight className="h-2 w-2" />
                                    </span>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="border-none shadow-sm">
                            <CardContent className="p-4">
                                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">Active Orders</p>
                                <h3 className="text-xl font-bold">14</h3>
                            </CardContent>
                        </Card>
                        <Card className="border-none shadow-sm">
                            <CardContent className="p-4">
                                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">Customer Re-book</p>
                                <h3 className="text-xl font-bold">82%</h3>
                            </CardContent>
                        </Card>
                        <Card className="border-none shadow-sm">
                            <CardContent className="p-4">
                                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">Hub Efficiency</p>
                                <h3 className="text-xl font-bold">94%</h3>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>

            <div className="container px-4 md:px-8 max-w-7xl mx-auto mt-8 grid md:grid-cols-3 gap-8">
                {/* Orders List */}
                <div className="md:col-span-2 space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-bold">New Assignments</h2>
                        <div className="relative w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="Search orders..." className="pl-9 h-9 text-sm" />
                        </div>
                    </div>

                    <div className="space-y-4">
                        {MOCK_ASSIGNMENTS.map((order) => (
                            <Card key={order.id} className="hover:border-primary transition-colors cursor-pointer group">
                                <CardContent className="p-0">
                                    <div className="flex items-center p-5 gap-6">
                                        <div className="h-12 w-12 bg-secondary rounded-lg flex items-center justify-center shrink-0">
                                            <Scissors className="h-6 w-6 text-primary" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-3 mb-1">
                                                <h4 className="font-bold truncate">{order.item}</h4>
                                                <Badge className={order.priority === 'Urgent' ? 'bg-red-100 text-red-700 border-none' : 'bg-blue-100 text-blue-700 border-none'}>
                                                    {order.priority}
                                                </Badge>
                                            </div>
                                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                                <span>Customer: <span className="text-foreground font-medium">{order.customer}</span></span>
                                                <span>•</span>
                                                <span>ID: <span className="font-mono">{order.id}</span></span>
                                            </div>
                                        </div>
                                        <div className="text-right shrink-0">
                                            <p className="text-lg font-bold text-primary">{order.payout}</p>
                                            <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Est. Payout</p>
                                        </div>
                                        <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                                    </div>
                                    <div className="bg-secondary/20 px-5 py-2 border-t flex items-center justify-between text-[11px] font-bold text-muted-foreground uppercase tracking-widest">
                                        <div className="flex items-center gap-2">
                                            <Clock className="h-3 w-3" /> Deadline: {order.deadline}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Package className="h-3 w-3" /> Status: <span className="text-primary">{order.status}</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Performance Sidebar */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base">Shop Performance</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <div className="flex justify-between text-xs font-bold uppercase">
                                    <span>Quality Score</span>
                                    <span>98%</span>
                                </div>
                                <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                                    <div className="h-full bg-primary" style={{ width: '98%' }} />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between text-xs font-bold uppercase">
                                    <span>Delivery Speed</span>
                                    <span>85%</span>
                                </div>
                                <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                                    <div className="h-full bg-yellow-500" style={{ width: '85%' }} />
                                </div>
                            </div>

                            <Button variant="secondary" className="w-full text-xs">View Full Audit Report</Button>
                        </CardContent>
                    </Card>

                    <Card className="bg-primary text-primary-foreground border-none">
                        <CardContent className="p-6 space-y-4">
                            <div className="flex items-center gap-2">
                                <TrendingUp className="h-5 w-5" />
                                <h3 className="font-bold">Earning Forecast</h3>
                            </div>
                            <p className="text-sm text-primary-foreground/80 leading-relaxed">
                                You have 8 slots remaining this week. Accepting 4 more "Designer Tier" suits could increase your weekly payout by **₹ 18,000**.
                            </p>
                            <Button variant="secondary" className="w-full font-bold">Boost Shop Visibility</Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </main>
    );
}
