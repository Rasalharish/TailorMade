"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowLeft, Save, Info, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function MeasurePage() {
    const router = useRouter();
    const supabase = createClient();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        gender: "men",
        neck: "",
        shoulder: "",
        chest: "",
        waist: "",
        hips: "",
        sleeve: "",
        inseam: "",
        length: "",
        notes: ""
    });

    const handleSave = async () => {
        setLoading(true);
        try {
            const { data: { user } } = await supabase.auth.getUser();
            const customerId = user?.id || "00000000-0000-0000-0000-000000000000";

            const payload = {
                customer_id: customerId,
                measurements: {
                    bust: parseFloat(formData.chest) || 0,
                    waist: parseFloat(formData.waist) || 0,
                    length: parseFloat(formData.length) || 0,
                    custom_notes: {
                        method: "diy_measurement",
                        gender: formData.gender,
                        neck: formData.neck,
                        shoulder: formData.shoulder,
                        hips: formData.hips,
                        sleeve: formData.sleeve,
                        inseam: formData.inseam,
                        notes: formData.notes
                    }
                },
                order_details: {
                    type: "diy",
                    details: {
                        notes: formData.notes
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
            console.error("Error saving measurements:", error);
            alert("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    return (
        <main className="min-h-screen bg-secondary/20 py-8 md:py-16">
            <div className="container px-4 md:px-8 max-w-2xl mx-auto">
                <Link href="/book" className="flex items-center text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Options
                </Link>

                <div className="text-center mb-8">
                    <h1 className="text-3xl font-serif font-bold mb-2">My Measurements</h1>
                    <p className="text-muted-foreground">
                        Accurate measurements ensure a perfect fit. Grab a tape measure!
                    </p>
                </div>

                <Card className="border-t-4 border-t-primary">
                    <CardHeader>
                        <CardTitle>Profile Details</CardTitle>
                        <CardDescription>Tell us who we are making this for.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-8">
                        {/* Gender Selection */}
                        <div className="space-y-3">
                            <Label>Who is this for?</Label>
                            <RadioGroup
                                defaultValue={formData.gender}
                                onValueChange={(val) => setFormData({ ...formData, gender: val })}
                                className="grid grid-cols-2 gap-4"
                            >
                                <div>
                                    <RadioGroupItem value="men" id="men" className="peer sr-only" />
                                    <Label
                                        htmlFor="men"
                                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:text-primary cursor-pointer"
                                    >
                                        <span className="mb-2 text-xl">🤵</span>
                                        Men
                                    </Label>
                                </div>
                                <div>
                                    <RadioGroupItem value="women" id="women" className="peer sr-only" />
                                    <Label
                                        htmlFor="women"
                                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:text-primary cursor-pointer"
                                    >
                                        <span className="mb-2 text-xl">💃</span>
                                        Women
                                    </Label>
                                </div>
                            </RadioGroup>
                        </div>

                        <div className="border-t pt-6">
                            <h3 className="font-semibold mb-4 flex items-center gap-2">
                                Upper Body
                                <span className="text-xs font-normal text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">Inches</span>
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <Label htmlFor="neck">Neck</Label>
                                        <Info className="h-3 w-3 text-muted-foreground" />
                                    </div>
                                    <Input id="neck" placeholder="e.g. 15.5" value={formData.neck} onChange={handleChange} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="shoulder">Shoulder Width</Label>
                                    <Input id="shoulder" placeholder="Bone to bone" value={formData.shoulder} onChange={handleChange} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="chest">Chest / Bust</Label>
                                    <Input id="chest" placeholder="Around fullest part" value={formData.chest} onChange={handleChange} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="waist">Waist</Label>
                                    <Input id="waist" placeholder="Natural waistline" value={formData.waist} onChange={handleChange} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="hips">Hips</Label>
                                    <Input id="hips" placeholder="Widest part" value={formData.hips} onChange={handleChange} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="sleeve">Sleeve Length</Label>
                                    <Input id="sleeve" placeholder="Shoulder to wrist" value={formData.sleeve} onChange={handleChange} />
                                </div>
                            </div>
                        </div>

                        <div className="border-t pt-6">
                            <h3 className="font-semibold mb-4">Lower Body</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="inseam">Inseam</Label>
                                    <Input id="inseam" placeholder="Crotch to ankle" value={formData.inseam} onChange={handleChange} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="length">Full Length</Label>
                                    <Input id="length" placeholder="Waist to floor" value={formData.length} onChange={handleChange} />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2 pt-4">
                            <Label htmlFor="notes">Additional Fit Preferences</Label>
                            <Input id="notes" placeholder="e.g. I prefer a slim fit, loose sleeves..." value={formData.notes} onChange={handleChange} />
                        </div>

                        <Button
                            className="w-full"
                            size="lg"
                            onClick={handleSave}
                            disabled={loading || !formData.chest || !formData.waist || !formData.length}
                        >
                            {loading ? (
                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            ) : (
                                <Save className="h-4 w-4 mr-2" />
                            )}
                            Save Measurements
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </main>
    );
}
