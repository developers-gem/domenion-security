import { ArrowRight } from "lucide-react";
import Button from "../common/Button";
import Reveal from "../common/Reveal";

// REPLACEMENT OFFICER IMAGE ASSET: Component prepared for new corporate security officer image asset
const CORPORATE_OFFICER_IMAGE_PATH = "/images/about-security.jpg";

export default function AboutPreview() {
  return (
    <section className="py-20 sm:py-28 bg-white text-domenion-blue">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Visual Image with Floating Gold Badge */}
          <div className="lg:col-span-6">
            <Reveal direction="left">
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-neutral-border group">
                <img
                  src={CORPORATE_OFFICER_IMAGE_PATH}
                  alt="Domenion Security Corporate Operations"
                  className="w-full h-[450px] sm:h-[520px] object-cover group-hover:scale-105 transition-transform duration-700"
                  onError={(e) => {
                    e.target.src = "/images/about-security.jpg";
                  }}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-domenion-blue/60 via-transparent to-transparent" />

                <div className="absolute bottom-6 left-6 right-6 sm:right-auto bg-white/95 backdrop-blur-md p-4 rounded-xl border border-domenion-gold/40 shadow-lg flex items-center gap-4">
                  <span className="w-10 h-10 rounded-lg bg-domenion-gold text-domenion-blue font-heading font-extrabold text-sm flex items-center justify-center flex-shrink-0">01</span>
                  <div className="flex flex-col">
                    <strong className="text-domenion-blue font-heading text-xs font-extrabold tracking-wider">SECURITY WITHOUT COMPROMISE</strong>
                    <span className="text-gray-600 text-xs mt-0.5">Built Around What Matters</span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Content & Credibility Points */}
          <div className="lg:col-span-6">
            <div className="flex flex-col">
              <Reveal direction="up" delay={0.1}>
                <span className="inline-flex items-center gap-2 text-domenion-gold font-heading text-xs font-extrabold tracking-widest uppercase">ABOUT DOMENION</span>
              </Reveal>

              <Reveal direction="up" delay={0.2}>
                <h2 className="text-domenion-blue font-heading text-3xl sm:text-4xl font-extrabold tracking-tight mt-2 mb-4 leading-tight">
                  Protection built <span className="text-domenion-gold">around what matters.</span>
                </h2>
              </Reveal>

              <Reveal direction="up" delay={0.3}>
                <p className="text-gray-600 font-sans text-base sm:text-lg leading-relaxed mb-8">
                  Domenion Security provides comprehensive physical, digital and
                  critical infrastructure security solutions designed to protect
                  people, property, facilities and information in an increasingly
                  complex world.
                </p>
              </Reveal>

              {/* 3 Credibility Points */}
              <div className="flex flex-col gap-4">
                <Reveal direction="up" delay={0.4}>
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-neutral-light border border-neutral-border hover:border-domenion-gold/50 transition-colors">
                    <div className="w-8 h-8 rounded-full bg-domenion-gold/20 text-domenion-gold font-heading font-extrabold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">01</div>
                    <div className="flex flex-col">
                      <h3 className="text-domenion-blue font-heading text-base font-bold">Experienced Protection</h3>
                      <p className="text-gray-600 text-sm mt-0.5">
                        Professional security solutions built around real-world
                        operational requirements.
                      </p>
                    </div>
                  </div>
                </Reveal>

                <Reveal direction="up" delay={0.5}>
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-neutral-light border border-neutral-border hover:border-domenion-gold/50 transition-colors">
                    <div className="w-8 h-8 rounded-full bg-domenion-gold/20 text-domenion-gold font-heading font-extrabold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">02</div>
                    <div className="flex flex-col">
                      <h3 className="text-domenion-blue font-heading text-base font-bold">Integrated Capabilities</h3>
                      <p className="text-gray-600 text-sm mt-0.5">
                        Physical security, mobile patrol, and cybersecurity
                        working together seamlessly.
                      </p>
                    </div>
                  </div>
                </Reveal>

                <Reveal direction="up" delay={0.6}>
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-neutral-light border border-neutral-border hover:border-domenion-gold/50 transition-colors">
                    <div className="w-8 h-8 rounded-full bg-domenion-gold/20 text-domenion-gold font-heading font-extrabold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">03</div>
                    <div className="flex flex-col">
                      <h3 className="text-domenion-blue font-heading text-base font-bold">Security-Minded Approach</h3>
                      <p className="text-gray-600 text-sm mt-0.5">
                        Proactive strategies focused on prevention, preparedness, and
                        rapid response.
                      </p>
                    </div>
                  </div>
                </Reveal>
              </div>

              <Reveal direction="up" delay={0.7}>
                <div className="mt-8">
                  <Button to="/about" variant="primary" icon={ArrowRight}>
                    Learn More About Domenion
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

