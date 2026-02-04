export const ValuePropositionSection = () => {
  return (
    <section className="py-20 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Decorative Images */}
        <div className="flex justify-center items-center gap-4 mb-8 flex-wrap">
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-lg bg-gradient-to-br from-yellow-200 to-yellow-300 flex items-center justify-center overflow-hidden">
            <div className="w-full h-full bg-gradient-to-br from-yellow-300 to-green-300 opacity-80" />
          </div>
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
            <div className="w-full h-full bg-gradient-to-br from-gray-200 to-blue-100" />
          </div>
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-lg bg-gradient-to-br from-purple-200 to-purple-300 overflow-hidden">
            <div className="w-full h-full bg-gradient-to-br from-purple-300 to-pink-200" />
          </div>
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-lg bg-gradient-to-br from-blue-100 to-blue-200 overflow-hidden">
            <div className="w-full h-full bg-gradient-to-br from-blue-200 to-cyan-100" />
          </div>
        </div>

        {/* Main Quote */}
        <div className="text-center max-w-4xl mx-auto">
          <p className="text-2xl md:text-3xl lg:text-4xl font-medium text-foreground italic leading-relaxed">
            We combine experience, technology, and passion to simplify your
            laundry needs and exceed your expectations
          </p>
        </div>

        {/* Bottom Decorative Images */}
        <div className="flex justify-center items-center gap-4 mt-8 flex-wrap">
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-lg bg-gradient-to-br from-orange-200 to-red-200 overflow-hidden">
            <div className="w-full h-full bg-gradient-to-br from-orange-300 to-red-300" />
          </div>
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-lg bg-gradient-to-br from-white to-gray-100 overflow-hidden">
            <div className="w-full h-full bg-gradient-to-br from-white to-gray-200" />
          </div>
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-lg bg-gradient-to-br from-blue-100 to-cyan-100 overflow-hidden">
            <div className="w-full h-full bg-gradient-to-br from-cyan-100 to-blue-200" />
          </div>
        </div>
      </div>
    </section>
  );
};
