import { ShieldCheck, CheckCircle2 } from "lucide-react";
import Reveal from "../common/Reveal";

const COVERED_REGIONS = [
  "Phoenix Metropolitan Area",
  "Tucson & Southern Arizona",
  "Scottsdale & East Valley Commercial Corridors",
  "Northern Arizona Regional Operations",
  "Statewide Critical Infrastructure Protection",
  "Multi-State & Nationwide Accounts",
];

export default function ContactLocation() {
  return (
    <section
      className="py-20 sm:py-28 bg-neutral-light text-domenion-blue border-b border-neutral-border"
      id="location-section"
    >
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Visual Map / Architectural Panel */}
          <div className="lg:col-span-6">
            <Reveal direction="left">
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-neutral-border group">
                <img
                  src="/images/service-areas/coverage-map.png"
                  alt="Service Area Map"
                  className="w-full h-80 sm:h-96 object-cover bg-white p-4 group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.target.src = "/images/company-security.jpg";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-domenion-blue/80 via-transparent to-transparent" />

                <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md p-4 rounded-xl border border-domenion-gold/40 shadow-lg flex flex-col text-domenion-blue">
                  <div className="flex items-center gap-2 mb-1">
                    <ShieldCheck size={16} className="text-domenion-gold" />
                    <span className="text-domenion-gold font-heading text-[10px] font-extrabold tracking-widest uppercase">
                      Domenion SECURITY HEADQUARTERS
                    </span>
                  </div>
                  <strong className="text-xs font-extrabold font-heading text-domenion-blue uppercase">
                    50-STATE COVERAGE & NATIONWIDE OPERATIONS
                  </strong>
                  <span className="text-gray-600 text-xs mt-0.5">
                    24/7 Command Dispatch & Guard Operations
                  </span>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Service Area Statement & Regions */}
          <div className="lg:col-span-6">
            <div className="flex flex-col">
              <Reveal direction="up">
                <span className="inline-flex items-center gap-2 text-domenion-gold font-heading text-xs font-extrabold tracking-widest uppercase">
                  SERVICE COVERAGE
                </span>
              </Reveal>

              <Reveal direction="up" delay={0.1}>
                <h2 className="text-domenion-blue font-heading text-3xl sm:text-4xl font-extrabold tracking-tight mt-2 mb-4 leading-tight capitalize">
                  Licensed, bonded, and providing professional security coverage
                  across all 50 states.
                </h2>
              </Reveal>

              <Reveal direction="up" delay={0.2}>
                <p className="text-gray-700 font-sans text-base sm:text-lg leading-relaxed mb-6 font-medium">
                  Domenion Security provides licensed physical guarding, mobile
                  patrol, data center defense, and security management across
                  commercial centers, industrial sites, and critical
                  infrastructure.
                </p>
              </Reveal>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {COVERED_REGIONS.map((region, idx) => (
                  <Reveal key={region} direction="up" delay={0.05 * idx}>
                    <div className="flex items-center gap-2.5 p-3 rounded-lg bg-white border border-neutral-border text-xs font-semibold text-domenion-blue">
                      <CheckCircle2
                        size={15}
                        className="text-domenion-gold flex-shrink-0"
                      />
                      <span>{region}</span>
                    </div>
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
