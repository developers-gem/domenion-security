import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck } from "lucide-react";
import Button from "../common/Button";
import Reveal from "../common/Reveal";
import { services } from "../../data/services";

// REPLACEMENT OFFICER IMAGE ASSET: Component prepared for new corporate security officer image asset
const CORPORATE_OFFICER_IMAGE_PATH = "/images/physical-security.jpg";

export default function ServicesSection() {
  const featuredPhysical = services.find((s) => s.slug === "physical-security") || services[0];
  const gridServices = services
    .filter((s) => s.slug !== "physical-security")
    .slice(0, 4);

  return (
    <section className="py-20 sm:py-28 bg-neutral-light text-domenion-blue border-b border-neutral-border">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12">
          <div className="lg:col-span-7">
            <Reveal direction="up">
              <span className="inline-flex items-center gap-2 text-domenion-gold font-heading text-xs font-extrabold tracking-widest uppercase">OUR SERVICES</span>
            </Reveal>

            <Reveal direction="up" delay={0.1}>
              <h2 className="text-domenion-blue font-heading text-3xl sm:text-4xl font-extrabold tracking-tight mt-2">
                Complete security <span className="text-domenion-gold">solutions for every environment.</span>
              </h2>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal direction="up" delay={0.2}>
              <p className="text-gray-600 font-sans text-base sm:text-lg leading-relaxed">
                From armed and unarmed security guards to critical data center defense
                and cybersecurity, Domenion delivers specialized solutions tailored to
                your exact operational risks.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Services Showcase Grid: 1 Large Featured Card + 4 Grid Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Featured Service (Physical Security) */}
          <div className="lg:col-span-6">
            <Reveal direction="left">
              <Link
                to={`/services/${featuredPhysical.slug}`}
                className="relative block rounded-2xl overflow-hidden shadow-lg border border-neutral-border hover:border-domenion-gold transition-all duration-300 group h-full min-h-[480px] p-8 flex flex-col justify-end text-white text-decoration-none"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
                  style={{
                    backgroundImage: `url(${CORPORATE_OFFICER_IMAGE_PATH})`,
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-domenion-blue/95 via-domenion-blue/60 to-domenion-blue/20" />

                <div className="relative z-10 flex flex-col gap-3">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-domenion-gold/20 border border-domenion-gold/40 rounded-full text-domenion-gold font-heading text-xs font-bold w-fit">
                    <ShieldCheck size={14} className="text-domenion-gold" />
                    <span>FEATURED CAPABILITY</span>
                  </div>

                  <span className="text-domenion-gold font-heading text-4xl font-extrabold opacity-60">01</span>

                  <h3 className="text-white font-heading text-2xl sm:text-3xl font-extrabold tracking-tight">
                    {featuredPhysical.title}
                  </h3>

                  <p className="text-white/80 text-sm leading-relaxed max-w-lg">
                    {featuredPhysical.shortDescription ||
                      "Professional armed & unarmed security officers protecting people, commercial property, and critical infrastructure."}
                  </p>

                  <div className="inline-flex items-center gap-2 text-domenion-gold font-heading text-sm font-bold mt-2 group-hover:translate-x-2 transition-transform duration-300">
                    <span>Explore Physical Security</span>
                    <ArrowRight size={18} />
                  </div>
                </div>
              </Link>
            </Reveal>
          </div>

          {/* 4 Secondary Service Cards */}
          <div className="lg:col-span-6 flex flex-col justify-between gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {gridServices.map((service, index) => (
                <div key={service.slug}>
                  <Reveal direction="up" delay={0.1 * index}>
                    <Link
                      to={`/services/${service.slug}`}
                      className="block bg-white rounded-xl border border-neutral-border hover:border-domenion-gold/50 p-6 shadow-sm hover:shadow-md transition-all duration-300 group h-full text-decoration-none"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-domenion-gold font-heading text-sm font-extrabold">
                          {String(index + 2).padStart(2, "0")}
                        </span>
                        <div className="w-8 h-8 rounded-full bg-domenion-blue/5 text-domenion-blue grid place-items-center group-hover:bg-domenion-gold group-hover:text-domenion-blue transition-colors">
                          <ArrowRight size={16} />
                        </div>
                      </div>

                      <h4 className="text-domenion-blue font-heading text-lg font-bold group-hover:text-domenion-gold transition-colors">{service.title}</h4>

                      <p className="text-gray-500 text-xs sm:text-sm mt-2 leading-relaxed line-clamp-2">
                        {service.shortDescription || "Enterprise protection capability"}
                      </p>

                      <span className="inline-block text-domenion-gold font-heading text-xs font-bold mt-4">
                        Explore Capability →
                      </span>
                    </Link>
                  </Reveal>
                </div>
              ))}
            </div>

            {/* Bottom Link Bar */}
            <div className="pt-2">
              <Reveal direction="up" delay={0.4}>
                <div className="bg-white border border-neutral-border rounded-xl p-5 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
                  <span className="text-domenion-blue font-heading font-bold text-sm">Looking for complete protection solutions?</span>
                  <Button to="/services" variant="gold-outline" size="sm" icon={ArrowRight}>
                    View All Services
                  </Button>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

