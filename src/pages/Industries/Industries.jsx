import Hero from "../../components/industries/Hero/Hero";
import Intro from "../../components/industries/Intro/Intro";
import IndustryGrid from "../../components/industries/IndustryGrid/IndustryGrid";
import WhyIndustries from "../../components/industries/WhyIndustries/WhyIndustries";
import Coverage from "../../components/industries/Coverage/Coverage";
import CTA from "../../components/services/CTA/CTA";

function Industries() {
  return (
    <>
      <Hero />
      <Intro />
      <IndustryGrid />
      <WhyIndustries />
      <Coverage />
      <CTA />
    </>
  );
}

export default Industries;