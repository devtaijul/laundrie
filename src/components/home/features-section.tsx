import { Card, CardContent } from "@/components/ui/card";
import { IconName } from "@/config/icons.config";
import { Icons } from "@/icons";

const features = [
  {
    icon: "FEATURE_ONE",
    title: "Book a Collection",
    description:
      "Schedule your pickup online in just a few clicks choose a time that suits you.",
  },
  {
    icon: "FEATURE_TWO",
    title: "We Pick Up",
    description:
      "Our friendly driver arrives at your door to collect your laundry, right on time.",
  },
  {
    icon: "FEATURE_THREE",
    title: "We Clean with Care",
    description:
      "Your laundry is carefully cleaned to your chosen preferences using high-quality, hygienic processes.",
  },
  {
    icon: "FEATURE_FOUR",
    title: "We Deliver Fresh",
    description:
      "Your freshly cleaned laundry is delivered back to your door, folded or hung just the way you like.",
  },
];

export const FeaturesSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h3 className="text-base font-semibold mb-4">
            Just bag it. We do the rest.
          </h3>
          <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold text-foreground mb-4 ">
            How Laundrie Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-md mx-auto">
            From doorstep pickup to fresh delivery in just three simple steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-none shadow-none">
              <CardContent className=" text-center">
                <div className="w-16 h-16  flex items-center justify-center mx-auto mb-6">
                  <Icons name={feature.icon as IconName} />
                </div>
                <h3 className="text-2xl font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
