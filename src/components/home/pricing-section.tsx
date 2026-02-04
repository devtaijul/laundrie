import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PAGES } from "@/config/pages.config";
import { Check, ArrowRight, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const features = [
  { name: "Delivery Time", economy: true, standard: true },
  { name: "Free Pickup & Delivery", economy: true, standard: true },
  { name: "Separate Wash", economy: true, standard: true },
  { name: "Ironing Options", economy: true, standard: true },
  { name: "Fabric Softener Option", economy: true, standard: true },
  { name: "Live Order Tracking", economy: true, standard: true },
  { name: "Priority Handling", economy: true, standard: true },
];

export const PricingSection = () => {
  return (
    <section className="pt-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Pricing Info Card */}
        <div className="  mb-20">
          <Card className="bg-secondary border-0 p-8 shadow-none">
            <CardContent className="p-0 space-y-4 gap-8 grid grid-cols-1 items-center md:grid-cols-2">
              <div className="space-y-4">
                <span className="inline-block bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full">
                  Starting at
                </span>
                <div>
                  <span className="text-5xl font-bold text-foreground">
                    $1.25
                  </span>
                  <span className="text-2xl text-foreground">/lb</span>
                </div>
                <p className="text-sm text-muted-foreground uppercase tracking-wide">
                  HOW MUCH DOES LAUNDRY WEIGH?
                </p>
                <p className="text-2xl font-semibold text-primary">
                  1 hamper ≈ 10 pounds
                </p>
                <Link href={PAGES.HOME}>
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full mt-4">
                    Enjoy free pickup & Delivery
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>

              <div className="rounded-2xl overflow-hidden bg-muted h-64 lg:h-auto">
                <Image
                  src="/assets/pricing-top.png"
                  alt="Pricing"
                  className="w-full h-full object-cover"
                  width={400}
                  height={300}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="mx-auto py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-secondary">
        {/* Service Comparison */}

        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Choose the Service That Fits You
          </h2>
          <p className="text-muted-foreground">
            Two simple options—both with the same quality care.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div></div>
            <div className="text-center">
              <h3 className="font-semibold text-foreground">Economy</h3>
              <p className="text-3xl font-bold text-foreground">€98</p>
              <p className="text-sm text-muted-foreground">/per 5kg</p>
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-foreground">Standard</h3>
              <p className="text-3xl font-bold text-foreground">€45</p>
              <p className="text-sm text-muted-foreground">/per 5kg</p>
            </div>
          </div>

          {/* Features Table */}
          <div className="space-y-2">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`grid grid-cols-3 gap-4 py-3 px-4 rounded-lg ${
                  index % 2 === 0 ? "bg-secondary" : "bg-primary/10"
                }`}
              >
                <span className="text-sm text-foreground">{feature.name}</span>
                <div className="flex justify-center">
                  {feature.economy && (
                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                      <Check className="w-4 h-4 text-primary-foreground" />
                    </div>
                  )}
                </div>
                <div className="flex justify-center">
                  {feature.standard && (
                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                      <Check className="w-4 h-4 text-primary-foreground" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="grid grid-cols-3 gap-4 mt-8">
            <div></div>
            <div className="flex justify-center">
              <Link href={PAGES.HOME}>
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8">
                  Get Started
                </Button>
              </Link>
            </div>
            <div className="flex justify-center">
              <Link href={PAGES.HOME}>
                <Button
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary/10 rounded-full px-8"
                >
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
