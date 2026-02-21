import { Button } from "@/components/ui/button";
import { Calendar, Ruler, Shirt } from "lucide-react";
import Link from "next/link";

export default function BookingPage() {
    return (
        <main className="min-h-screen bg-secondary/20 py-12 md:py-24">
            <div className="container px-4 md:px-8 max-w-screen-lg mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-5xl font-serif font-bold mb-4">How should we measure you?</h1>
                    <p className="text-muted-foreground text-lg mb-6">
                        Choose the method that works best for you. We guarantee a perfect fit with all three.
                    </p>
                    <Link href="/pricing" className="text-primary hover:underline font-medium">
                        Not sure about costs? View our Rate Card &rarr;
                    </Link>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {/* Option 1: Schedule Visit */}
                    <div className="bg-card rounded-xl border-2 border-primary/10 shadow-sm p-6 relative hover:border-primary/50 transition-colors cursor-pointer group">
                        <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
                            RECOMMENDED
                        </div>
                        <div className="h-14 w-14 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                            <Calendar className="h-7 w-7" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">Schedule a Visit</h3>
                        <p className="text-sm text-muted-foreground mb-6">
                            One of our expert master tailors will visit your home to take precise measurements.
                        </p>
                        <ul className="text-sm space-y-2 mb-6 text-muted-foreground">
                            <li>• Expert consultation</li>
                            <li>• Fabric feel & touch</li>
                            <li>• 100% Fit Guarantee</li>
                        </ul>
                        <Link href="/book/schedule">
                            <Button className="w-full">Book Appointment</Button>
                        </Link>
                    </div>

                    {/* Option 2: Send Sample */}
                    <div className="bg-card rounded-xl border border-border shadow-sm p-6 hover:border-primary/50 transition-colors cursor-pointer group">
                        <div className="h-14 w-14 bg-secondary text-secondary-foreground rounded-full flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                            <Shirt className="h-7 w-7" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">Pickup a Sample</h3>
                        <p className="text-sm text-muted-foreground mb-6">
                            We'll pick up your best-fitting garment along with your fabric and copy the fit exactly.
                        </p>
                        <ul className="text-sm space-y-2 mb-6 text-muted-foreground">
                            <li>• Use your favorite fit</li>
                            <li>• Zero hassle</li>
                            <li>• Sample returned safe</li>
                        </ul>
                        <Link href="/book/pickup">
                            <Button variant="outline" className="w-full">Schedule Pickup</Button>
                        </Link>
                    </div>

                    {/* Option 3: DIY */}
                    <div className="bg-card rounded-xl border border-border shadow-sm p-6 hover:border-primary/50 transition-colors cursor-pointer group">
                        <div className="h-14 w-14 bg-secondary text-secondary-foreground rounded-full flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                            <Ruler className="h-7 w-7" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">Measure Yourself</h3>
                        <p className="text-sm text-muted-foreground mb-6">
                            Follow our smart video guide to take your own measurements in 5 minutes.
                        </p>
                        <ul className="text-sm space-y-2 mb-6 text-muted-foreground">
                            <li>• Instant & Easy</li>
                            <li>• Video guided</li>
                            <li>• Instant Quote</li>
                        </ul>
                        <Link href="/book/measure">
                            <Button variant="outline" className="w-full">Start Measuring</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}
