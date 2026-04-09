import Image from "next/image";

export const ValuePropositionSection = () => {
  return (
    <section className="bg-[#e4f7ff] py-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative py-28 sm:py-40 lg:py-56">
        {/* Rotated clothing images at corners */}
        {/* Top-left: shirt (rotated +22deg) */}
        <div className="absolute -left-4 -top-16 sm:-top-24 w-40 h-40 sm:w-56 sm:h-56 lg:w-72 lg:h-72 pointer-events-none">
          <div className="rotate-22 w-full h-full relative">
            <Image
              src="/assets/about-shirt.png"
              alt="Shirt"
              fill
              className="object-contain rounded-3xl"
            />
          </div>
        </div>

        {/* Top-right: pants (rotated -26deg) */}
        <div className="absolute -right-4 -top-16 sm:-top-24 w-32 h-40 sm:w-48 sm:h-56 lg:w-60 lg:h-72 pointer-events-none">
          <div className="-rotate-26 w-full h-full relative">
            <Image
              src="/assets/about-pants.png"
              alt="Pants"
              fill
              className="object-contain rounded-3xl"
            />
          </div>
        </div>

        {/* Bottom-left: towel (rotated +11deg) */}
        <div className="absolute left-4 sm:left-20 -bottom-12 sm:-bottom-20 w-40 h-32 sm:w-56 sm:h-48 lg:w-72 lg:h-60 pointer-events-none">
          <div className="rotate-11 w-full h-full relative">
            <Image
              src="/assets/about-towel.png"
              alt="Towel"
              fill
              className="object-contain rounded-3xl"
            />
          </div>
        </div>

        {/* Bottom-right: bedsheet (rotated -10deg) */}
        <div className="absolute -right-5 -bottom-10 sm:-bottom-16 w-48 h-36 sm:w-72 sm:h-48 lg:w-96 lg:h-64 pointer-events-none">
          <div className="-rotate-10 w-full h-full relative">
            <Image
              src="/assets/about-bedsheet.png"
              alt="Bedsheet"
              fill
              className="object-contain rounded-3xl"
            />
          </div>
        </div>

        {/* Centered text */}
        <div className="relative z-10 text-center max-w-xs sm:max-w-xl lg:max-w-233 mx-auto">
          <p className="text-2xl sm:text-4xl lg:text-5xl font-bold text-[#002b28] leading-[1.1] lg:leading-[1.07] tracking-tight">
            We combine experience, technology, and passion to simplify your
            laundry needs and exceed your expectations
          </p>
        </div>
      </div>
    </section>
  );
};
