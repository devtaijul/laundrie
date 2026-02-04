import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    name: "Sophie Turner",
    role: "Financial Analyst",
    rating: 5,
    text: "I recently tried out Laundry Service, and I couldn't be happier! My clothes came back spotless and neatly folded, and I loved the fresh scent. Plus, their pickup and delivery service was super convenient.",
  },
  {
    name: "Jacob Williams",
    role: "Product Manager",
    rating: 5,
    text: "I recently tried out Laundry Service, and I couldn't be happier! My clothes came back spotless and neatly folded, and I loved the fresh scent. Plus, their pickup and delivery service was super convenient.",
  },
  {
    name: "Isabella Brown",
    role: "Software Engineer",
    rating: 3,
    text: "I recently tried a laundry service and had a pretty disappointing experience. I ordered a wash and fold service, but the sizing of my clothes seemed completely off when I received them back.",
  },
  {
    name: "Harry Davis",
    role: "Project Coordinator",
    rating: 4,
    text: "I recently tried out Laundry Service, and I couldn't be happier! My clothes came back spotless and neatly folded, and I loved the fresh scent. Plus, their pickup and delivery service was super convenient.",
  },
  {
    name: "Oliver Bennett",
    role: "Designer",
    rating: 5,
    text: "I recently tried out Laundry Service, and I couldn't be happier! My clothes came back spotless and neatly folded, and I loved the fresh scent. Plus, their pickup and delivery service was super convenient.",
  },
  {
    name: "Amelia Clarke",
    role: "Data Analyst",
    rating: 5,
    text: "I recently tried out Laundry Service, and I couldn't be happier! My clothes came back spotless and neatly folded, and I loved the fresh scent. Plus, their pickup and delivery service was super convenient.",
  },
  {
    name: "Ethan Johnson",
    role: "Marketing Specialist",
    rating: 5,
    text: "I recently tried out Laundry Service, and I couldn't be happier! My clothes came back spotless and neatly folded, and I loved the fresh scent. Plus, their pickup and delivery service was super convenient.",
  },
];

const RatingStars = ({ rating }: { rating: number }) => {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <div
          key={star}
          className={`w-8 h-8 rounded flex items-center justify-center ${
            star <= rating ? "bg-green-500" : "bg-gray-300"
          }`}
        >
          <Star className="w-4 h-4 fill-white text-white" />
        </div>
      ))}
    </div>
  );
};

export const TestimonialsSection = () => {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center  mb-16">
          Don&apos;t just take our word for it
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => {
            let gridClass = "";

            // 3rd child: col span 1, row span 2
            if (index === 2) {
              gridClass = "md:col-span-1 md:row-span-2";
            }
            // 4th child: row span 1, col span 2
            else if (index === 3) {
              gridClass = "md:col-span-2";
            }
            // Default for other items
            else {
              gridClass = "md:col-span-1";
            }

            return (
              <Card
                key={index}
                className={`bg-primary border-0 shadow-sm ${gridClass}`}
              >
                <CardContent className="p-6 space-y-4 h-full">
                  <RatingStars rating={testimonial.rating} />
                  <p className="text-white text-sm leading-relaxed">
                    {testimonial.text}
                  </p>
                  <div className="flex items-center gap-3 pt-2">
                    <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-white text-sm">
                        {testimonial.name}
                      </p>
                      <p className="text-white text-xs">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
