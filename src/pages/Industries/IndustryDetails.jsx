import { useParams, Navigate } from "react-router-dom";

import { industries } from "../../data/industries";

import Hero from "../../components/industryDetails/Hero/Hero";
import Overview from "../../components/industryDetails/Overview/Overview";
import Features from "../../components/industryDetails/Features/Features";
import Benefits from "../../components/industryDetails/Benefits/Benefits";
import RelatedIndustries from "../../components/industryDetails/RelatedIndustries/RelatedIndustries";
import Quote from "../../components/industryDetails/Quote/Quote";
import CTA from "../../components/industryDetails/CTA/CTA";

function IndustryDetails() {

  const { slug } = useParams();

  const industry = industries.find(
    (item) => item.slug === slug
  );

  if (!industry) {
    return <Navigate to="/404" replace />;
  }

  return (
    <>
      <Hero industry={industry} />

      <Overview industry={industry} />

      <Features industry={industry} />

      <Benefits industry={industry} />

      <RelatedIndustries industry={industry} />

      <Quote industry={industry} />

      <CTA />
    </>
  );
}

export default IndustryDetails;