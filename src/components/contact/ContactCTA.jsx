import { ArrowRight, Phone, ShieldCheck } from "lucide-react";
import Button from "../common/Button";
import Reveal from "../common/Reveal";

export default function ContactCTA() {
  const handleScrollToForm = () => {
    const el = document.getElementById("contact-form-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="py-20 sm:py-28 bg-white text-domenion-blue">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-domenion-blue to-domenion-blue/90 text-white rounded-2xl p-8 sm:p-12 shadow-2xl border border-domenion-gold/30 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left Column: Copy */}
            <div className="lg:col-span-7">
              <div className="flex flex-col">
                <Reveal direction="fade">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-domenion-gold/20 border border-domenion-gold/40 rounded-full text-domenion-gold font-heading text-xs font-extrabold tracking-widest w-fit mb-4">
                    <ShieldCheck size={16} className="text-domenion-gold" />
                    <span>START A CONVERSATION</span>
                  </div>
                </Reveal>

                <Reveal direction="up" delay={0.1}>
                  <h2 className="text-white font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 leading-tight capitalize">
                    Let's build the right{" "}
                    <span className="text-domenion-gold">
                      security approach together.
                    </span>
                  </h2>
                </Reveal>

                <Reveal direction="up" delay={0.2}>
                  <p className="text-white/85 text-base sm:text-lg leading-relaxed mb-8 max-w-lg">
                    Tell us what matters most and take the first step toward a
                    more focused, dependable security strategy for your site.
                  </p>
                </Reveal>

                <Reveal direction="up" delay={0.3}>
                  <div className="flex flex-wrap items-center gap-4">
                    <Button
                      variant="primary"
                      size="lg"
                      onClick={handleScrollToForm}
                      icon={ArrowRight}
                      className="transition-all hover:translate-0.5 active:translate-y-0.5 "
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
                <div className="relative rounded-xl overflow-hidden shadow-xl border border-domenion-gold/30 group">
                  <img
                    src="/images/company-security.jpg"
                    alt="Domenion Security Officer"
                    className="w-full h-72 sm:h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.target.src = "/images/company-security.jpg";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-domenion-blue/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md px-4 py-2 rounded-lg border border-domenion-gold/40 text-domenion-blue flex flex-col">
                    <span className="text-domenion-gold font-heading text-[10px] font-extrabold tracking-widest uppercase">
                      24/7 DISPATCH DESK
                    </span>
                    <strong className="text-xs font-bold font-heading">
                      (602) 438-4445
                    </strong>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
