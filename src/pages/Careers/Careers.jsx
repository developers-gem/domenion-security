import CareersHero from "../../components/careers/CareersHero";
import WhyWorkDominion from "../../components/careers/WhyWorkDominion";
import CareerCulture from "../../components/careers/CareerCulture";
import CareerValues from "../../components/careers/CareerValues";
import OpenPositions from "../../components/careers/OpenPositions";
import CareerExperience from "../../components/careers/CareerExperience";
import CareerCTA from "../../components/careers/CareerCTA";
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
      <WhyWorkDominion />
      <CareerCulture />
      <CareerValues />
      <OpenPositions />
      <CareerExperience />
      <CareerCTA />
    </main>
  );
}

export default Careers;
