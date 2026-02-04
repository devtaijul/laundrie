import { FAQSection } from "@/components/home/faq-section";
import { GallerySection } from "@/components/home/GallerySection";
import { HeroSection } from "@/components/home/hero-section";
import { PricingSection } from "@/components/home/pricing-section";
import { PromoSection } from "@/components/home/PromoSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { ValuePropositionSection } from "@/components/home/value-proposition-section";
import { Header } from "@/components/layout/header";

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <TestimonialsSection />
        <ValuePropositionSection />
        <ServicesSection />
        <PricingSection />
        <PromoSection />
        <FAQSection />
        <GallerySection />
      </main>
    </div>
  );
};

export default Home;
