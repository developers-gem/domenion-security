import { ArrowRight, UserCheck } from "lucide-react";
import Button from "../common/Button";
import Reveal from "../common/Reveal";

export default function CareersBanner() {
  return (
    <section className="relative py-20 sm:py-28 bg-domenion-blue text-white overflow-hidden border-b border-domenion-gold/20">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-25 scale-105"
        style={{ backgroundImage: `url(/images/careers/hero.jpg)` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-domenion-blue via-domenion-blue/95 to-domenion-blue/70" />

      <div className="relative z-10 max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <Reveal direction="fade">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-domenion-gold/15 border border-domenion-gold/35 rounded-full text-domenion-gold font-heading text-xs font-extrabold tracking-widest mb-4">
              <UserCheck size={16} className="text-domenion-gold" />
              <span>BUILD YOUR CAREER WITH DOMENION</span>
            </div>
          </Reveal>

          <Reveal direction="up" delay={0.1}>
            <h2 className="text-white font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 leading-tight">
              Build a career that <span className="text-domenion-gold">protects others.</span>
            </h2>
          </Reveal>

          <Reveal direction="up" delay={0.2}>
            <p className="text-white/85 text-base sm:text-lg leading-relaxed mb-8 max-w-xl">
              Join a professional security organization where discipline, continuous
              training, operational excellence, and purpose matter every single day.
            </p>
          </Reveal>

          <Reveal direction="up" delay={0.3}>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <Button to="/careers" variant="primary" size="lg" icon={ArrowRight}>
                View Open Positions
              </Button>
              <div className="flex flex-wrap items-center gap-4 text-xs font-heading font-bold text-domenion-gold">
                <span>✔ Competitive Pay</span>
                <span>✔ Advanced Training</span>
                <span>✔ Career Advancement</span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

