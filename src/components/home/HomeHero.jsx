import { ArrowRight, ShieldCheck } from "lucide-react";
import Button from "../common/Button";
import Reveal from "../common/Reveal";

export default function HomeHero() {
  return (
    <section className="relative w-full py-20 sm:py-28 lg:py-36 bg-domenion-blue overflow-hidden flex items-center min-h-[540px] sm:min-h-[600px] lg:min-h-[680px]">
      {/* Background Video with Transparent Overlay */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/images/company-security.jpg"
          className="w-full h-full object-cover object-center"
          src="/videos/hero-bg.mp4"
        />
        <div className="absolute inset-0  " />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 w-full max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal direction="fade" delay={0.1}>
          <div className="max-w-[760px] lg:max-w-[800px] flex flex-col items-start text-left">
            {/* Badge (~20px gap to Heading) */}
            <div className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-domenion-gold/20 border border-domenion-gold/40 rounded-full text-domenion-gold font-heading text-xs font-extrabold tracking-widest w-fit mb-5 shadow-sm">
              <ShieldCheck size={16} className="text-domenion-gold flex-shrink-0" />
              <span>ENTERPRISE SECURITY SOLUTIONS</span>
            </div>

            {/* Heading (~24px gap to Subtitle) */}
            <h1 className="font-heading text-5xl sm:text-5xl lg:text-[100px] font-extrabold text-white leading-[1.05] sm:leading-[1.08] tracking-tight mb-6">
              Security without{" "}
              <span className="text-domenion-gold">compromise.</span>
            </h1>

            {/* Subtitle (~28px gap to CTA Button) */}
            <p className="text-white/90 text-lg sm:text-xl font-sans leading-relaxed max-w-[800px] mb-7">
              Comprehensive physical, digital and critical infrastructure security
              solutions designed to protect people, property, operations and valuable assets.
            </p>

            {/* CTA Button */}
            <div>
              <Button
                to="/services"
                variant="primary"
                size="lg"
                icon={ArrowRight}
                className="px-7 py-4 min-h-[52px] text-base font-bold shadow-md hover:shadow-lg transition-all"
              >
                Explore Services
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

