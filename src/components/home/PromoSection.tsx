import { Button } from "@/components/ui/button";
import { PAGES } from "@/config/pages.config";

import { Check, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const benefits = [
  "Convenient pick-up & delivery tailored.",
  "Eco-friendly detergents used for washing.",
  "Save time & enjoy hassle-free service.",
];

export const PromoSection = () => {
  return (
    <section className="py-16 md:py-20">
      <div className="max-w-7xl mx-auto py-16 pl-4 sm:pl-6 lg:pl-8 bg-primary rounded-lg overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6 text-white">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              <span className="relative inline-block px-3 py-1">
                {/* Rotated Background */}
                <span className="absolute inset-0 bg-white -rotate-2 transform rounded-sm shadow-sm"></span>

                {/* Straight Text */}
                <span className="relative z-10 text-primary">
                  Exclusive Deals
                </span>
              </span>{" "}
              You Don&apos;t Want to Miss
            </h2>
            <p className="text-white/90">
              Don&apos;t miss out on our exclusive deals! Get 25% off your first
              laundry service when you book today.
            </p>

            <div className="space-y-3">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                  <span className="text-white">{benefit}</span>
                </div>
              ))}
            </div>

            <Link href={PAGES.LAUNDRIE}>
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-white/90 rounded-full px-8 mt-4"
              >
                SCHEDULE A PICKUP
              </Button>
            </Link>
          </div>

          {/* Right Content - Discount Badge & Image */}
          <div className="relative flex justify-center items-center">
            {/* Discount Badge */}
            {/* <div className="absolute -top-4 right-8 lg:right-16 z-10">
              <div className="relative">
                <div className="w-24 h-24 bg-yellow-400 rounded-full flex flex-col items-center justify-center transform rotate-12 shadow-lg">
                  <span className="text-2xl font-bold text-foreground">
                    25%
                  </span>
                  <span className="text-xs font-medium text-foreground">
                    DISCOUNT
                  </span>
                </div>
              </div>
            </div> */}

            {/* Image Placeholder */}
            <Image
              src="/assets/laundrase discount that you don,t miss.png"
              alt="Placeholder"
              width={500}
              height={500}
              className="w-full h-full object-cover rounded-lg -mr-2"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
