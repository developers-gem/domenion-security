import HomeHero from "../../components/home/HomeHero";
import TrustStatsBar from "../../components/home/TrustStatsBar";
import AboutPreview from "../../components/home/AboutPreview";
import ServicesSection from "../../components/home/ServicesSection";
import DataCenterBanner from "../../components/home/DataCenterBanner";
import IndustriesSection from "../../components/home/IndustriesSection";
import WhyChooseDominion from "../../components/home/WhyChooseDominion";
import SecurityProcess from "../../components/home/SecurityProcess";
import CareersBanner from "../../components/home/CareersBanner";
import TestimonialsSlider from "../../components/home/TestimonialsSlider";
import FAQSection from "../../components/home/FAQSection";
import FinalCTA from "../../components/home/FinalCTA";
function Home() {
  return (
    <main className="w-full overflow-x-hidden bg-white">
      <HomeHero />
      <TrustStatsBar />
      <AboutPreview />
      <ServicesSection />
      <DataCenterBanner />
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