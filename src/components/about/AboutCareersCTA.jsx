import { ArrowRight, UserCheck } from "lucide-react";
import Button from "../common/Button";
import Reveal from "../common/Reveal";

export default function AboutCareersCTA() {
  return (
    <section className="relative py-24 sm:py-32 bg-domenion-blue text-white overflow-hidden border-b border-domenion-gold/20">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-25 scale-105"
        style={{ backgroundImage: `url(/images/careers/hero.jpg)` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-domenion-blue via-domenion-blue/95 to-domenion-blue/70" />

      <div className="relative z-10 max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl flex flex-col">
          <Reveal direction="fade">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-domenion-gold/15 border border-domenion-gold/35 rounded-full text-domenion-gold font-heading text-xs font-extrabold tracking-widest w-fit mb-6">
              <UserCheck size={16} className="text-domenion-gold" />
              <span>JOIN THE DOMENION SECURITY TEAM</span>
            </div>
          </Reveal>

          <Reveal direction="up" delay={0.1}>
            <h2 className="text-white font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 leading-tight">
              Be part of a team <span className="text-domenion-gold">that protects what matters.</span>
            </h2>
          </Reveal>

          <Reveal direction="up" delay={0.2}>
            <p className="text-white/85 font-sans text-base sm:text-lg leading-relaxed mb-8">
              Explore career opportunities with Dominion Security and build a professional
              future grounded in responsibility, operational excellence, continuous
              training, and purpose.
            </p>
          </Reveal>

          <Reveal direction="up" delay={0.3}>
            <div>
              <Button to="/careers" variant="primary" size="lg" icon={ArrowRight}>
                View Open Positions
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

