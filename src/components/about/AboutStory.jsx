import { ArrowRight, CheckCircle2 } from "lucide-react";
import Button from "../common/Button";
import Reveal from "../common/Reveal";

export default function AboutStory() {
  return (
    <section className="py-20 sm:py-28 bg-white text-domenion-blue border-b border-neutral-border">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Visual Security Image */}
          <div className="lg:col-span-6">
            <Reveal direction="left">
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-neutral-border group">
                <img
                  src="/images/about-hero.jpg"
                  alt="Dominion Security Professional Guard Operations"
                  className="w-full h-[420px] sm:h-[500px] object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.target.src = "/images/company-security.jpg";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-domenion-blue/80 via-transparent to-transparent" />

                <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md p-4 rounded-xl border border-domenion-gold/40 shadow-lg flex items-center gap-4 text-domenion-blue">
                  <span className="w-10 h-10 rounded-lg bg-domenion-gold text-domenion-blue font-heading font-extrabold text-sm flex items-center justify-center flex-shrink-0">01</span>
                  <div className="flex flex-col">
                    <strong className="text-domenion-blue font-heading text-xs font-extrabold tracking-wider">SECURITY WITHOUT COMPROMISE</strong>
                    <span className="text-gray-600 text-xs mt-0.5">Built Around What Matters</span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Story & Philosophy */}
          <div className="lg:col-span-6">
            <div className="flex flex-col">
              <Reveal direction="up" delay={0.1}>
                <span className="inline-flex items-center gap-2 text-domenion-gold font-heading text-xs font-extrabold tracking-widest uppercase">WHO WE ARE</span>
              </Reveal>

              <Reveal direction="up" delay={0.2}>
                <h2 className="text-domenion-blue font-heading text-3xl sm:text-4xl font-extrabold tracking-tight mt-2 mb-4 leading-tight">
                  Experience, discipline <span className="text-domenion-gold">& operational preparedness.</span>
                </h2>
              </Reveal>

              <Reveal direction="up" delay={0.3}>
                <p className="text-gray-700 font-sans text-base sm:text-lg leading-relaxed mb-3 font-medium">
                  Dominion Security delivers professional security solutions built
                  around the real-world requirements of the commercial enterprises,
                  facilities, and communities we protect.
                </p>
                <p className="text-gray-600 font-sans text-base leading-relaxed mb-6">
                  From professional armed and unarmed security guards to specialized
                  data center protection, cybersecurity oversight, and mobile patrols,
                  our approach combines experienced security personnel, disciplined post
                  orders, and modern surveillance technology.
                </p>
              </Reveal>

              {/* Credibility Checklist */}
              <div className="flex flex-col gap-3 mb-8">
                <Reveal direction="up" delay={0.4}>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-neutral-light border border-neutral-border">
                    <CheckCircle2 size={18} className="text-domenion-gold flex-shrink-0" />
                    <span className="text-domenion-blue font-heading text-sm font-bold">Professional, state-licensed security officers</span>
                  </div>
                </Reveal>

                <Reveal direction="up" delay={0.5}>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-neutral-light border border-neutral-border">
                    <CheckCircle2 size={18} className="text-domenion-gold flex-shrink-0" />
                    <span className="text-domenion-blue font-heading text-sm font-bold">Integrated physical guarding, access control & monitoring</span>
                  </div>
                </Reveal>

                <Reveal direction="up" delay={0.6}>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-neutral-light border border-neutral-border">
                    <CheckCircle2 size={18} className="text-domenion-gold flex-shrink-0" />
                    <span className="text-domenion-blue font-heading text-sm font-bold">24/7 rapid emergency dispatch & operational readiness</span>
                  </div>
                </Reveal>
              </div>

              <Reveal direction="up" delay={0.7}>
                <div>
                  <Button to="/contact" variant="primary" icon={ArrowRight}>
                    Talk To Our Security Team
                  </Button>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

