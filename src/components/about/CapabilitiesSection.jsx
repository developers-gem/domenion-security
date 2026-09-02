import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck } from "lucide-react";
import Reveal from "../common/Reveal";
import { services } from "../../data/services";

export default function CapabilitiesSection() {
  return (
    <section className="py-20 sm:py-28 bg-neutral-light text-domenion-blue border-b border-neutral-border">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Visual Image Panel */}
          <div className="lg:col-span-5">
            <Reveal direction="left">
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-neutral-border group">
                <img
                  src="/images/physical-security.jpg"
                  alt="Dominion Security Guard Capabilities"
                  className="w-full h-[480px] object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.target.src = "/images/company-security.jpg";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-domenion-blue/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md p-4 rounded-xl border border-domenion-gold/40 shadow-lg flex items-center gap-4 text-domenion-blue">
                  <div className="w-10 h-10 rounded-lg bg-domenion-gold text-domenion-blue grid place-items-center flex-shrink-0">
                    <ShieldCheck size={20} />
                  </div>
                  <div className="flex flex-col">
                    <strong className="text-domenion-blue font-heading text-xs font-extrabold tracking-wider">ENTERPRISE PROTECTION</strong>
                    <span className="text-gray-600 text-xs mt-0.5">Integrated Defense Services</span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Capabilities List */}
          <div className="lg:col-span-7">
            <div className="flex flex-col">
              <Reveal direction="up">
                <span className="inline-flex items-center gap-2 text-domenion-gold font-heading text-xs font-extrabold tracking-widest uppercase">OUR CAPABILITIES</span>
              </Reveal>

              <Reveal direction="up" delay={0.1}>
                <h2 className="text-domenion-blue font-heading text-3xl sm:text-4xl font-extrabold tracking-tight mt-2 mb-6 leading-tight">
                  From security officers on the ground <span className="text-domenion-gold">to protection behind the scenes.</span>
                </h2>
              </Reveal>

              <div className="flex flex-col gap-3 max-h-[440px] overflow-y-auto pr-2 custom-scrollbar">
                {services.map((service, index) => (
                  <Reveal key={service.slug} direction="up" delay={0.03 * index}>
                    <Link
                      to={`/services/${service.slug}`}
                      className="flex items-center justify-between p-4 rounded-xl bg-white border border-neutral-border hover:border-domenion-gold/50 shadow-sm hover:shadow-md transition-all duration-200 group text-decoration-none"
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-domenion-gold font-heading text-sm font-extrabold">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <div className="flex flex-col">
                          <h3 className="text-domenion-blue font-heading text-base font-bold group-hover:text-domenion-gold transition-colors">{service.title}</h3>
                          <p className="text-gray-500 text-xs mt-0.5">{service.shortDescription || "Specialized security service"}</p>
                        </div>
                      </div>
                      <ArrowRight size={16} className="text-domenion-gold group-hover:translate-x-1 transition-transform flex-shrink-0" />
                    </Link>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

