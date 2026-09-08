import CareersHero from "../../components/Careers/CareersHero";
import WhyWorkDomenion from "../../components/Careers/WhyWorkDominion";
import CareerCulture from "../../components/Careers/CareerCulture";
import CareerValues from "../../components/Careers/CareerValues";
import OpenPositions from "../../components/Careers/OpenPositions";
import CareerExperience from "../../components/Careers/CareerExperience";
import CareerCTA from "../../components/Careers/CareerCTA";

/**
 * Domenion Security Careers Page.
 * Composes recruitment-focused enterprise components featuring human/team imagery,
 * editorial benefit rows, values, real job integration, modal application form, and responsive layout.
 */
function Careers() {
  return (
    <main className="w-full overflow-x-hidden bg-white">
      <CareersHero />
      <OpenPositions />
      <WhyWorkDomenion />
      <CareerCulture />
      <CareerValues />
      <CareerExperience />
      <CareerCTA />
    </main>
  );
}

export default Careers;
