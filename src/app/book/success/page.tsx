import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, ShoppingBag, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function SuccessPage() {
    return (
        <main className="min-h-screen bg-secondary/20 flex items-center justify-center p-4">
            <div className="max-w-md w-full">
                <Card className="text-center p-8 border-t-8 border-t-green-500 shadow-xl">
                    <div className="flex justify-center mb-6">
                        <div className="h-20 w-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                            <CheckCircle2 className="h-12 w-12" />
                        </div>
                    </div>

                    <CardHeader className="p-0 mb-4">
                        <CardTitle className="text-3xl font-serif font-bold">Booking Confirmed!</CardTitle>
                    </CardHeader>

                    <CardContent className="p-0">
                        <p className="text-muted-foreground mb-8">
                            Your tailoring request has been received. Our partner will arrive at your location for the pickup as scheduled.
                        </p>

                        <div className="space-y-3">
                            <Link href="/">
                                <Button className="w-full" variant="outline">
                                    Return Home
                                </Button>
                            </Link>
                            <Link href="/orders">
                                <Button className="w-full gap-2">
                                    View My Orders <ArrowRight className="h-4 w-4" />
                                </Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>

                <div className="mt-8 bg-white/50 backdrop-blur p-4 rounded-lg border flex items-center gap-4">
                    <div className="h-10 w-10 bg-primary/10 text-primary rounded-full flex items-center justify-center">
                        <ShoppingBag className="h-5 w-5" />
                    </div>
                    <div>
                        <p className="text-sm font-medium">Coming Soon</p>
                        <p className="text-xs text-muted-foreground">Order tracking with live map updates.</p>
                    </div>
                </div>
            </div>
        </main>
    );
}
