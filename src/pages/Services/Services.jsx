import ServicesHero from "../../components/services/ServicesHero";
import ServicesIntro from "../../components/services/ServicesIntro";
import FeaturedServices from "../../components/services/FeaturedServices";
import ServicePortfolio from "../../components/services/ServicePortfolio";
import WhyChooseServices from "../../components/services/WhyChooseServices";
import ServicesApproach from "../../components/services/ServicesApproach";
import ServiceCategories from "../../components/services/ServiceCategories";
import ServicesImageStatement from "../../components/services/ServicesImageStatement";
import ServicesCTA from "../../components/services/ServicesCTA";
import "./Services.css";

/**
 * Dominion Security Main Services Landing Page.
 * Composes 9 modular, high-impact enterprise UI components introducing
 * all 14 security capabilities with responsive motion and clean section alternation.
 */
function Services() {
  return (
    <main className="ds-services-page-main">
      <ServicesHero />
      <ServicesIntro />
      <FeaturedServices />
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