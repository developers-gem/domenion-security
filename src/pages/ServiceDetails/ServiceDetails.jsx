import { useParams, Navigate } from "react-router-dom";
import { services } from "../../data/services";

import ServiceDetailHero from "../../components/services/detail/ServiceDetailHero";
import ServiceDetailIntro from "../../components/services/detail/ServiceDetailIntro";
import ServiceDetailCovers from "../../components/services/detail/ServiceDetailCovers";
import ServiceDetailCapabilities from "../../components/services/detail/ServiceDetailCapabilities";
import CyberIntelligenceHighlight from "../../components/services/detail/CyberIntelligenceHighlight";
import ServiceDetailWhy from "../../components/services/detail/ServiceDetailWhy";
import ServiceDetailProcess from "../../components/services/detail/ServiceDetailProcess";
import ServiceDetailAudience from "../../components/services/detail/ServiceDetailAudience";
import RelatedServices from "../../components/services/detail/RelatedServices";
import ServiceDetailCTA from "../../components/services/detail/ServiceDetailCTA";

/**
 * Dominion Security Individual Service Detail Page System.
 * Renders the 9-part modular enterprise layout for any of the 14 service capabilities.
 * Includes canonical slug and alias resolution.
 */
function ServiceDetails() {
  const { slug } = useParams();

  // Robust slug resolution supporting canonical and alias paths
  const service = services.find(
    (item) =>
      item.slug === slug ||
      item.slug === slug.replace("-solutions", "-security") ||
      item.slug === slug.replace("-security", "-solutions") ||
      item.slug === slug.replace("-site-security", "-security") ||
      item.slug === slug.replace("-risk-assessment", "-assessment")
  );

  if (!service) {
    return <Navigate to="/404" replace />;
  }

  return (
    <main className="w-full overflow-x-hidden bg-white">
      <ServiceDetailHero service={service} />
      <ServiceDetailIntro service={service} />
      <ServiceDetailCovers service={service} />
      <ServiceDetailCapabilities service={service} />
      {service.slug === "cyber-security" && <CyberIntelligenceHighlight />}
      <ServiceDetailWhy service={service} />
      <ServiceDetailProcess service={service} />
      <ServiceDetailAudience service={service} />
      <RelatedServices currentSlug={service.slug} />
      <ServiceDetailCTA service={service} />
    </main>
  );
}

export default ServiceDetails;