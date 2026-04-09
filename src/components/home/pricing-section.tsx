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
    <section className="pt-12 sm:pt-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Pricing Info Card */}
        <div className="mb-12 sm:mb-20">
          <Card className="bg-secondary border-0 p-4 sm:p-8 shadow-none">
            <CardContent className="p-0 space-y-4 gap-6 sm:gap-8 grid grid-cols-1 items-center md:grid-cols-2">
              <div className="space-y-3 sm:space-y-4">
                <span className="inline-block bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full">
                  Starting at
                </span>
                <div>
                  <span className="text-4xl sm:text-5xl font-bold text-foreground">
                    $1.25
                  </span>
                  <span className="text-xl sm:text-2xl text-foreground">/lb</span>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground uppercase tracking-wide">
                  HOW MUCH DOES LAUNDRY WEIGH?
                </p>
                <p className="text-xl sm:text-2xl font-semibold text-primary">
                  1 hamper ≈ 10 pounds
                </p>
                <Link href={PAGES.HOME}>
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full mt-2 sm:mt-4 text-sm">
                    Enjoy free pickup & Delivery
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>

              <div className="rounded-2xl overflow-hidden bg-muted h-52 sm:h-64 lg:h-auto">
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
      <div className="mx-auto py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-secondary">
        {/* Service Comparison */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
            Choose the Service That Fits You
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base">
            Two simple options—both with the same quality care.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-4 sm:mb-6">
            <div></div>
            <div className="text-center">
              <h3 className="font-semibold text-foreground text-sm sm:text-base">Economy</h3>
              <p className="text-2xl sm:text-3xl font-bold text-foreground">€98</p>
              <p className="text-xs sm:text-sm text-muted-foreground">/per 5kg</p>
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-foreground text-sm sm:text-base">Standard</h3>
              <p className="text-2xl sm:text-3xl font-bold text-foreground">€45</p>
              <p className="text-xs sm:text-sm text-muted-foreground">/per 5kg</p>
            </div>
          </div>

          {/* Features Table */}
          <div className="space-y-2">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`grid grid-cols-3 gap-2 sm:gap-4 py-2 sm:py-3 px-2 sm:px-4 rounded-lg ${
                  index % 2 === 0 ? "bg-secondary" : "bg-primary/10"
                }`}
              >
                <span className="text-xs sm:text-sm text-foreground">{feature.name}</span>
                <div className="flex justify-center">
                  {feature.economy && (
                    <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-primary flex items-center justify-center">
                      <Check className="w-3 h-3 sm:w-4 sm:h-4 text-primary-foreground" />
                    </div>
                  )}
                </div>
                <div className="flex justify-center">
                  {feature.standard && (
                    <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-primary flex items-center justify-center">
                      <Check className="w-3 h-3 sm:w-4 sm:h-4 text-primary-foreground" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4 mt-6 sm:mt-8">
            <div></div>
            <div className="flex justify-center">
              <Link href={PAGES.HOME}>
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-4 sm:px-8 text-xs sm:text-sm">
                  Get Started
                </Button>
              </Link>
            </div>
            <div className="flex justify-center">
              <Link href={PAGES.HOME}>
                <Button
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary/10 rounded-full px-4 sm:px-8 text-xs sm:text-sm"
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
