import { Link } from "react-router-dom";
import { ArrowRight, Eye, ShieldCheck, Cpu, Radar } from "lucide-react";
import Reveal from "../../common/Reveal";

export default function CyberIntelligenceHighlight() {
  return (
    <section className="py-20 sm:py-28 bg-white text-domenion-blue">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-domenion-blue text-white rounded-2xl p-8 sm:p-12 shadow-2xl border border-domenion-gold/30">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <div className="flex flex-col">
                <Reveal direction="fade">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-domenion-gold/15 border border-domenion-gold/35 rounded-full text-domenion-gold font-heading text-xs font-extrabold tracking-widest w-fit mb-4">
                    <Radar size={16} className="text-domenion-gold" />
                    <span>HIGHLIGHTED CYBER CAPABILITY</span>
                  </div>
                </Reveal>

                <Reveal direction="up" delay={0.1}>
                  <h3 className="text-white font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight mb-4">
                    INTELLIGENCE GATHERING <span className="text-domenion-gold">SECURITY</span>
                  </h3>
                </Reveal>

                <Reveal direction="up" delay={0.2}>
                  <p className="text-white/85 font-sans text-base leading-relaxed mb-6">
                    Positioned directly within our Cyber Security framework, Intelligence Gathering Security provides proactive open-source intelligence (OSINT), threat reconnaissance, digital asset surveillance, and corporate counter-surveillance.
                  </p>
                </Reveal>

                <Reveal direction="up" delay={0.3}>
                  <div className="flex flex-col gap-2.5 mb-6">
                    <div className="flex items-center gap-2.5 text-white/90 text-sm font-heading font-bold">
                      <ShieldCheck size={18} className="text-domenion-gold" />
                      <span>Proactive OSINT Reconnaissance</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-white/90 text-sm font-heading font-bold">
                      <Cpu size={18} className="text-domenion-gold" />
                      <span>Cyber Threat Intelligence Integration</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-white/90 text-sm font-heading font-bold">
                      <Eye size={18} className="text-domenion-gold" />
                      <span>Corporate Counter-Surveillance</span>
                    </div>
                  </div>
                </Reveal>

                <Reveal direction="up" delay={0.4}>
                  <div>
                    <Link
                      to="/services/intelligence-gathering-security"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-domenion-gold text-domenion-blue rounded-lg font-heading text-sm font-bold hover:bg-white transition-colors text-decoration-none"
                    >
                      <span>Explore Intelligence Gathering Detail</span>
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </Reveal>
              </div>
            </div>

            <div className="lg:col-span-5">
              <Reveal direction="left" delay={0.2}>
                <div className="bg-white/5 border border-domenion-gold/25 rounded-xl p-8 backdrop-blur-sm text-center flex flex-col items-center justify-center">
                  <div className="w-16 h-16 rounded-2xl bg-domenion-gold/15 border border-domenion-gold/30 text-domenion-gold grid place-items-center mb-4">
                    <Radar size={32} />
                  </div>
                  <h4 className="text-white font-heading text-xl font-bold mb-2">Strategic Cyber Intelligence</h4>
                  <p className="text-white/75 text-sm">Threat detection beyond perimeter defenses.</p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

