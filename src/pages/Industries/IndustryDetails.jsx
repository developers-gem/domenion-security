import { useParams, Navigate } from "react-router-dom";
import { industries } from "../../data/industries";

import IndustryDetailHero from "../../components/industries/detail/IndustryDetailHero";
import IndustryOverview from "../../components/industries/detail/IndustryOverview";
import IndustryLandscape from "../../components/industries/detail/IndustryLandscape";
import IndustryChallengePanels from "../../components/industries/detail/IndustryChallengePanels";
import IndustryApproach from "../../components/industries/detail/IndustryApproach";
import IndustryDetailPriorities from "../../components/industries/detail/IndustryDetailPriorities";
import IndustryServiceLinks from "../../components/industries/detail/IndustryServiceLinks";
import IndustryVisualBreak from "../../components/industries/detail/IndustryVisualBreak";
import RelatedIndustries from "../../components/industries/detail/RelatedIndustries";
import IndustryDetailCTA from "../../components/industries/detail/IndustryDetailCTA";

/**
 * Dominion Security Individual Industry Detail Page System.
 * Renders the 10-part environmental-focused enterprise layout for any of the 11 protected sectors.
 */
function IndustryDetails() {
  const { slug } = useParams();

  const industry = industries.find(
    (item) =>
      item.slug === slug ||
      item.slug === slug.replace("-security", "") ||
      item.slug === slug.replace("-solutions", "")
  );

  if (!industry) {
    return <Navigate to="/404" replace />;
  }

  return (
    <main className="w-full overflow-x-hidden bg-white">
      <IndustryDetailHero industry={industry} />
      <IndustryOverview industry={industry} />
      <IndustryLandscape industry={industry} />
      <IndustryChallengePanels industry={industry} />
      <IndustryApproach industry={industry} />
      <IndustryDetailPriorities industry={industry} />
      <IndustryServiceLinks industry={industry} />
      <IndustryVisualBreak industry={industry} />
      <RelatedIndustries currentSlug={industry.slug} />
      <IndustryDetailCTA industry={industry} />
    </main>
  );
}

export default IndustryDetails;