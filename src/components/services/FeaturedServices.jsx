import { ArrowRight } from "lucide-react";
import Button from "../common/Button";
import Reveal from "../common/Reveal";
import { services } from "../../data/services";

const FEATURED_SLUGS = [
  "physical-security",
  "cyber-security",
  "data-center-security",
  "executive-protection",
];

export default function FeaturedServices() {
  const featuredList = FEATURED_SLUGS.map((slug) =>
    services.find((s) => s.slug === slug)
  ).filter(Boolean);

  return (
    <section className="py-20 sm:py-28 bg-neutral-light text-domenion-blue border-b border-neutral-border">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Reveal direction="up">
            <span className="inline-flex items-center gap-2 text-domenion-gold font-heading text-xs font-extrabold tracking-widest uppercase">FEATURED CAPABILITIES</span>
          </Reveal>

          <Reveal direction="up" delay={0.1}>
            <h2 className="text-domenion-blue font-heading text-3xl sm:text-4xl font-extrabold tracking-tight mt-2 leading-tight">
              Enterprise security solutions, <span className="text-domenion-gold">built for high-risk environments.</span>
            </h2>
          </Reveal>
        </div>

        {/* Alternating Editorial Showcase Blocks */}
        <div className="flex flex-col gap-16">
          {featuredList.map((service, index) => {
            const isEven = index % 2 === 0;
            return (
              <div key={service.slug} className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                {/* Visual Image Column (Alternates) */}
                <div className={`lg:col-span-6 ${isEven ? "lg:order-1" : "lg:order-2"}`}>
                  <Reveal direction={isEven ? "left" : "right"}>
                    <div className="relative rounded-2xl overflow-hidden shadow-lg border border-neutral-border group">
                      <img
                        src={service.heroImage || "/images/physical-security.jpg"}
                        alt={service.title}
                        className="w-full h-80 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          e.target.src = "/images/company-security.jpg";
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-domenion-blue/80 via-transparent to-transparent" />
                      <span className="absolute bottom-4 left-4 font-heading font-extrabold text-domenion-gold text-2xl">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                  </Reveal>
                </div>

                {/* Content Column (Alternates) */}
                <div className={`lg:col-span-6 ${isEven ? "lg:order-2" : "lg:order-1"}`}>
                  <div className="flex flex-col">
                    <Reveal direction={isEven ? "right" : "left"} delay={0.1}>
                      <span className="text-domenion-gold font-heading text-xs font-extrabold tracking-widest uppercase mb-2">{service.badge}</span>
                    </Reveal>

                    <Reveal direction={isEven ? "right" : "left"} delay={0.2}>
                      <h3 className="text-domenion-blue font-heading text-2xl sm:text-3xl font-extrabold tracking-tight mb-4">{service.title}</h3>
                    </Reveal>

                    <Reveal direction={isEven ? "right" : "left"} delay={0.3}>
                      <p className="text-gray-600 font-sans text-base leading-relaxed mb-6">
                        {service.description ||
                          service.shortDescription ||
                          "Enterprise protection capabilities engineered for mission-critical facilities and assets."}
                      </p>
                    </Reveal>

                    <Reveal direction={isEven ? "right" : "left"} delay={0.4}>
                      <div>
                        <Button
                          to={`/services/${service.slug}`}
                          variant="primary"
                          icon={ArrowRight}
                        >
                          Explore {service.badge}
                        </Button>
                      </div>
                    </Reveal>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

