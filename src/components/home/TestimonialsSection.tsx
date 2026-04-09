import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sophie Turner",
    role: "Financial Analyst",
    rating: 5,
    ratingColor: "#219653",
    text: "I recently tried out Laundry Service, and I couldn't be happier! My clothes came back spotless and neatly folded, and I loved the fresh scent. Plus, their pickup and delivery service was super convenient.",
    initials: "ST",
    avatarBg: "bg-orange-300",
  },
  {
    name: "Jacob Williams",
    role: "Product Manager",
    rating: 4,
    ratingColor: "#73cf11",
    text: "I recently tried out Laundry Service, and I couldn't be happier! My clothes came back spotless and neatly folded, and I loved the fresh scent. Plus, their pickup and delivery service was super convenient.",
    initials: "JW",
    avatarBg: "bg-blue-300",
    wide: true,
  },
  {
    name: "Isabella Brown",
    role: "Software Engineer",
    rating: 2,
    ratingColor: "#ff8622",
    text: "I recently tried a laundry service and had a pretty disappointing experience. I ordered a wash and fold service, but the sizing of my clothes seemed completely off when I received them back. They didn't fit as expected at all. I reached out to customer service for a refund, only to find out I had to ship my items back to the US from the UK, which was quite costly for me.",
    initials: "IB",
    avatarBg: "bg-green-300",
    tall: true,
  },
  {
    name: "Harry Davis",
    role: "Project Coordinator",
    rating: 3,
    ratingColor: "#ffce00",
    text: "I recently tried out Laundry Service, and I couldn't be happier! My clothes came back spotless and neatly folded, and I loved the fresh scent. Plus, their pickup and delivery service was super convenient.",
    initials: "HD",
    avatarBg: "bg-yellow-300",
  },
  {
    name: "Oliver Bennett",
    role: "Designer",
    rating: 4,
    ratingColor: "#73cf11",
    text: "I recently tried out Laundry Service, and I couldn't be happier! My clothes came back spotless and neatly folded, and I loved the fresh scent. Plus, their pickup and delivery service was super convenient.",
    initials: "OB",
    avatarBg: "bg-purple-300",
  },
  {
    name: "Amelia Clarke",
    role: "Data Analyst",
    rating: 5,
    ratingColor: "#219653",
    text: "I recently tried out Laundry Service, and I couldn't be happier! My clothes came back spotless and neatly folded, and I loved the fresh scent. Plus, their pickup and delivery service was super convenient.",
    initials: "AC",
    avatarBg: "bg-pink-300",
  },
];

const RatingStars = ({
  rating,
  color,
}: {
  rating: number;
  color: string;
}) => {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <div
          key={star}
          className="w-14.5 h-14.5 flex items-center justify-center"
          style={{ backgroundColor: star <= rating ? color : "#d9d9d9" }}
        >
          <Star className="w-7.5 h-7.5 fill-white text-white" />
        </div>
      ))}
    </div>
  );
};

const TestimonialCard = ({
  testimonial,
  className = "",
}: {
  testimonial: (typeof testimonials)[0];
  className?: string;
}) => (
  <div
    className={`bg-[#2180a6] border border-[#e5e7eb] rounded-[20px] p-10 flex flex-col gap-8 ${className}`}
  >
    <RatingStars rating={testimonial.rating} color={testimonial.ratingColor} />
    <p className="text-white text-lg leading-relaxed flex-1">{testimonial.text}</p>
    <div className="flex items-center gap-4">
      <div
        className={`w-17.5 h-17.5 rounded-full ${testimonial.avatarBg} flex items-center justify-center shrink-0`}
      >
        <span className="text-white font-semibold text-base">
          {testimonial.initials}
        </span>
      </div>
      <div>
        <p className="text-[#e4f7ff] text-xl font-normal">{testimonial.name}</p>
        <p className="text-white text-lg">{testimonial.role}</p>
      </div>
    </div>
  </div>
);

export const TestimonialsSection = () => {
  const [sophie, jacob, isabella, harry, oliver, amelia] = testimonials;

  return (
    <section className="bg-[#f5f5f5] py-10">
      <div className="max-w-360 mx-auto px-4 sm:px-6 lg:px-18">
        <h2 className="text-2xl sm:text-4xl lg:text-[48px] font-semibold text-center text-black tracking-tight mb-8 lg:mb-12">
          Don&apos;t just take our word for it
        </h2>

        {/* Mobile: Single column stack */}
        <div className="flex flex-col gap-4 lg:hidden">
          {testimonials.map((t, i) => (
            <TestimonialCard key={i} testimonial={t} />
          ))}
        </div>

        {/* Desktop: Complex grid layout */}
        <div className="hidden lg:block">
          {/* Row 1: 2 standard cards + 1 tall card spanning both rows */}
          <div className="grid grid-cols-3 gap-6">
            <TestimonialCard testimonial={sophie} />
            <TestimonialCard testimonial={jacob} />
            <TestimonialCard testimonial={isabella} className="row-span-2" />
            <TestimonialCard testimonial={harry} className="col-span-2" />
          </div>

          {/* Row 3: 2 standard cards + 1 card */}
          <div className="grid grid-cols-3 gap-6 mt-6">
            <TestimonialCard testimonial={oliver} />
            <TestimonialCard testimonial={amelia} />
            <div />
          </div>
        </div>
      </div>
    </section>
  );
};
