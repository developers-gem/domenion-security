import Hero from "../../components/contact/Hero/Hero";
import ContactInfo from "../../components/contact/ContactInfo/ContactInfo";
import ContactForm from "../../components/contact/ContactForm/ContactForm";
import OfficeLocations from "../../components/contact/OfficeLocations/OfficeLocations";
import Emergency from "../../components/contact/Emergency/Emergency";
import Map from "../../components/contact/Map/Map";
import CTA from "../../components/services/CTA/CTA";

function Contact() {
  return (
    <>
      <Hero />
      <ContactInfo />
      <ContactForm />
      <OfficeLocations />
      <Emergency />
      <Map />
      <CTA />
    </>
  );
}

export default Contact;