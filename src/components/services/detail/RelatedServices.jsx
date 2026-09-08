import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Reveal from "../../common/Reveal";
import { services } from "../../../data/services";

export default function RelatedServices({ currentSlug }) {
  // Find 3 other related services excluding currentSlug
  const otherServices = services.filter((s) => s.slug !== currentSlug);
  const relatedList = otherServices.slice(0, 3);

  return (
    <section className="py-20 sm:py-28 bg-white text-domenion-blue border-b border-neutral-border">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12">
          <div className="lg:col-span-7">
            <Reveal direction="up">
              <span className="inline-flex items-center gap-2 text-domenion-gold font-heading text-xs font-extrabold tracking-widest uppercase">RELATED CAPABILITIES</span>
            </Reveal>

            <Reveal direction="up" delay={0.1}>
              <h2 className="text-domenion-blue font-heading text-3xl sm:text-4xl font-extrabold tracking-tight mt-2">
                Explore complementary <span className="text-domenion-gold">security services.</span>
              </h2>
            </Reveal>
          </div>

          <div className="lg:col-span-5 flex justify-start lg:justify-end">
            <Reveal direction="up" delay={0.2}>
              <Link to="/services" className="inline-flex items-center gap-2 text-domenion-gold font-heading text-sm font-bold hover:underline">
                <span>View Full Service Portfolio</span>
                <ArrowRight size={16} />
              </Link>
            </Reveal>
          </div>
        </div>

        {/* 3 Related Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedList.map((service, idx) => (
            <div key={service.slug}>
              <Reveal direction="up" delay={0.1 * idx}>
                <div className="block bg-neutral-light border border-neutral-border hover:border-domenion-gold/50 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group flex flex-col h-full">
                  <Link to={`/services/${service.slug}`} className="relative h-48 overflow-hidden block">
                    <img
                      src={service.heroImage || service.overviewImage || "/images/physical-security.jpg"}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.target.src = "/images/company-security.jpg";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-domenion-blue/80 via-transparent to-transparent" />
                    <span className="absolute bottom-3 left-4 font-heading font-extrabold text-domenion-gold text-sm">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                  </Link>

                  <div className="p-6 flex flex-col flex-1">
                    <span className="text-[10px] font-extrabold text-domenion-gold tracking-widest uppercase mb-1">{service.badge || "SECURITY"}</span>
                    <h3 className="text-domenion-blue font-heading text-lg font-bold group-hover:text-domenion-gold transition-colors mb-2">
                      <Link to={`/services/${service.slug}`} className="text-decoration-none text-domenion-blue group-hover:text-domenion-gold">
                        {service.title}
                      </Link>
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-4 flex-1">
                      {service.shortDescription || "Enterprise security capability."}
                    </p>

                    <Link to={`/services/${service.slug}`} className="inline-flex items-center gap-2 text-domenion-gold font-heading text-xs font-bold group-hover:translate-x-1 transition-transform text-decoration-none">
                      <span>Explore Capability</span>
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

