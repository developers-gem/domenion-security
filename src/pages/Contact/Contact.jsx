import ContactHero from "../../components/contact/ContactHero";
import ContactOptions from "../../components/contact/ContactOptions";
import ContactForm from "../../components/contact/ContactForm";
import ContactProcess from "../../components/contact/ContactProcess";
import ContactInformation from "../../components/contact/ContactInformation";
import ContactLocation from "../../components/contact/ContactLocation";
import ContactFAQ from "../../components/contact/ContactFAQ";
import ContactCTA from "../../components/contact/ContactCTA";

/**
 * Dominion Security Contact Page.
 * Composes conversion-focused enterprise components featuring architectural hero, 4 contact options,
 * quote form, 4-step onboarding timeline, contact details, location visual, accordion FAQ, and Gold CTA.
 */
function Contact() {
  return (
    <main className="w-full overflow-x-hidden bg-white">
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