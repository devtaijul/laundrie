import { Button } from "@/components/ui/button";

import { ArrowRight, Star } from "lucide-react";
import Link from "next/link";
import { PAGES } from "@/config/pages.config";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen bg-primary overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url("/assets/hero-bg.png")`,
          backgroundSize: "cover",
          backgroundPosition: "top center",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-primary/30 to-black/20" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-10rem)]">
          {/* Left Content */}
          <div className="space-y-8 z-10">
            <div>
              <span className="text-xs uppercase tracking-widest text-white/80 font-medium">
                TOP FEATURE
              </span>

              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                  Effortless Laundry Care Anytime
                </h1>
              </div>

              <div className="flex items-center gap-4">
                <Link href={PAGES.LAUNDRIE}>
                  <Button
                    size="lg"
                    className="bg-white text-foreground hover:bg-white/90 text-base px-6 py-3 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl"
                  >
                    Schedule a pickup now
                  </Button>
                </Link>
                <Link href={PAGES.LAUNDRIE}>
                  <Button
                    size="icon"
                    className="bg-white text-foreground hover:bg-white/90 rounded-full w-12 h-12 shadow-lg"
                  >
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Customer Rating */}
            <div className="flex items-center gap-4 pt-8">
              <div className="flex -space-x-3">
                <div className="w-10 h-10 rounded-full bg-orange-300 border-2 border-white" />
                <div className="w-10 h-10 rounded-full bg-blue-300 border-2 border-white" />
                <div className="w-10 h-10 rounded-full bg-green-300 border-2 border-white" />
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <span className="font-bold text-white">4.8+</span>
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-white font-medium">RATING</span>
                </div>
                <p className="text-white/80 text-sm">Satisfied Customer</p>
              </div>
            </div>
          </div>

          {/* Right side - Hero text overlay */}
          <div className="hidden lg:block" />
        </div>
      </div>

      {/* Bottom Hero Text */}
      <div className="absolute bottom-20 right-0 left-0 lg:left-1/3 text-right pr-8 lg:pr-16">
        <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-none">
          The Smart way
        </h2>
        <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-none">
          <span className="text-white">To Do </span>
          <span className="text-white border-b-4 border-primary-foreground">
            Laundry
          </span>
        </h2>
      </div>
    </section>
  );
};
