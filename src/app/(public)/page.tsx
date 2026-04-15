import type { Metadata } from "next";
import { FAQSection } from "@/components/home/faq-section";

export const metadata: Metadata = {
  title: "Laundrie — Professional Laundry & Dry Cleaning",
  description:
    "Laundrie offers professional laundry and dry cleaning with free pickup and delivery, 7 days a week. Schedule your first pickup today.",
  openGraph: {
    title: "Laundrie — Professional Laundry & Dry Cleaning",
    description:
      "Free pickup and delivery, 7 days a week. Fresh, clean clothes delivered to your door.",
    url: "https://laundrie.nl",
  },
};
import { GallerySection } from "@/components/home/GallerySection";
import { HeroSection } from "@/components/home/hero-section";
import { PromoSection } from "@/components/home/PromoSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { ValuePropositionSection } from "@/components/home/value-proposition-section";

const Home = () => {
  return (
    <main>
      <HeroSection />
      <TestimonialsSection />
      <ValuePropositionSection />
      <ServicesSection />
      {/*   <PricingSection /> */}
      <PromoSection />
      <FAQSection />
      <GallerySection />
    </main>
  );
};

export default Home;
