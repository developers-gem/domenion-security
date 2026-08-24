import { Phone, Mail, MapPin, Clock3 } from "lucide-react";
import Reveal from "../common/Reveal";
import "./ContactInformation.css";

const INFO_CARDS = [
  {
    icon: Phone,
    label: "DIRECT PHONE",
    value: "(602) 438-4445",
    subtext: "24/7 Emergency Dispatch & Quotes",
    href: "tel:+16024384445",
  },
  {
    icon: Mail,
    label: "DIRECT EMAIL",
    value: "info@domenionsecurity.com",
    subtext: "RFP & Operational Specifications",
    href: "mailto:info@domenionsecurity.com",
  },
  {
    icon: MapPin,
    label: "SERVICE AREA",
    value: "Arizona & Nationwide",
    subtext: "Statewide & Regional Guard Deployments",
    href: "#location-section",
  },
  {
    icon: Clock3,
    label: "DISPATCH HOURS",
    value: "24 / 7 / 365",
    subtext: "Continuous Security & Command Center",
    href: null,
  },
];

export default function ContactInformation() {
  return (
    <section className="section ds-contact-info-section">
      <div className="container">
        {/* Section Header */}
        <div className="row align-items-end mb-5">
          <div className="col-lg-7">
            <Reveal direction="up">
              <span className="section-label">CONTACT INFORMATION</span>
            </Reveal>

            <Reveal direction="up" delay={0.1}>
              <h2 className="section-title">
                Direct lines to
                <br />
                <span>Dominion Security operations.</span>
              </h2>
            </Reveal>
          </div>

          <div className="col-lg-5 mt-4 mt-lg-0">
            <Reveal direction="up" delay={0.2}>
              <p className="section-description">
                Reach our team directly by phone, email, or through our 24/7 emergency dispatch desk.
              </p>
            </Reveal>
          </div>
        </div>

        {/* 4 Large Typography Cards */}
        <div className="row g-4">
          {INFO_CARDS.map((card, idx) => {
            const Icon = card.icon;
            const content = (
              <div className="ds-cinfo-card">
                <div className="ds-cinfo-header">
                  <Icon size={20} className="ds-cinfo-icon" />
                  <span className="ds-cinfo-label">{card.label}</span>
                </div>

                <h3 className="ds-cinfo-value">{card.value}</h3>
                <p className="ds-cinfo-subtext">{card.subtext}</p>
                <div className="ds-cinfo-gold-accent" />
              </div>
            );

            return (
              <div key={card.label} className="col-md-6 col-lg-3">
                <Reveal direction="up" delay={0.06 * idx}>
                  {card.href ? (
                    <a href={card.href} className="ds-cinfo-link">
                      {content}
                    </a>
                  ) : (
                    content
                  )}
                </Reveal>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
