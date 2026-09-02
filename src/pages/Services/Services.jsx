import ServicesHero from "../../components/services/ServicesHero";
import ServicesIntro from "../../components/services/ServicesIntro";
import FeaturedServices from "../../components/services/FeaturedServices";
import DataCenterBanner from "../../components/home/DataCenterBanner";
import ServicePortfolio from "../../components/services/ServicePortfolio";
import WhyChooseServices from "../../components/services/WhyChooseServices";
import ServicesApproach from "../../components/services/ServicesApproach";
import ServiceCategories from "../../components/services/ServiceCategories";
import ServicesImageStatement from "../../components/services/ServicesImageStatement";
import ServicesCTA from "../../components/services/ServicesCTA";
function Services() {
  return (
    <main className="w-full overflow-x-hidden bg-white">
      <ServicesHero />
      <ServicesIntro />
      <FeaturedServices />
      <DataCenterBanner />
      <ServicePortfolio />
      <WhyChooseServices />
      <ServicesApproach />
      <ServiceCategories />
      <ServicesImageStatement />
      <ServicesCTA />
    </main>
  );
}

export default Services;