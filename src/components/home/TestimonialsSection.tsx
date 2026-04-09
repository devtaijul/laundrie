"use client";

import React from "react";

const testimonials = [
  {
    name: "Emma Richardson",
    role: "Marketing Professional",
    rating: 5,
    ratingColor: "#219653",
    text: "Really smooth experience from start to finish. Booking was easy, pickup arrived exactly on time, and my clothes came back clean and neatly folded. Everything smelled fresh without being too strong.",
    initials: "ER",
    avatarBg: "bg-orange-300",
  },
  {
    name: "James Mitchell",
    role: "Business Owner",
    rating: 4,
    ratingColor: "#73cf11",
    text: "Overall a good service. The clothes were cleaned properly and packed well. Delivery was a bit later than the time window, but I was informed beforehand, which I appreciated.",
    initials: "JM",
    avatarBg: "bg-blue-300",
  },
  {
    name: "Sarah Anderson",
    role: "Executive Assistant",
    rating: 5,
    ratingColor: "#219653",
    text: "Had a really good experience overall. The booking process was simple and pickup arrived within the scheduled time, which I appreciated. My clothes came back clean, neatly folded, and smelled fresh without being too strong. \n I also sent a few shirts that needed ironing and they were done properly, which made a noticeable difference. Delivery was smooth and everything was packed nicely. \n It’s a convenient service and saves quite a bit of time, especially during busy weeks. Would definitely use it again.",
    initials: "SA",
    avatarBg: "bg-green-300",
    wide: true,
  },
  {
    name: "Michael Chen",
    role: "Consultant",
    rating: 5,
    ratingColor: "#219653",
    text: "Very happy with the quality. My shirts were properly ironed and looked almost new. It's clear they pay attention to details.",
    initials: "MC",
    avatarBg: "bg-yellow-300",
    tall: true,
  },
  {
    name: "Lisa Thompson",
    role: "Healthcare Professional",
    rating: 4,
    ratingColor: "#73cf11",
    text: "Good experience overall. Pickup was quick and the clothes were handled well. Would be nice to have a few more flexible time options, but otherwise everything went fine.",
    initials: "LT",
    avatarBg: "bg-purple-300",
  },
  {
    name: "David Foster",
    role: "Tech Startup Founder",
    rating: 5,
    ratingColor: "#219653",
    text: "Super convenient service, especially during busy weeks. I didn't have to worry about anything and everything came back ready to wear.",
    initials: "DF",
    avatarBg: "bg-pink-300",
  },
  {
    name: "Rachel Green",
    role: "Finance Manager",
    rating: 5,
    ratingColor: "#219653",
    text: "Communication was clear throughout the process. I got updates at each step, and both pickup and delivery were on schedule. Clothes were fresh and well packed.",
    initials: "RG",
    avatarBg: "bg-red-300",
  },
  {
    name: "Christopher Lee",
    role: "Architect",
    rating: 4,
    ratingColor: "#73cf11",
    text: "Quality is definitely good. Pricing is reasonable for the convenience you get. Would recommend if you want to save time.",
    initials: "CL",
    avatarBg: "bg-indigo-300",
  },
  {
    name: "Nicole Patel",
    role: "Lawyer",
    rating: 5,
    ratingColor: "#219653",
    text: "Everything was handled professionally. No missing items, no issues, and the folding was done nicely. Will keep using this service regularly.",
    initials: "NP",
    avatarBg: "bg-teal-300",
  },
  {
    name: "Robert Johnson",
    role: "Creative Director",
    rating: 5,
    ratingColor: "#219653",
    text: "Tried the service recently and had a great experience. The whole process was straightforward, and the results were consistent with what you'd expect from a reliable laundry service.",
    initials: "RJ",
    avatarBg: "bg-cyan-300",
  },
];

const RatingStars = ({ rating, color }: { rating: number; color: string }) => {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <div
          key={star}
          className="w-14.5 h-14.5 flex items-center justify-center"
          style={{ backgroundColor: star <= rating ? color : "#d9d9d9" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={30}
            height={30}
            viewBox="0 0 30 30"
            fill="none"
          >
            <g clipPath="url(#clip0_442_676)">
              <path
                d="M14.8491 22.8774L21.7358 21.1321L24.6132 30L14.8491 22.8774ZM30.6981 11.4151H18.5755L14.8491 0L11.1226 11.4151H-1L8.81132 18.4906L5.08491 29.9057L14.8962 22.8302L20.934 18.4906L30.6981 11.4151Z"
                fill="white"
              />
            </g>
            <defs>
              <clipPath id="clip0_442_676">
                <rect width={30} height={30} fill="white" />
              </clipPath>
            </defs>
          </svg>
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
    <p className="text-white text-lg leading-relaxed flex-1">
      {testimonial.text}
    </p>
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
  const [sophie, jacob, isabella, harry, oliver, amelia, robert] = testimonials;
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [prevIndex, setPrevIndex] = React.useState<number | null>(null);
  const [direction, setDirection] = React.useState<"left" | "right">("left");
  const [animating, setAnimating] = React.useState(false);
  const touchStartX = React.useRef<number | null>(null);
  const animTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const goTo = (index: number) => {
    if (animating || index === activeIndex) return;
    setDirection(index > activeIndex ? "left" : "right");
    setPrevIndex(activeIndex);
    setActiveIndex(index);
    setAnimating(true);
    if (animTimer.current) clearTimeout(animTimer.current);
    animTimer.current = setTimeout(() => {
      setPrevIndex(null);
      setAnimating(false);
    }, 380);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) goTo(Math.min(activeIndex + 1, testimonials.length - 1));
      else goTo(Math.max(activeIndex - 1, 0));
    }
    touchStartX.current = null;
  };

  return (
    <section className="bg-[#f5f5f5] py-10">
      <style>{`
        @keyframes slideInFromRight {
          from { opacity: 0; transform: translateX(56px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInFromLeft {
          from { opacity: 0; transform: translateX(-56px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideOutToLeft {
          from { opacity: 1; transform: translateX(0); }
          to   { opacity: 0; transform: translateX(-56px); }
        }
        @keyframes slideOutToRight {
          from { opacity: 1; transform: translateX(0); }
          to   { opacity: 0; transform: translateX(56px); }
        }
        .anim-in-left  { animation: slideInFromRight 0.38s cubic-bezier(0.25,0.46,0.45,0.94) forwards; }
        .anim-in-right { animation: slideInFromLeft  0.38s cubic-bezier(0.25,0.46,0.45,0.94) forwards; }
        .anim-out-left  { animation: slideOutToLeft  0.38s cubic-bezier(0.25,0.46,0.45,0.94) forwards; }
        .anim-out-right { animation: slideOutToRight 0.38s cubic-bezier(0.25,0.46,0.45,0.94) forwards; }
      `}</style>
      <div className="max-w-360 mx-auto px-4 sm:px-6 lg:px-18">
        <h2 className="text-2xl sm:text-4xl lg:text-[48px] font-semibold text-center text-black tracking-tight mb-8 lg:mb-12">
          Don&apos;t just take our word for it
        </h2>

        {/* Mobile: Carousel */}
        <div className="lg:hidden">
          <div
            className="relative overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Exiting card — absolute, doesn't affect height */}
            {prevIndex !== null && (
              <div
                key={`exit-${prevIndex}`}
                className={`absolute inset-x-0 top-0 pointer-events-none ${
                  direction === "left" ? "anim-out-left" : "anim-out-right"
                }`}
              >
                <TestimonialCard testimonial={testimonials[prevIndex]} />
              </div>
            )}
            {/* Entering card — normal flow, sets container height */}
            <div
              key={`enter-${activeIndex}`}
              className={animating ? (direction === "left" ? "anim-in-left" : "anim-in-right") : ""}
            >
              <TestimonialCard testimonial={testimonials[activeIndex]} />
            </div>
          </div>
          <div className="flex justify-center gap-2 mt-5">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`rounded-full transition-all duration-200 ${
                  i === activeIndex
                    ? "w-8 h-3 bg-[#2180a6]"
                    : "w-3 h-3 bg-[#c4c4c4]"
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
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
            <TestimonialCard testimonial={robert} />
            <div />
          </div>
        </div>
      </div>
    </section>
  );
};
