import { ShieldCheck, ArrowDown } from "lucide-react";
import Reveal from "../../common/Reveal";
import Button from "../../common/Button";

export default function IndustriesHero() {
  const handleScrollToExplorer = () => {
    const el = document.getElementById("industry-explorer");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative py-16 sm:py-24 lg:py-28 bg-domenion-blue text-white overflow-hidden border-b border-domenion-gold/20 text-center">
      {/* Full-width Immersive Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-25 scale-105"
        style={{ backgroundImage: `url(/images/industries/hero-main.jpg)` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-domenion-blue via-domenion-blue/95 to-domenion-blue/70" />

      <div className="relative z-10 max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto flex flex-col items-center">
          {/* Eyebrow */}
          <Reveal direction="fade">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-domenion-gold/15 border border-domenion-gold/35 rounded-full text-domenion-gold font-heading text-xs font-extrabold tracking-widest mb-6">
              <ShieldCheck size={16} className="text-domenion-gold" />
              <span>INDUSTRIES WE PROTECT</span>
            </div>
          </Reveal>

          {/* Headline */}
          <Reveal direction="up" delay={0.1}>
            <h1 className="text-white font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 leading-tight">
              Security built for <span className="text-domenion-gold">the environments that matter.</span>
            </h1>
          </Reveal>

          {/* Supporting Text */}
          <Reveal direction="up" delay={0.2}>
            <p className="text-white/85 font-sans text-base sm:text-lg leading-relaxed mb-8 max-w-2xl">
              Security requirements change with every environment. Our approach adapts to
              the people, property, critical infrastructure, and operations that need protection.
            </p>
          </Reveal>

          {/* Explore Button */}
          <Reveal direction="up" delay={0.3}>
            <div>
              <Button
                variant="primary"
                size="lg"
                onClick={handleScrollToExplorer}
                icon={ArrowDown}
              >
                Explore Sectors & Environments
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

