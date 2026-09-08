import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, LockKeyhole, Cpu, Award } from "lucide-react";
import Reveal from "../common/Reveal";

const SERVICE_GROUPS = [
  {
    category: "PHYSICAL SECURITY",
    icon: ShieldCheck,
    items: [
      {
        name: "Professional Physical Security Services",
        slug: "physical-security",
      },
      { name: "Professional Mobile Patrol Services", slug: "mobile-patrol" },
      {
        name: "Professional Executive Protection Services",
        slug: "executive-protection",
      },
      {
        name: "Professional Commercial Security Services",
        slug: "commercial-security",
      },
      {
        name: "Professional Residential Security Services",
        slug: "residential-security",
      },
    ],
  },
  {
    category: "SPECIALIZED INDUSTRIAL PROTECTION",
    icon: LockKeyhole,
    items: [
      {
        name: "Professional Airport Security Services",
        slug: "airport-security",
      },
      {
        name: "Professional Transportation Security Services",
        slug: "transportation-security",
      },
      {
        name: "Professional Construction Site Security Services",
        slug: "construction-security",
      },
      {
        name: "Professional Government Security Services",
        slug: "government-security",
      },
    ],
  },
  {
    category: "ENTERPRISE & DIGITAL DEFENSE",
    icon: Cpu,
    items: [
      { name: "Enterprise Cyber Security Services", slug: "cyber-security" },
      {
        name: "Professional Data Center Security Services",
        slug: "data-center-security",
      },
      {
        name: "Professional Security Risk Assessment Services",
        slug: "risk-assessment",
      },
    ],
  },
  {
    category: "HIGH-LEVEL CLEARANCE",
    icon: Award,
    items: [
      { name: "Clearance Security Solutions", slug: "clearance-solutions" },
      { name: "Top Secret Security Solutions", slug: "top-secret-solutions" },
    ],
  },
];

export default function ServiceCategories() {
  return (
    <section className="py-20 sm:py-28 bg-white text-domenion-blue border-b border-neutral-border">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Reveal direction="up">
            <span className="inline-flex items-center gap-2 text-domenion-gold font-heading text-xs font-extrabold tracking-widest uppercase">
              SERVICE CATEGORIES
            </span>
          </Reveal>

          <Reveal direction="up" delay={0.1}>
            <h2 className="text-domenion-blue font-heading text-3xl sm:text-4xl font-extrabold tracking-tight mt-2 capitalize">
              Targeted capabilities by security sector.
            </h2>
          </Reveal>
        </div>

        {/* Editorial Category Group Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {SERVICE_GROUPS.map((group, idx) => {
            const Icon = group.icon;
            return (
              <div key={group.category} className="h-full flex flex-col">
                <Reveal
                  direction="up"
                  delay={0.1 * idx}
                  className="h-full flex-1 flex flex-col"
                >
                  <div className="bg-neutral-light border border-neutral-border rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex-1 h-full flex flex-col">
                    <div className="flex items-center gap-3 pb-4 mb-4 border-b border-neutral-border">
                      <div className="w-9 h-9 rounded-lg bg-domenion-blue/5 border border-domenion-gold/30 text-domenion-gold grid place-items-center">
                        <Icon size={18} />
                      </div>
                      <span className="text-domenion-blue font-heading text-sm font-extrabold tracking-wider uppercase">
                        {group.category}
                      </span>
                    </div>

                    <ul className="flex flex-col gap-2 list-none p-0 m-0">
                      {group.items.map((item) => (
                        <li key={item.slug}>
                          <Link
                            to={`/services/${item.slug}`}
                            className="flex items-center justify-between p-3 rounded-lg bg-white border border-neutral-border hover:border-domenion-gold/50 text-domenion-blue font-heading text-sm font-bold hover:text-domenion-gold transition-all duration-200 group text-decoration-none"
                          >
                            <span>{item.name}</span>
                            <ArrowRight
                              size={14}
                              className="text-domenion-gold group-hover:translate-x-1 transition-transform"
                            />
                          </Link>
                        </li>
                      ))}
                    </ul>
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
