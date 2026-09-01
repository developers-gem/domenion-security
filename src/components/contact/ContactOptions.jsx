import { FileText, Phone, Mail, MapPin, ArrowRight } from "lucide-react";
import Reveal from "../common/Reveal";
import "./ContactOptions.css";

const CONTACT_OPTIONS = [
  {
    num: "01",
    icon: FileText,
    title: "REQUEST A QUOTE",
    desc: "Tell us about your security requirements and site needs.",
    actionText: "GET STARTED",
    actionType: "scroll",
    targetId: "contact-form-section",
  },
  {
    num: "02",
    icon: Phone,
    title: "CALL DOMINION",
    desc: "Speak directly with our security directors and dispatch team.",
    actionText: "(602) 438-4445",
    actionType: "tel",
    href: "tel:+16024384445",
  },
  {
    num: "03",
    icon: Mail,
    title: "EMAIL US",
    desc: "Send us your security specifications or RFP documents.",
    actionText: "SEND EMAIL",
    actionType: "mailto",
    href: "mailto:Domenionseurityllc@gmail.com",
  },
  {
    num: "04",
    icon: MapPin,
    title: "SERVICE AREA",
    desc: "Licensed, bonded, and providing professional coverage across all 50 states.",
    actionText: "VIEW LOCATION",
    actionType: "scroll",
    targetId: "location-section",
  },
];

export default function ContactOptions() {
  const handleAction = (item) => {
    if (item.actionType === "scroll" && item.targetId) {
      const el = document.getElementById(item.targetId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    } else if (item.href) {
      window.location.assign(item.href);
    }
  };

  return (
    <section className="section ds-contact-options-section">
      <div className="container">
        {/* Section Header */}
        <div className="row align-items-end mb-5">
          <div className="col-lg-7">
            <Reveal direction="up">
              <span className="section-label">HOW CAN WE HELP?</span>
            </Reveal>

            <Reveal direction="up" delay={0.1}>
              <h2 className="section-title">
                Choose the way that
                <br />
                <span>works best for you.</span>
              </h2>
            </Reveal>
          </div>

          <div className="col-lg-5 mt-4 mt-lg-0">
            <Reveal direction="up" delay={0.2}>
              <p className="section-description">
                Whether you need an immediate security quote, 24/7 dispatch support, or an initial operational consultation, we are here to assist.
              </p>
            </Reveal>
          </div>
        </div>

        {/* 4 Editorial Column Cards */}
        <div className="row g-4">
          {CONTACT_OPTIONS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={item.num} className="col-md-6 col-lg-3">
                <Reveal direction="up" delay={0.08 * idx}>
                  <div
                    className="ds-contact-option-card"
                    onClick={() => handleAction(item)}
                  >
                    <div className="ds-opt-card-header">
                      <span className="ds-opt-num">{item.num}</span>
                      <Icon size={20} className="ds-opt-icon" />
                    </div>

                    <h3 className="ds-opt-title">{item.title}</h3>
                    <p className="ds-opt-desc">{item.desc}</p>

                    <div className="ds-opt-action-link">
                      <span>{item.actionText}</span>
                      <ArrowRight size={15} className="ds-opt-arrow" />
                    </div>
                  </div>
                </Reveal>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
