import Hero from "../../components/careers/Hero";
import WhyJoin from "../../components/careers/WhyJoin";
import OpenPositions from "../../components/careers/OpenPositions";
import HiringProcess from "../../components/careers/HiringProcess";
import Benefits from "../../components/careers/Benefits";
import Training from "../../components/careers/Training";
import ApplicationForm from "../../components/careers/ApplicationForm";
import CTA from '../../components/services/CTA/CTA'

function Careers() {
  return (
    <>
      <Hero />
      <WhyJoin />
      <OpenPositions />
      <HiringProcess />
      <Benefits />
      <Training />
      <ApplicationForm />
      <CTA />
    </>
  );
}

export default Careers;