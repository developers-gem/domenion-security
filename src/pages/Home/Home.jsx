import HomeHero from "../../components/home/HomeHero";
import TrustStatsBar from "../../components/home/TrustStatsBar";
import AboutPreview from "../../components/home/AboutPreview";
import ServicesSection from "../../components/home/ServicesSection";
import IndustriesSection from "../../components/home/IndustriesSection";
import WhyChooseDominion from "../../components/home/WhyChooseDominion";
import SecurityProcess from "../../components/home/SecurityProcess";
import CareersBanner from "../../components/home/CareersBanner";
import TestimonialsSlider from "../../components/home/TestimonialsSlider";
import FAQSection from "../../components/home/FAQSection";
import FinalCTA from "../../components/home/FinalCTA";
import "./Home.css";

/**
 * Dominion Security Homepage.
 * Composes modular enterprise UI components with full motion, responsive layouts,
 * and preserved backend API integrations.
 */
function Home() {
  return (
    <main className="ds-homepage-main">
      <HomeHero />
      <TrustStatsBar />
      <AboutPreview />
      <ServicesSection />
      <IndustriesSection />
      <WhyChooseDominion />
      <SecurityProcess />
      <CareersBanner />
      <FAQSection />
            <TestimonialsSlider />

      <FinalCTA />
    </main>
  );
}

export default Home;