import { Link } from "react-router-dom";
import { ArrowRight, Server, ShieldCheck, Cpu, LockKeyhole } from "lucide-react";
import Button from "../common/Button";
import Reveal from "../common/Reveal";

export default function DataCenterBanner() {
  return (
    <section className="relative py-20 sm:py-28 bg-domenion-blue text-white overflow-hidden border-y border-domenion-gold/30">
      {/* Visual Background with Clean Blue Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <div
          className="w-full h-full bg-cover bg-center opacity-30 scale-105"
          style={{
            backgroundImage: `url(/images/data-center-security.jpg)`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-domenion-blue via-domenion-blue/95 to-domenion-blue/80" />
      </div>

      <div className="relative z-10 max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Main Headline & Description Panel */}
          <div className="lg:col-span-7">
            <div className="flex flex-col">
              <Reveal direction="fade">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-domenion-gold/15 border border-domenion-gold/35 rounded text-domenion-gold font-heading text-xs font-extrabold tracking-widest w-fit mb-4">
                  <Server size={15} className="text-domenion-gold" />
                  <span>STRATEGIC CAPABILITY</span>
                </div>
              </Reveal>

              <Reveal direction="up" delay={0.1}>
                <h2 className="text-white font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">
                  DATA CENTER <span className="text-domenion-gold">SECURITY</span>
                </h2>
              </Reveal>

              <Reveal direction="up" delay={0.2}>
                <p className="text-domenion-gold font-heading text-lg sm:text-xl font-bold mb-4">
                  Protecting mission-critical data centers, infrastructure, systems and operations.
                </p>
              </Reveal>

              <Reveal direction="up" delay={0.3}>
                <p className="text-white/85 text-base sm:text-lg leading-relaxed mb-8 max-w-xl">
                  Domenion Security provides multi-layered physical and operational security solutions 
                  specifically engineered for high-density data facilities, enterprise server halls, 
                  and mission-critical cloud infrastructure across the United States.
                </p>
              </Reveal>

              <Reveal direction="up" delay={0.4}>
                <div className="flex flex-wrap items-center gap-4">
                  <Button
                    to="/services/data-center-security"
                    variant="primary"
                    size="lg"
                    icon={ArrowRight}
                  >
                    Explore Data Center Defense
                  </Button>

                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 text-domenion-gold font-heading text-sm font-bold hover:text-white transition-colors"
                  >
                    <span>Request Data Center Assessment</span>
                    <ArrowRight size={15} />
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Strategic Feature Badges Panel */}
          <div className="lg:col-span-5">
            <Reveal direction="left" delay={0.2}>
              <div className="flex flex-col gap-4">
                <div className="flex items-start gap-4 p-5 rounded-xl bg-white/5 border border-domenion-gold/25 backdrop-blur-sm hover:border-domenion-gold hover:bg-white/10 transition-all duration-300">
                  <div className="w-11 h-11 rounded bg-domenion-gold/15 border border-domenion-gold/30 text-domenion-gold grid place-items-center flex-shrink-0">
                    <ShieldCheck size={24} />
                  </div>
                  <div>
                    <h4 className="text-white font-heading text-base font-bold mb-1">Multi-Layer Physical Defense</h4>
                    <p className="text-white/75 text-xs sm:text-sm leading-relaxed">Biometric access control, man-traps, and armed/unarmed perimeter guards.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-5 rounded-xl bg-white/5 border border-domenion-gold/25 backdrop-blur-sm hover:border-domenion-gold hover:bg-white/10 transition-all duration-300">
                  <div className="w-11 h-11 rounded bg-domenion-gold/15 border border-domenion-gold/30 text-domenion-gold grid place-items-center flex-shrink-0">
                    <Cpu size={24} />
                  </div>
                  <div>
                    <h4 className="text-white font-heading text-base font-bold mb-1">Mission-Critical Uptime</h4>
                    <p className="text-white/75 text-xs sm:text-sm leading-relaxed">24/7 continuous operations monitoring preventing unauthorized physical breaches.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-5 rounded-xl bg-white/5 border border-domenion-gold/25 backdrop-blur-sm hover:border-domenion-gold hover:bg-white/10 transition-all duration-300">
                  <div className="w-11 h-11 rounded bg-domenion-gold/15 border border-domenion-gold/30 text-domenion-gold grid place-items-center flex-shrink-0">
                    <LockKeyhole size={24} />
                  </div>
                  <div>
                    <h4 className="text-white font-heading text-base font-bold mb-1">Compliance Readiness</h4>
                    <p className="text-white/75 text-xs sm:text-sm leading-relaxed">Meeting SOC 2, ISO 27001, FISMA, and NIST physical security standards.</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

