"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, CalendarCheck, Loader2 } from "lucide-react";
import Link from "next/link";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function SchedulePage() {
    const router = useRouter();
    const supabase = createClient();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        day: "today",
        timeSlot: "morning",
        address: "",
        city: "Bangalore",
        zip: ""
    });

    const handleConfirm = async () => {
        setLoading(true);
        try {
            const { data: { user } } = await supabase.auth.getUser();
            const customerId = user?.id || "00000000-0000-0000-0000-000000000000";

            const payload = {
                customer_id: customerId,
                measurements: {
                    custom_notes: {
                        method: "home_visit",
                        preferred_day: formData.day,
                        time_slot: formData.timeSlot
                    }
                },
                order_details: {
                    type: "visit",
                    details: {
                        address: formData.address,
                        city: formData.city,
                        zip: formData.zip,
                        preferred_day: formData.day,
                        time_slot: formData.timeSlot
                    }
                }
            };

            const response = await fetch("http://localhost:5001/order/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to create order");
            }

            router.push("/book/success");
        } catch (error) {
            console.error("Error creating appointment:", error);
            alert("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-secondary/20 py-8 md:py-16">
            <div className="container px-4 md:px-8 max-w-lg mx-auto">
                <Link href="/book" className="flex items-center text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Options
                </Link>

                <div className="text-center mb-8">
                    <h1 className="text-3xl font-serif font-bold mb-2">Schedule a Visit</h1>
                    <p className="text-muted-foreground">
                        A Master Tailor will arrive at your doorstep to take measurements and collect fabric.
                    </p>
                </div>

                <Card className="border-t-4 border-t-primary">
                    <CardHeader>
                        <CardTitle>Appointment Details</CardTitle>
                        <CardDescription>Select a convenient time for you.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {/* Date Selection */}
                        <div className="space-y-3">
                            <Label>Preferred Day</Label>
                            <RadioGroup
                                defaultValue={formData.day}
                                onValueChange={(val) => setFormData({ ...formData, day: val })}
                                className="grid grid-cols-3 gap-2"
                            >
                                {['Today', 'Tomorrow', 'Sat, 14th'].map((day) => (
                                    <div key={day}>
                                        <RadioGroupItem value={day.toLowerCase()} id={day} className="peer sr-only" />
                                        <Label
                                            htmlFor={day}
                                            className="flex flex-col items-center justify-center rounded-md border border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:text-primary cursor-pointer text-sm font-medium h-12"
                                        >
                                            {day}
                                        </Label>
                                    </div>
                                ))}
                            </RadioGroup>
                        </div>

                        {/* Time Selection */}
                        <div className="space-y-3">
                            <Label>Time Slot</Label>
                            <RadioGroup
                                defaultValue={formData.timeSlot}
                                onValueChange={(val) => setFormData({ ...formData, timeSlot: val })}
                                className="grid grid-cols-2 gap-2"
                            >
                                <div>
                                    <RadioGroupItem value="morning" id="morning" className="peer sr-only" />
                                    <Label htmlFor="morning" className="flex items-center justify-center rounded-md border border-muted bg-popover p-3 peer-data-[state=checked]:border-primary peer-data-[state=checked]:text-primary cursor-pointer">
                                        10 AM - 1 PM
                                    </Label>
                                </div>
                                <div>
                                    <RadioGroupItem value="evening" id="evening" className="peer sr-only" />
                                    <Label htmlFor="evening" className="flex items-center justify-center rounded-md border border-muted bg-popover p-3 peer-data-[state=checked]:border-primary peer-data-[state=checked]:text-primary cursor-pointer">
                                        4 PM - 8 PM
                                    </Label>
                                </div>
                            </RadioGroup>
                        </div>

                        <div className="space-y-4 pt-4 border-t">
                            <h3 className="font-semibold text-sm text-foreground/80">Pickup Address</h3>
                            <div className="space-y-2">
                                <Label htmlFor="address">Street Address</Label>
                                <Input
                                    id="address"
                                    placeholder="Flat No, Building, Street"
                                    value={formData.address}
                                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="city">City</Label>
                                    <Input
                                        id="city"
                                        value={formData.city}
                                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="zip">Pincode</Label>
                                    <Input
                                        id="zip"
                                        placeholder="560001"
                                        value={formData.zip}
                                        onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>

                        <Button
                            className="w-full"
                            size="lg"
                            onClick={handleConfirm}
                            disabled={loading || !formData.address || !formData.zip}
                        >
                            {loading ? (
                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            ) : (
                                <CalendarCheck className="h-4 w-4 mr-2" />
                            )}
                            Confirm Appointment
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </main>
    );
}
