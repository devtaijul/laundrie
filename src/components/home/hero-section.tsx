import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { PAGES } from "@/config/pages.config";
import Image from "next/image";

export const HeroSection = () => {
  return (
    <section className="relative min-h-[70vh] md:min-h-screen bg-primary overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/assets/hero-bg-figma.png"
          alt="Laundry service background"
          fill
          className="object-cover object-top"
          priority
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/40 to-black/10" />

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-40 pb-10 sm:pb-20  min-h-[70vh] md:min-h-screen flex flex-col  justify-center">
        {/* Top Left Content */}
        <div className="space-y-3 sm:space-y-4 max-w-2xl   sm:mt-0">
          <span className="text-xs sm:text-sm uppercase tracking-widest text-[#d1d5db] font-normal">
            Top Feature
          </span>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight">
            Effortless Laundry Care Anytime
          </h1>

          <div className="flex items-center gap-3 sm:gap-4 pt-2 sm:pt-4">
            <Link href={PAGES.LAUNDRIE}>
              <Button className="bg-white text-black hover:bg-white/90 text-xs sm:text-sm px-5 sm:px-8 py-2 sm:py-3 rounded-xl font-normal shadow-lg h-8 sm:h-10">
                Schedule a pickup now
              </Button>
            </Link>
            <Link href={PAGES.LAUNDRIE}>
              <Button
                size="icon"
                className="bg-white text-black hover:bg-white/90 rounded-full w-8 h-8 sm:w-12 sm:h-12 shadow-lg"
              >
                <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Bottom Section */}
        {/*  <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end pb-4 sm:pb-8 gap-6">
       
          <div className="flex items-center gap-3">
            <div className="flex -space-x-3">
              {[
                { bg: "bg-orange-300", initials: "ST" },
                { bg: "bg-blue-300", initials: "JW" },
                { bg: "bg-green-300", initials: "IB" },
                { bg: "bg-purple-300", initials: "HD" },
              ].map((avatar, i) => (
                <div
                  key={i}
                  className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full ${avatar.bg} border-2 border-white flex items-center justify-center`}
                >
                  <span className="text-white text-xs font-semibold">
                    {avatar.initials}
                  </span>
                </div>
              ))}
            </div>
            <div>
              <p className="font-bold text-[#e4f7ff] text-base sm:text-lg uppercase tracking-tight">
                4.8+ ⭐ Rating
              </p>
              <p className="text-[#e4f7ff] text-sm sm:text-base">
                Satisfied Customer
              </p>
            </div>
          </div>

        
          <div className="text-right">
            <h2 className="text-5xl sm:text-6xl md:text-8xl lg:text-[115px] font-medium text-white leading-none">
              The Smart way
            </h2>
            <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-[100px] font-medium text-white leading-none">
              To Do Laundry
            </h2>
          </div>
        </div> */}
      </div>
    </section>
  );
};
