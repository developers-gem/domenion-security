import { Phone, Mail, MapPin, Clock3 } from "lucide-react";
import Reveal from "../common/Reveal";

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
    value: "Domenionseurityllc@gmail.com",
    subtext: "RFP & Operational Specifications",
    href: "mailto:Domenionseurityllc@gmail.com",
  },
  {
    icon: MapPin,
    label: "SERVICE AREA",
    value: "50-State Coverage",
    subtext: "Licensed, Bonded & Nationwide Guard Deployments",
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
    <section className="py-20 sm:py-28 bg-white text-domenion-blue border-b border-neutral-border">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12">
          <div className="lg:col-span-7">
            <Reveal direction="up">
              <span className="inline-flex items-center gap-2 text-domenion-gold font-heading text-xs font-extrabold tracking-widest uppercase">
                CONTACT INFORMATION
              </span>
            </Reveal>

            <Reveal direction="up" delay={0.1}>
              <h2 className="text-domenion-blue font-heading text-3xl sm:text-4xl font-extrabold tracking-tight mt-2 leading-tight capitalize">
                Direct lines to{" "}
                <span className="text-domenion-gold">
                  Domenion Security operations.
                </span>
              </h2>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal direction="up" delay={0.2}>
              <p className="text-gray-600 font-sans text-base sm:text-lg leading-relaxed">
                Reach our team directly by phone, email, or through our 24/7
                emergency dispatch desk.
              </p>
            </Reveal>
          </div>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {INFO_CARDS.map((card, idx) => {
            const Icon = card.icon;
            const content = (
              <div className="bg-neutral-light border border-neutral-border hover:border-domenion-gold/50 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col flex-1 h-full group">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-neutral-border">
                  <span className="text-domenion-gold font-heading text-xs font-extrabold tracking-widest uppercase">
                    {card.label}
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-domenion-blue/5 border border-domenion-gold/30 text-domenion-gold grid place-items-center group-hover:bg-domenion-gold group-hover:text-domenion-blue transition-colors">
                    <Icon size={16} />
                  </div>
                </div>

                <h3 className="text-domenion-blue font-heading text-lg font-bold mb-1 break-all">
                  {card.value}
                </h3>

                <p className="text-gray-500 text-xs leading-relaxed flex-1">
                  {card.subtext}
                </p>
              </div>
            );

            return (
              <div key={card.label} className="h-full flex flex-col">
                <Reveal
                  direction="up"
                  delay={0.06 * idx}
                  className="h-full flex-1 flex flex-col"
                >
                  {card.href ? (
                    <a
                      href={card.href}
                      className="text-decoration-none h-full flex-1 flex flex-col"
                    >
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
