import { Card, CardContent } from "@/components/ui/card";
import { IconName } from "@/config/icons.config";
import { Icons } from "@/icons";
import Image from "next/image";

const features = [
  {
    icon: "LEAF_ICON",
    title: "Eco-Friendly Detergents",
    description: "We care for your fabrics and the environment.",
  },
  {
    icon: "HAND_ICON_BLUE",
    title: "Hygienic Handling",
    description:
      "Your laundry is handled with gloves and sealed bags for hygiene.",
  },
  {
    icon: "SHIELD_ICON",
    title: "Satisfaction Guarantee",
    description: "100% Rewash or money-back if not satisfied.",
  },
  {
    icon: "TRUCK_ICON",
    title: "Fast & Reliable",
    description: "Always on-time pickups and deliveries",
  },
];

export const WhyChooseSection = () => {
  return (
    <section
      className="py-20 relative my-20 min-h-[600px]"
      style={{
        background: `url("/assets/section-bg.png")`,
        backgroundSize: "cover",
        backgroundPosition: "bottom",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Image */}
          <div className="order-2 lg:order-1 flex justify-center lg:justify-start">
            <Image
              src="/assets/why-choose-woman.png"
              alt="Woman holding clean folded towels"
              className="w-full max-w-2xl h-auto object-contain rounded-xl"
              width={626}
              height={621}
            />
          </div>

          {/* Right side - Content */}
          <div className="order-1 lg:order-2 space-y-8">
            <div className="space-y-6">
              <h2 className="text-3xl text-center md:text-left md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                Why choose
                <br className="hidden md:block" />
                <span className="pl-2 md:pl-0">Laundrie?</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  className="bg-white/80 shadow-xs border-none rounded-4xl"
                >
                  <CardContent className="p-6 text-center space-y-4">
                    <div className="flex justify-center">
                      <Icons name={feature.icon as IconName} />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
