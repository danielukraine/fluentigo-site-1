import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TeachersCatalogSection from "@/components/TeachersCatalogSection";
import FormatsSection from "@/components/FormatsSection";
import PricingSection from "@/components/PricingSection";
import WhySection from "@/components/WhySection";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <HeroSection />
    <FormatsSection />
    <PricingSection />
    <WhySection />
    <FAQSection />
    <CTASection />
    <Footer />
    <TeachersCatalogSection />
  </div>
);

export default Index;
