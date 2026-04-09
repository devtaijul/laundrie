import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PAGES } from "@/config/pages.config";

import {
  Calendar,
  Package,
  Sparkles,
  Truck,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const services = [
  {
    iconSrc: "/assets/service-wash-dry-fold.png",
    title: "Wash-Dry-Fold",
    description:
      "In addition to dry cleaning and laundry, we offer a range of services 7 days a week.",
  },
  {
    iconSrc: "/assets/service-dry-cleaning.png",
    title: "Dry Cleaning",
    description:
      "In addition to dry cleaning and laundry, we offer a range of services 7 days a week.",
  },
  {
    iconSrc: "/assets/service-clothing-repairs.png",
    title: "Clothing Repairs",
    description:
      "In addition to dry cleaning and laundry, we offer a range of services 7 days a week.",
  },
];

const processSteps = [
  {
    icon: Calendar,
    title: "Schedule",
    description:
      "Book a pickup that suits your routine online or through our app. We are available 7 days a week!",
  },
  {
    icon: Package,
    title: "Pickup",
    description:
      "Our friendly team picks up your laundry within your scheduled 2-hour window. Not home? Leave it in a safe spot and we'll handle the rest!",
  },
  {
    icon: Sparkles,
    title: "Wash & Fold",
    description:
      "At NoScrubs, we get to work on your laundry immediately. Our laundry expert will get your clothes washed, dried and folded.",
  },
  {
    icon: Truck,
    title: "Same Day Delivery",
    description:
      "Get your cleaned and fresh laundry delivered back in as little as 4 hours for standard sized loads (approx 20lbs).",
  },
];

export const ServicesSection = () => {
  return (
    <section className="py-12 sm:py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Finest Dry Cleaning Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-12 sm:mb-20">
          <div className="flex gap-4">
            <Image
              src="/assets/finest-dry-cleaning.png"
              alt="Finest Dry Cleaning"
              className="w-full max-w-2xl h-auto object-contain rounded-xl"
              width={500}
              height={500}
            />
          </div>
          <div className="space-y-4 sm:space-y-6">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
              Finest Dry Cleaning and Laundry Services
            </h2>
            <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
              The company&apos;s primary aim is to provide modern laundry and
              dry cleaning services tailored to customer&apos;s needs. Providing
              a flexible and cost-effective service while maintaining the
              highest level of quality is our goal.
            </p>
            <Link href={PAGES.SIGNUP}>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8">
                Sign Up Now
              </Button>
            </Link>
          </div>
        </div>

        {/* Free Up Time Section */}
        <div className="mb-12 sm:mb-20">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 sm:mb-12 gap-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
              Free Up time for What Really Matters
            </h2>
            <p className="text-muted-foreground max-w-md text-sm sm:text-base">
              In addition to dry cleaning and laundry, we offer a range of
              services 7 days a week. You can use our services in any convenient
              way – the choice is yours.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 items-start gap-4 sm:gap-6">
            {services.map((service, index) => (
              <Card
                key={index}
                className="bg-white border-0 shadow-[0px_0px_50px_0px_rgba(0,0,0,0.1)] hover:shadow-[0px_0px_50px_13px_rgba(0,0,0,0.1)] transition-shadow"
                style={{
                  marginTop: `${index * 20}px`,
                }}
              >
                <CardContent className="p-6 sm:p-8 space-y-4">
                  <div className="w-16 h-16">
                    <Image
                      src={service.iconSrc}
                      alt={service.title}
                      width={65}
                      height={65}
                      className="object-contain"
                    />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-foreground">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Clean & Folded Section */}
        <div className="bg-background">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-foreground mb-4">
            Clean & Folded Clothes in As Little As{" "}
            <span className="text-primary">4 Hours</span>
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mt-8 sm:mt-12 items-center">
            <div className="rounded-2xl overflow-hidden bg-muted aspect-square">
              <Image
                src="/assets/clean-folded-clothes.png"
                alt="Clean & Folded Clothes"
                className="w-full max-w-2xl h-auto object-contain"
                width={500}
                height={500}
              />
            </div>
            <div className="space-y-3 sm:space-y-4">
              {processSteps.map((step, index) => (
                <Card key={index} className="bg-secondary border-0 shadow-none">
                  <CardContent className="p-4 sm:p-5 flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <step.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1 text-sm sm:text-base">
                        {step.title}
                      </h4>
                      <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                        {step.description}
                      </p>
                    </div>
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
