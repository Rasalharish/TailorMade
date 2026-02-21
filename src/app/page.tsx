import { Button } from "@/components/ui/button";
import { Scissors, Ruler, Truck, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      {/* Hero Section */}

      {/* Hero Section */}
      <section className="flex-1 flex flex-col justify-center items-center text-center px-4 py-24 md:py-32 bg-secondary/20">
        <div className="container max-w-4xl space-y-6">
          <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
            ✨ Tailoring from your doorstep
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-extrabold tracking-tight text-primary">
            Custom Fit, <span className="italic text-yellow-600">Without the Fuss.</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Experience the luxury of bespoke tailoring without leaving home. We pickup your fabric (or reference fit), stitch it to perfection, and deliver it back.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link href="/book">
              <Button size="lg" className="h-12 px-8 text-base shadow-lg" variant="premium">
                Book a Visit
              </Button>
            </Link>
            <Link href="/pricing">
              <Button size="lg" variant="outline" className="h-12 px-8 text-base">
                View Pricing
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-background">
        <div className="container px-4 md:px-8 max-w-screen-2xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
            <div className="bg-card p-6 rounded-xl border shadow-sm">
              <div className="h-12 w-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4 mx-auto md:mx-0">
                <Ruler className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Perfect Fit Guarantee</h3>
              <p className="text-muted-foreground">We measure you at home or copy your best-fitting garment. If it doesn't fit, we alter it for free.</p>
            </div>
            <div className="bg-card p-6 rounded-xl border shadow-sm">
              <div className="h-12 w-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4 mx-auto md:mx-0">
                <Truck className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Doorstep Convenience</h3>
              <p className="text-muted-foreground">Scheule a pickup for your fabric and measurements. We handle all the logistics.</p>
            </div>
            <div className="bg-card p-6 rounded-xl border shadow-sm">
              <div className="h-12 w-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4 mx-auto md:mx-0">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Secure Payments</h3>
              <p className="text-muted-foreground">Your money is held in escrow and only released to the tailor when you approve the final delivery.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
