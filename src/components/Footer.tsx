import Link from "next/link";
import { Scissors, Twitter, Instagram, Facebook, Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-white border-t py-16 md:py-24">
            <div className="container px-4 md:px-8 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand Section */}
                    <div className="space-y-6">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="h-10 w-10 bg-primary text-white flex items-center justify-center rounded-sm">
                                <Scissors className="h-6 w-6" />
                            </div>
                            <span className="text-2xl font-serif font-bold tracking-tight">TailorMade</span>
                        </Link>
                        <p className="text-muted-foreground leading-relaxed">
                            Revolutionizing the art of custom tailoring through a managed digital marketplace. Every stitch, measured with precision.
                        </p>
                        <div className="flex gap-4">
                            <Link href="#" className="h-10 w-10 border rounded-full flex items-center justify-center hover:bg-neutral-50 transition-colors">
                                <Twitter className="h-5 w-5 opacity-60" />
                            </Link>
                            <Link href="#" className="h-10 w-10 border rounded-full flex items-center justify-center hover:bg-neutral-50 transition-colors">
                                <Instagram className="h-5 w-5 opacity-60" />
                            </Link>
                            <Link href="#" className="h-10 w-10 border rounded-full flex items-center justify-center hover:bg-neutral-50 transition-colors">
                                <Facebook className="h-5 w-5 opacity-60" />
                            </Link>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-bold mb-6 uppercase text-xs tracking-widest text-muted-foreground">Product</h4>
                        <ul className="space-y-4 text-sm font-medium">
                            <li><Link href="/book" className="hover:text-primary transition-colors">Book a Visit</Link></li>
                            <li><Link href="/pricing" className="hover:text-primary transition-colors">Pricing & Rate Card</Link></li>
                            <li><Link href="/tailors" className="hover:text-primary transition-colors">Browse Marketplace</Link></li>
                            <li><Link href="/orders" className="hover:text-primary transition-colors">Track Your Order</Link></li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="font-bold mb-6 uppercase text-xs tracking-widest text-muted-foreground">Company</h4>
                        <ul className="space-y-4 text-sm font-medium">
                            <li><Link href="#" className="hover:text-primary transition-colors">About Us</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Quality Guarantee</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Partner with Us</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Careers</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="space-y-6">
                        <h4 className="font-bold mb-6 uppercase text-xs tracking-widest text-muted-foreground">Support</h4>
                        <div className="space-y-4 text-sm">
                            <div className="flex items-start gap-3">
                                <MapPin className="h-5 w-5 text-primary shrink-0" />
                                <span className="text-muted-foreground">12th Main Rd, HAL 2nd Stage, Indiranagar, Bengaluru, KA 560038</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Mail className="h-5 w-5 text-primary shrink-0" />
                                <span className="text-muted-foreground">hello@tailormade.in</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Phone className="h-5 w-5 text-primary shrink-0" />
                                <span className="text-muted-foreground">+91 99000 12345</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-12 border-t flex flex-col md:flex-row justify-between items-center gap-6 text-xs font-bold text-muted-foreground uppercase tracking-widest">
                    <p>© 2026 TailorMade Technologies Ptv Ltd.</p>
                    <div className="flex gap-8">
                        <Link href="#" className="hover:text-primary">Privacy Policy</Link>
                        <Link href="#" className="hover:text-primary">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
