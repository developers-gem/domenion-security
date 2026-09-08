import { ShieldCheck, ArrowRight, Phone } from "lucide-react";
import Button from "../common/Button";
import Reveal from "../common/Reveal";

export default function ContactHero() {
  const handleScrollToForm = () => {
    const el = document.getElementById("contact-form-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative py-16 sm:py-24 lg:py-28 bg-domenion-blue text-white overflow-hidden border-b border-domenion-gold/20">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-25 scale-105"
        style={{ backgroundImage: `url(/images/contact/bg.jpg)` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-domenion-blue via-domenion-blue/95 to-domenion-blue/70" />

      <div className="relative z-10 max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headlines */}
          <div className="lg:col-span-7">
            <div className="flex flex-col">
              <Reveal direction="fade">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-domenion-gold/15 border border-domenion-gold/35 rounded-full text-domenion-gold font-heading text-xs font-extrabold tracking-widest w-fit mb-6">
                  <ShieldCheck size={15} className="text-domenion-gold" />
                  <span>CONTACT Domenion SECURITY</span>
                </div>
              </Reveal>

              <Reveal direction="right" delay={0.1}>
                <h1 className="text-white font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 leading-tight">
                  Let's talk about <span className="text-domenion-gold">your security.</span>
                </h1>
              </Reveal>

              <Reveal direction="right" delay={0.2}>
                <p className="text-white/85 font-sans text-base sm:text-lg leading-relaxed mb-8 max-w-xl">
                  Tell us what you need protected, where you operate, and what matters most. Our team can help you explore the right security approach.
                </p>
              </Reveal>

              <Reveal direction="right" delay={0.3}>
                <div className="flex flex-wrap items-center gap-4">
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={handleScrollToForm}
                    icon={ArrowRight}
                  >
                    Request a Security Quote
                  </Button>
                  <Button
                    href="tel:+16024384445"
                    variant="gold-outline"
                    size="lg"
                    icon={Phone}
                    iconPosition="left"
                  >
                    Call Domenion
                  </Button>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Right Column: Visual Panel */}
          <div className="lg:col-span-5">
            <Reveal direction="left" delay={0.2}>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-domenion-gold/30 group">
                <img
                  src="/images/guard-10.jpg"
                  alt="Domenion Security Headquarters Operations"
                  className="w-full h-80 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.target.src = "/images/company-security.jpg";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-domenion-blue/80 via-transparent to-transparent" />

                {/* Floating Information Block */}
                <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md p-4 rounded-xl border border-domenion-gold/40 shadow-lg flex flex-col text-domenion-blue">
                  <span className="text-domenion-gold font-heading text-[10px] font-extrabold tracking-widest uppercase mb-1">24/7 CONSULTATION & DISPATCH</span>
                  <strong className="text-sm font-bold font-heading text-domenion-blue">(602) 438-4445</strong>
                  <span className="text-gray-600 text-xs mt-0.5">Direct line to operational dispatch</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

