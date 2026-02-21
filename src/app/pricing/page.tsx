import { Button } from "@/components/ui/button";
import { Check, Star, Info, HelpCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

const pricingTiers = [
    {
        name: "Standard",
        description: "Perfect for daily wear & simple designs.",
        priceRef: "₹350",
        features: [
            "Basic Machine Stitching",
            "Cotton Lining Options",
            "Standard Delivery (5-7 days)",
            "Free Alterations (1 time)",
            "Phone Support"
        ],
        highlight: false
    },
    {
        name: "Premium",
        description: "Boutique finish for special occasions.",
        priceRef: "₹650",
        features: [
            "Premium Sateen Lining",
            "Princess Cut / Designer Back",
            "Piping & Hand-Finishing",
            "Priority Delivery (3-5 days)",
            "Concierge Support"
        ],
        highlight: true
    },
    {
        name: "Designer",
        description: "Intricate work for weddings & events.",
        priceRef: "Quote",
        features: [
            "Heavy Zardosi / Embroidery",
            "Complex Pattern Drafting",
            "Can-Can / Heavy Padding",
            "Express Delivery (48 Hrs)",
            "Personal Designer Consult"
        ],
        highlight: false
    }
];

const rateCard = [
    { category: "Saree Blouse", standard: "₹350", premium: "₹650", designer: "Custom" },
    { category: "Kurta (Basic)", standard: "₹450", premium: "₹750", designer: "Custom" },
    { category: "Designer Salwar", standard: "₹350", premium: "₹550", designer: "₹1,200+" },
    { category: "Lehenga (Set)", standard: "₹1,200", premium: "₹2,500", designer: "₹8,000+" },
    { category: "Mens Suit (2pc)", standard: "₹3,500", premium: "₹6,500", designer: "₹15,000+" },
];

export default function PricingPage() {
    return (
        <main className="min-h-screen bg-secondary/10 py-16 md:py-24">
            <div className="container px-4 md:px-8 max-w-7xl mx-auto space-y-16">

                {/* Header */}
                <div className="text-center space-y-6 max-w-3xl mx-auto">
                    <Badge variant="secondary" className="bg-accent/10 text-accent border-none px-4 py-1">Pricing Guide 2026</Badge>
                    <h1 className="text-4xl md:text-6xl font-serif font-black tracking-tight text-balance">
                        Investment in your <span className="italic">Perfect Fit</span>
                    </h1>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                        Transparent, upfront pricing for professional tailoring. No hidden charges for thread, zippers, or basic buttons.
                    </p>
                </div>

                {/* Pricing Tiers */}
                <div className="grid lg:grid-cols-3 gap-8">
                    {pricingTiers.map((tier) => (
                        <Card
                            key={tier.name}
                            className={`relative border-none overflow-hidden hover:scale-[1.02] transition-transform duration-300 premium-shadow ${tier.highlight ? "bg-primary text-white scale-105 z-10" : "bg-white"
                                }`}
                        >
                            {tier.highlight && (
                                <div className="absolute top-0 right-0 bg-accent text-white px-6 py-2 rounded-bl-2xl text-[10px] font-black uppercase tracking-widest">
                                    Recommended
                                </div>
                            )}
                            <div className="p-10 space-y-8">
                                <div className="space-y-4">
                                    <h3 className={`text-2xl font-bold ${tier.highlight ? "text-white" : "text-foreground"}`}>
                                        {tier.name}
                                    </h3>
                                    <p className={`text-sm ${tier.highlight ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                                        {tier.description}
                                    </p>
                                </div>

                                <div className="flex items-baseline gap-1">
                                    <span className="text-5xl font-black">{tier.priceRef}</span>
                                    {tier.name !== "Designer" && <span className={`text-sm opacity-60`}>/ per item</span>}
                                </div>

                                <ul className={`space-y-4 pt-8 border-t ${tier.highlight ? "border-white/10" : "border-black/5"}`}>
                                    {tier.features.map((feature) => (
                                        <li key={feature} className="flex items-center gap-3 text-sm">
                                            <div className={`h-5 w-5 rounded-full flex items-center justify-center shrink-0 ${tier.highlight ? "bg-accent/20 text-accent" : "bg-primary/5 text-primary"
                                                }`}>
                                                <Check className="h-3 w-3" />
                                            </div>
                                            <span className={tier.highlight ? "text-primary-foreground/90" : ""}>{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <Link href="/book" className="block pt-8">
                                    <Button
                                        className={`w-full h-12 text-sm font-bold shadow-lg ${tier.highlight ? "bg-white text-primary hover:bg-white/90" : ""
                                            }`}
                                        variant={tier.highlight ? "secondary" : "default"}
                                    >
                                        Choose {tier.name}
                                    </Button>
                                </Link>
                            </div>
                        </Card>
                    ))}
                </div>

                {/* Master Rate Card */}
                <div className="space-y-8 max-w-5xl mx-auto">
                    <div className="flex flex-col md:flex-row items-end justify-between gap-4">
                        <div>
                            <h2 className="text-3xl font-serif font-bold">Standard Rate Card</h2>
                            <p className="text-muted-foreground">Comprehensive pricing for all your garment needs.</p>
                        </div>
                        <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground bg-white px-4 py-2 rounded-full border">
                            <Info className="h-4 w-4 text-primary" /> Prices include GST
                        </div>
                    </div>

                    <div className="bg-white rounded-[2rem] border overflow-hidden premium-shadow">
                        <table className="w-full text-sm text-left border-collapse">
                            <thead>
                                <tr className="bg-secondary/30 text-muted-foreground uppercase text-[10px] font-black tracking-widest border-b">
                                    <th className="px-8 py-6">Garment Category</th>
                                    <th className="px-8 py-6">Standard</th>
                                    <th className="px-8 py-6">Premium</th>
                                    <th className="px-8 py-6">Designer</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-black/5">
                                {rateCard.map((item) => (
                                    <tr key={item.category} className="hover:bg-accent/5 transition-colors">
                                        <td className="px-8 py-6 font-bold">{item.category}</td>
                                        <td className="px-8 py-6 text-muted-foreground">{item.standard}</td>
                                        <td className="px-8 py-6 text-muted-foreground font-medium">{item.premium}</td>
                                        <td className="px-8 py-6 text-primary font-bold">{item.designer}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="p-6 bg-muted/40 text-[11px] text-muted-foreground flex items-center gap-4 justify-center">
                            <HelpCircle className="h-4 w-4" />
                            <span>Don't see your garment? <Link href="/support" className="text-primary underline">Request a custom quote</Link></span>
                        </div>
                    </div>
                </div>

                {/* FAQs Placeholder */}
                <div className="text-center bg-white rounded-3xl p-12 border premium-shadow space-y-6">
                    <h3 className="text-2xl font-serif font-bold">Have more questions?</h3>
                    <p className="text-muted-foreground">Our master tailors are happy to consult on your custom designs.</p>
                    <div className="flex justify-center gap-4">
                        <Button variant="outline" className="gap-2">
                            Full FAQ <ArrowRight className="h-4 w-4" />
                        </Button>
                        <Button className="gap-2 bg-accent hover:bg-accent/90 border-none shadow-xl">
                            Chat with Expert
                        </Button>
                    </div>
                </div>
            </div>
        </main>
    );
}
