import { ShieldCheck, ArrowDown } from "lucide-react";
import Button from "../common/Button";
import Reveal from "../common/Reveal";

export default function CareersHero() {
  const handleScrollToJobs = () => {
    const el = document.getElementById("open-positions");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleScrollToWhy = () => {
    const el = document.getElementById("why-dominion");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative py-16 sm:py-24 lg:py-28 bg-domenion-blue text-white overflow-hidden border-b border-domenion-gold/20">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-25 scale-105"
        style={{ backgroundImage: `url(/images/careers/hero.jpg)` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-domenion-blue via-domenion-blue/95 to-domenion-blue/70" />

      <div className="relative z-10 max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Story & Headlines */}
          <div className="lg:col-span-7">
            <div className="flex flex-col">
              {/* Eyebrow */}
              <Reveal direction="fade">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-domenion-gold/15 border border-domenion-gold/35 rounded-full text-domenion-gold font-heading text-xs font-extrabold tracking-widest w-fit mb-6">
                  <ShieldCheck size={15} className="text-domenion-gold" />
                  <span>CAREERS AT DOMINION SECURITY</span>
                </div>
              </Reveal>

              {/* Headline */}
              <Reveal direction="right" delay={0.1}>
                <h1 className="text-white font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 leading-tight">
                  Build a career <span className="text-domenion-gold">with purpose.</span>
                </h1>
              </Reveal>

              {/* Description */}
              <Reveal direction="right" delay={0.2}>
                <p className="text-white/85 font-sans text-base sm:text-lg leading-relaxed mb-8 max-w-xl">
                  Join a team committed to professional security, responsibility, and protecting the people, property, and environments that matter.
                </p>
              </Reveal>

              {/* Actions */}
              <Reveal direction="right" delay={0.3}>
                <div className="flex flex-wrap items-center gap-4">
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={handleScrollToJobs}
                    icon={ArrowDown}
                  >
                    View Open Positions
                  </Button>
                  <Button
                    variant="outline-light"
                    size="lg"
                    onClick={handleScrollToWhy}
                  >
                    Why Dominion?
                  </Button>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Right Column: Human & Team Visual Panel */}
          <div className="lg:col-span-5">
            <Reveal direction="left" delay={0.2}>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-domenion-gold/30 group">
                <img
                  src="/images/guard-5.jpg"
                  alt="Dominion Security Professional Guards Team"
                  className="w-full h-80 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.target.src = "/images/company-security.jpg";
                  }}
                />  
                <div className="absolute inset-0 bg-gradient-to-t from-domenion-blue/80 via-transparent to-transparent" />

                {/* Floating Information Block */}
                <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md p-4 rounded-xl border border-domenion-gold/40 shadow-lg flex flex-col text-domenion-blue">
                  <span className="text-domenion-gold font-heading text-[10px] font-extrabold tracking-widest uppercase mb-1">WHO BUILDS DOMINION</span>
                  <strong className="text-xs font-extrabold font-heading text-domenion-blue uppercase">PEOPLE • DISCIPLINE • TRUST</strong>
                  <span className="text-gray-600 text-xs mt-0.5">Professional security personnel nationwide.</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

