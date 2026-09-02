import Hero from "../../components/serviceAreas/Hero";
import Coverage from "../../components/serviceAreas/Coverage";
import States from "../../components/serviceAreas/States";
import Cities from "../../components/serviceAreas/Cities";
import LocalQuote from "../../components/serviceAreas/LocalQuote";
import ServicesCTA from "../../components/services/ServicesCTA";

function ServiceAreas() {
  return (
    <main className="w-full overflow-x-hidden bg-white">
      <Hero />
      <Coverage />
      <States />
      <Cities />
      <LocalQuote />
      <ServicesCTA />
    </main>
  );
}

export default ServiceAreas;