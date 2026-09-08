import { Link } from "react-router-dom";
import { ShieldCheck, ChevronRight, LockKeyhole } from "lucide-react";
import Reveal from "../common/Reveal";

export default function ServicesHero() {
  return (
    <section className="relative py-16 sm:py-24 lg:py-28 bg-domenion-blue text-white overflow-hidden border-b border-domenion-gold/20">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-25 scale-105"
        style={{ backgroundImage: `url(/images/security-hero.jpg)` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-domenion-blue via-domenion-blue/95 to-domenion-blue/70" />

      <div className="relative z-10 max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headlines & Story */}
          <div className="lg:col-span-7">
            <div className="flex flex-col">
              {/* Breadcrumb Nav */}
              <Reveal direction="fade">
                <div className="flex items-center gap-2 text-xs font-heading font-bold text-domenion-gold mb-4">
                  <Link to="/" className="hover:underline">Home</Link>
                  <ChevronRight size={13} />
                  <span className="text-white">Services</span>
                </div>
              </Reveal>

              {/* Eyebrow */}
              <Reveal direction="right" delay={0.1}>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-domenion-gold/15 border border-domenion-gold/35 rounded-full text-domenion-gold font-heading text-xs font-extrabold tracking-widest w-fit mb-4">
                  <ShieldCheck size={15} className="text-domenion-gold" />
                  <span>OUR SECURITY SERVICES</span>
                </div>
              </Reveal>

              {/* Headline */}
              <Reveal direction="right" delay={0.2}>
                <h1 className="text-white font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 leading-tight">
                  Protection built <span className="text-domenion-gold">around your needs.</span>
                </h1>
              </Reveal>

              {/* Description */}
              <Reveal direction="right" delay={0.3}>
                <p className="text-white/85 font-sans text-base sm:text-lg leading-relaxed max-w-xl">
                  From professional physical security to specialized enterprise defense,
                  Domenion delivers security solutions designed around the environments
                  and operations we protect.
                </p>
              </Reveal>
            </div>
          </div>

          {/* Right Column: Editorial Visual Panel */}
          <div className="lg:col-span-5">
            <Reveal direction="left" delay={0.2}>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-domenion-gold/30 group">
                <img
                  src="/images/physical-security.jpg"
                  alt="Domenion Security Operations"
                  className="w-full h-80 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.target.src = "/images/company-security.jpg";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-domenion-blue/80 via-transparent to-transparent" />

                {/* Floating Information Block */}
                <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md p-4 rounded-xl border border-domenion-gold/40 shadow-lg flex flex-col text-domenion-blue">
                  <div className="flex items-center gap-1.5 text-domenion-gold font-heading text-[10px] font-extrabold tracking-wider uppercase mb-1">
                    <LockKeyhole size={14} />
                    <span>14 CAPABILITIES</span>
                  </div>
                  <strong className="text-domenion-blue font-heading text-sm font-extrabold">PHYSICAL • CYBER • INFRASTRUCTURE</strong>
                  <span className="text-gray-600 text-xs mt-0.5">Integrated defense capabilities.</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

