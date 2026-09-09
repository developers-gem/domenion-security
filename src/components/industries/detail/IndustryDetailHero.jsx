import { Link } from "react-router-dom";
import { ChevronRight, ArrowRight, ShieldCheck } from "lucide-react";
import Button from "../../common/Button";
import Reveal from "../../common/Reveal";

export default function IndustryDetailHero({ industry }) {
  const heroImg = industry.heroImage || industry.overviewImage || "/images/company-security.jpg";

  return (
    <section className="relative py-16 sm:py-24 lg:py-28 bg-domenion-blue text-white overflow-hidden border-b border-domenion-gold/20 text-center">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-25 scale-105"
        style={{ backgroundImage: `url(${heroImg})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-domenion-blue via-domenion-blue/95 to-domenion-blue/70" />

      <div className="relative z-10 max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto flex flex-col items-center">
          {/* Breadcrumb Nav */}
          <Reveal direction="fade">
            <div className="flex items-center justify-center gap-2 text-xs font-heading font-bold text-domenion-gold mb-4">
              <Link to="/" className="hover:underline">Home</Link>
              <ChevronRight size={13} />
              <Link to="/industries" className="hover:underline">Industries</Link>
              <ChevronRight size={13} />
              <span className="text-white">{industry.badge || "Industry Detail"}</span>
            </div>
          </Reveal>

          {/* Eyebrow */}
          <Reveal direction="up" delay={0.1}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-domenion-gold/15 border border-domenion-gold/35 rounded-full text-domenion-gold font-heading text-xs font-extrabold tracking-widest mb-6">
              <ShieldCheck size={15} className="text-domenion-gold" />
              <span>{industry.badge || "Domenion INDUSTRY PROTECTION"}</span>
            </div>
          </Reveal>

          {/* Headline */}
          <Reveal direction="up" delay={0.2}>
            <h1 className="text-white font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 leading-tight">
              {industry.title}
            </h1>
          </Reveal>

          {/* Description */}
          <Reveal direction="up" delay={0.3}>
            <p className="text-white/85 font-sans text-base sm:text-lg leading-relaxed mb-8 max-w-2xl">
              {industry.shortDescription || industry.overviewDescription}
            </p>
          </Reveal>

          {/* Buttons */}
          <Reveal direction="up" delay={0.4}>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button to="/contact" variant="primary" size="lg" icon={ArrowRight} className="transition-all hover:translate-0.5 active:translate-y-0.5">
                Request a Security Quote
              </Button>
              <Button to="/industries" variant="outline-light" size="lg" className="transition-all hover:translate-0.5 active:translate-y-0.5">
                Explore All Sectors
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

