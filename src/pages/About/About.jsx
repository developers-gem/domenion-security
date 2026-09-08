import AboutHero from "../../components/about/AboutHero";
import AboutStory from "../../components/about/AboutStory";
import AboutHighlights from "../../components/about/AboutHighlights";
import AboutIndustries from "../../components/about/AboutIndustries";
import SecurityApproach from "../../components/about/SecurityApproach";
import WhyDomenion from "../../components/about/WhyDominion";
import CoreValues from "../../components/about/CoreValues";
import CapabilitiesSection from "../../components/about/CapabilitiesSection";
import SecurityPhilosophy from "../../components/about/SecurityPhilosophy";
import AboutCareersCTA from "../../components/about/AboutCareersCTA";
import FinalCTA from "../../components/home/FinalCTA";

/**
 * Domenion Security About Page.
 * Composes 10 modular story-driven enterprise components with full motion,
 * responsive layouts, and preserved brand aesthetics.
 */
function About() {
  return (
    <main className="w-full overflow-x-hidden bg-white">
      <AboutHero />
      <AboutStory />
      <AboutHighlights />
      <AboutIndustries />
      <SecurityApproach />
      <WhyDomenion />
      <CoreValues />
      {/* <CapabilitiesSection /> */}
      {/* <SecurityPhilosophy /> */}
      {/* <AboutCareersCTA /> */}
      <FinalCTA />
    </main>
  );
}

export default About;