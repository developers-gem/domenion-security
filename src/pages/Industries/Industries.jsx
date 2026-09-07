import IndustriesHero from "../../components/industries/landing/IndustriesHero";
import IndustrySnapshot from "../../components/industries/landing/IndustrySnapshot";
import IndustryExplorer from "../../components/industries/landing/IndustryExplorer";
import IndustryChallenges from "../../components/industries/landing/IndustryChallenges";
import IndustryStory from "../../components/industries/landing/IndustryStory";
import IndustryPriorities from "../../components/industries/landing/IndustryPriorities";
import IndustryGrid from "../../components/industries/landing/IndustryGrid";
import IndustryCrossServices from "../../components/industries/landing/IndustryCrossServices";
import IndustriesCTA from "../../components/industries/landing/IndustriesCTA";

/**
 * Domenion Security Main Industries Landing Page.
 * Composes 9 environmental-focused enterprise UI components introducing
 * all protected sectors with full-width cinematic hero, signature interactive explorer,
 * challenge blocks, and cross-service mappings.
 */
function Industries() {
  return (
    <main className="w-full overflow-x-hidden bg-white">
      <IndustriesHero />
      <IndustriesSnapshot />
      <IndustryExplorer />
      <IndustryChallenges />
      <IndustryStory />
      <IndustryPriorities />
      <IndustryGrid />
      <IndustryCrossServices />
      <IndustriesCTA />
    </main>
  );
}

// Fixed typo in Component import
function IndustriesSnapshot() {
  return <IndustrySnapshot />;
}

export default Industries;