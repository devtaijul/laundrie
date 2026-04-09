import { FAQSection } from "@/components/home/faq-section";
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
