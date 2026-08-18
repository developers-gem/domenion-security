import { useParams, Navigate } from "react-router-dom";

import { services } from "../../data/services";

import Hero from "../../components/serviceDetails/Hero";
import Overview from "../../components/serviceDetails/Overview";
import Features from "../../components/serviceDetails/Features";
import Benefits from "../../components/serviceDetails/Benefits";
import Quote from "../../components/serviceDetails/Quote";
import CTA from "../../components/services/CTA";

function ServiceDetails() {

  const { slug } = useParams();

  const service = services.find(
    (item) => item.slug === slug
  );

  if (!service) {
    return <Navigate to="/404" replace />;
  }

  return (
    <>
      <Hero service={service} />

      <Overview service={service} />

      <Features service={service} />

      <Benefits service={service} />

      <Quote service={service} />

      <CTA />
    </>
  );
}

export default ServiceDetails;