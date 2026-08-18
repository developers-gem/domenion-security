import ServiceHero from "../../components/services/ServiceHero/ServiceHero";
// import FeaturedServices from "../../components/services/FeaturedServices";
import ServicesGrid from "../../components/services/ServicesGrid/ServicesGrid";
import Process from "../../components/services/Process/Process";
// import Stats from "../../components/services/Stats/Stats";
import WhyChoose from "../../components/services/WhyChoose/WhyChoose";
import CTA from "../../components/services/CTA";

function Services() {
    return (
        <>
            <ServiceHero />
            <ServicesGrid />
            <WhyChoose />
            <Process />
            {/* <FeaturedServices /> */}
            {/* <Stats/> */}
            <CTA />
        </>
    );
}

export default Services;