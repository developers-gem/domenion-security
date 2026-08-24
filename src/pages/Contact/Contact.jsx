import ContactHero from "../../components/contact/ContactHero";
import ContactOptions from "../../components/contact/ContactOptions";
import ContactForm from "../../components/contact/ContactForm";
import ContactProcess from "../../components/contact/ContactProcess";
import ContactInformation from "../../components/contact/ContactInformation";
import ContactLocation from "../../components/contact/ContactLocation";
import ContactFAQ from "../../components/contact/ContactFAQ";
import ContactCTA from "../../components/contact/ContactCTA";
import "./Contact.css";

/**
 * Dominion Security Contact Page.
 * Composes 8 conversion-focused enterprise components ("CONCIERGE & CONVERSION")
 * featuring architectural hero, 4 contact options, 2-column quote form with direct API submission,
 * 4-step onboarding timeline, large typography contact details, location visual, accordion FAQ, and Gold CTA.
 */
function Contact() {
  return (
    <main className="ds-contact-page-main">
      <ContactHero />
      <ContactOptions />
      <ContactForm />
      <ContactProcess />
      <ContactInformation />
      <ContactLocation />
      <ContactFAQ />
      <ContactCTA />
    </main>
  );
}

export default Contact;