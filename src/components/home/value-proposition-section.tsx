import Image from "next/image";

export const ValuePropositionSection = () => {
  return (
    <section className="bg-[#e4f7ff] py-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative py-56">
        {/* Rotated clothing images at corners */}
        {/* Top-left: shirt (rotated +22deg) */}
        <div className="absolute -left-4 -top-24 w-72 h-72 pointer-events-none">
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
        <div className="absolute -right-4 -top-24 w-60 h-72 pointer-events-none">
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
        <div className="absolute left-20 -bottom-20 w-72 h-60 pointer-events-none">
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
        <div className="absolute -right-5 -bottom-16 w-96 h-64 pointer-events-none">
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
        <div className="relative z-10 text-center max-w-233 mx-auto">
          <p className="text-5xl font-bold text-[#002b28] leading-[1.07] tracking-tight">
            We combine experience, technology, and passion to simplify your
            laundry needs and exceed your expectations
          </p>
        </div>
      </div>
    </section>
  );
};
