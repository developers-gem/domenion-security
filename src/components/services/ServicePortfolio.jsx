import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Reveal from "../common/Reveal";
import { services } from "../../data/services";

export default function ServicePortfolio() {
  return (
    <section className="py-20 sm:py-28 bg-white text-domenion-blue border-b border-neutral-border" id="all-services">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12">
          <div className="lg:col-span-7">
            <Reveal direction="up">
              <span className="inline-flex items-center gap-2 text-domenion-gold font-heading text-xs font-extrabold tracking-widest uppercase">COMPLETE SECURITY PORTFOLIO</span>
            </Reveal>

            <Reveal direction="up" delay={0.1}>
              <h2 className="text-domenion-blue font-heading text-3xl sm:text-4xl font-extrabold tracking-tight mt-2">
                One security partner. <span className="text-domenion-gold">Comprehensive protection.</span>
              </h2>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal direction="up" delay={0.2}>
              <p className="text-gray-600 font-sans text-base sm:text-lg leading-relaxed">
                Explore Domenion Security's full portfolio of 14 core protection capabilities.
                Each service is tailored to your facility's operational risks and regulatory standards.
              </p>
            </Reveal>
          </div>
        </div>

        {/* 2-Column Clean Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {services.map((service, index) => (
            <div key={service.slug}>
              <Reveal direction="up" delay={0.03 * index}>
                <Link
                  to={`/services/${service.slug}`}
                  className="block bg-neutral-light border border-neutral-border hover:border-domenion-gold/50 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 group text-decoration-none flex items-center justify-between gap-6 h-full"
                >
                  <span className="text-domenion-gold font-heading text-lg font-extrabold flex-shrink-0">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div className="flex flex-col flex-1">
                    <h3 className="text-domenion-blue font-heading text-lg font-bold group-hover:text-domenion-gold transition-colors">{service.title}</h3>
                    <p className="text-gray-500 text-xs sm:text-sm mt-1 leading-relaxed line-clamp-2">
                      {service.shortDescription || "Enterprise protection capability"}
                    </p>
                  </div>

                  <div className="w-9 h-9 rounded-full bg-white border border-neutral-border text-domenion-blue grid place-items-center group-hover:bg-domenion-gold group-hover:text-domenion-blue group-hover:border-domenion-gold transition-colors flex-shrink-0">
                    <ArrowRight size={18} />
                  </div>
                </Link>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

