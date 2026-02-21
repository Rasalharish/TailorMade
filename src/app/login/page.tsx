"use client";

import { login, signup } from './actions'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Scissors, Star, Quote, ShieldCheck, Zap } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
    return (
        <main className="min-h-screen flex flex-col md:flex-row bg-background">
            {/* Left Pane: Branding & Social Proof (Hidden on mobile) */}
            <div className="hidden md:flex md:w-1/2 bg-primary flex-col justify-between p-12 text-primary-foreground relative overflow-hidden">
                <div className="absolute inset-0 opacity-10"
                    style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />

                <Link href="/" className="flex items-center gap-2 relative z-10">
                    <div className="h-10 w-10 bg-white text-primary flex items-center justify-center rounded-sm">
                        <Scissors className="h-6 w-6" />
                    </div>
                    <span className="text-2xl font-serif font-bold tracking-tight">TailorMade</span>
                </Link>

                <div className="space-y-8 relative z-10">
                    <h2 className="text-5xl font-serif font-bold leading-tight">
                        The Future of <br />
                        <span className="italic text-yellow-500">Bespoke</span> Tailoring.
                    </h2>

                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <div className="h-10 w-10 bg-white/10 rounded-full flex items-center justify-center shrink-0">
                                <Zap className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="font-bold">Managed Marketplace</p>
                                <p className="text-sm opacity-80 text-primary-foreground/70">Connecting you with verified master tailors across India.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="h-10 w-10 bg-white/10 rounded-full flex items-center justify-center shrink-0">
                                <ShieldCheck className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="font-bold">Perfect Fit Guarantee</p>
                                <p className="text-sm opacity-80 text-primary-foreground/70">Smart measurement tech and manual quality checks.</p>
                            </div>
                        </div>
                    </div>

                    <Card className="bg-white/10 border-none text-white backdrop-blur-md mt-12">
                        <CardContent className="p-6">
                            <div className="flex gap-1 mb-4 text-yellow-500">
                                <Star className="h-4 w-4 fill-current" />
                                <Star className="h-4 w-4 fill-current" />
                                <Star className="h-4 w-4 fill-current" />
                                <Star className="h-4 w-4 fill-current" />
                                <Star className="h-4 w-4 fill-current" />
                            </div>
                            <p className="text-lg italic mb-6 leading-relaxed">
                                "TailorMade completely changed how I think about custom clothing. The home visit was professional, and the fit of my suit is better than any off-the-rack brand."
                            </p>
                            <div className="flex items-center gap-4">
                                <div className="h-10 w-10 bg-white/20 rounded-full" />
                                <div>
                                    <p className="font-bold">Aditi Rao</p>
                                    <p className="text-xs opacity-60">Verified Customer, Bangalore</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="text-xs opacity-50 relative z-10">
                    © 2026 TailorMade Technologies Pvt Ltd. All rights reserved.
                </div>
            </div>

            {/* Right Pane: Login Form */}
            <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-12">
                <div className="w-full max-w-md space-y-8">
                    <div className="md:hidden flex flex-col items-center justify-center text-center space-y-2 mb-8">
                        <div className="h-10 w-10 bg-primary text-primary-foreground flex items-center justify-center rounded-sm">
                            <Scissors className="h-6 w-6" />
                        </div>
                        <h1 className="text-2xl font-serif font-bold tracking-tight">TailorMade</h1>
                    </div>

                    <div className="space-y-2 text-center md:text-left">
                        <h1 className="text-3xl font-bold tracking-tight">Get Started</h1>
                        <p className="text-muted-foreground">Sign in to track your orders and measurements.</p>
                    </div>

                    <Tabs defaultValue="login" className="w-full">
                        <TabsList className="grid w-full grid-cols-2 bg-secondary/30 p-1">
                            <TabsTrigger value="login" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Login</TabsTrigger>
                            <TabsTrigger value="register" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Register</TabsTrigger>
                        </TabsList>

                        <TabsContent value="login" className="mt-4">
                            <Card className="border-none shadow-none p-0">
                                <form className="space-y-6">
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="email">Email Address</Label>
                                            <Input id="email" name="email" type="email" placeholder="m@example.com" className="h-12 border-secondary" required />
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between">
                                                <Label htmlFor="password">Password</Label>
                                                <Link href="#" className="text-xs text-primary hover:underline">Forgot password?</Link>
                                            </div>
                                            <Input id="password" name="password" type="password" className="h-12 border-secondary" required />
                                        </div>
                                    </div>
                                    <Button formAction={login} className="w-full h-12 text-lg shadow-lg">Sign In</Button>
                                </form>
                            </Card>
                        </TabsContent>

                        <TabsContent value="register" className="mt-4">
                            <Card className="border-none shadow-none p-0">
                                <form className="space-y-6">
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="full_name">Full Name</Label>
                                            <Input id="full_name" name="full_name" placeholder="John Doe" className="h-12 border-secondary" required />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="email">Email Address</Label>
                                            <Input id="email" name="email" type="email" placeholder="m@example.com" className="h-12 border-secondary" required />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="password">Password</Label>
                                            <Input id="password" name="password" type="password" className="h-12 border-secondary" required />
                                        </div>
                                    </div>
                                    <Button formAction={signup} className="w-full h-12 text-lg shadow-lg">Create Account</Button>
                                </form>
                            </Card>
                        </TabsContent>
                    </Tabs>

                    <div className="text-center text-sm text-muted-foreground mt-8">
                        <Link href="/" className="hover:text-primary underline underline-offset-4">
                            Back to website home
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    )
}
