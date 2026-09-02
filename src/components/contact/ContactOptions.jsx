import { FileText, Phone, Mail, MapPin, ArrowRight } from "lucide-react";
import Reveal from "../common/Reveal";

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
    <section className="py-20 sm:py-28 bg-white text-domenion-blue border-b border-neutral-border">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12">
          <div className="lg:col-span-7">
            <Reveal direction="up">
              <span className="inline-flex items-center gap-2 text-domenion-gold font-heading text-xs font-extrabold tracking-widest uppercase">HOW CAN WE HELP?</span>
            </Reveal>

            <Reveal direction="up" delay={0.1}>
              <h2 className="text-domenion-blue font-heading text-3xl sm:text-4xl font-extrabold tracking-tight mt-2 leading-tight">
                Choose the way that <span className="text-domenion-gold">works best for you.</span>
              </h2>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal direction="up" delay={0.2}>
              <p className="text-gray-600 font-sans text-base sm:text-lg leading-relaxed">
                Whether you need an immediate security quote, 24/7 dispatch support, or an initial operational consultation, we are here to assist.
              </p>
            </Reveal>
          </div>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CONTACT_OPTIONS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={item.num}>
                <Reveal direction="up" delay={0.08 * idx}>
                  <div
                    className="bg-neutral-light border border-neutral-border hover:border-domenion-gold/50 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between h-full group cursor-pointer"
                    onClick={() => handleAction(item)}
                  >
                    <div>
                      <div className="flex items-center justify-between pb-3 mb-3 border-b border-neutral-border">
                        <span className="text-domenion-gold font-heading text-2xl font-extrabold">{item.num}</span>
                        <div className="w-9 h-9 rounded-lg bg-domenion-blue/5 border border-domenion-gold/30 text-domenion-gold grid place-items-center group-hover:bg-domenion-gold group-hover:text-domenion-blue transition-colors">
                          <Icon size={18} />
                        </div>
                      </div>

                      <h3 className="text-domenion-blue font-heading text-base font-bold mb-2 uppercase">{item.title}</h3>
                      <p className="text-gray-600 text-xs leading-relaxed mb-6">{item.desc}</p>
                    </div>

                    <div className="inline-flex items-center gap-2 text-domenion-gold font-heading text-xs font-bold group-hover:translate-x-1 transition-transform">
                      <span>{item.actionText}</span>
                      <ArrowRight size={15} />
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

