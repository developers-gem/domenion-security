import CareersHero from "../../components/Careers/CareersHero";
import WhyWorkDominion from "../../components/Careers/WhyWorkDominion";
import CareerCulture from "../../components/Careers/CareerCulture";
import CareerValues from "../../components/Careers/CareerValues";
import OpenPositions from "../../components/Careers/OpenPositions";
import CareerExperience from "../../components/Careers/CareerExperience";
import CareerCTA from "../../components/Careers/CareerCTA";
import "./Careers.css";

/**
 * Dominion Security Careers Page.
 * Composes 7 recruitment-focused enterprise components ("WHO BUILDS DOMINION")
 * featuring human/team imagery, editorial benefit rows, values, real job integration,
 * modal application form with optional resume upload, and responsive layout.
 */
function Careers() {
  return (
    <main className="ds-careers-page-main">
      <CareersHero />
      <OpenPositions />
      <WhyWorkDominion />
      <CareerCulture />
      <CareerValues />
      <CareerExperience />
      <CareerCTA />
    </main>
  );
}

export default Careers;
