import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Reveal from "../../common/Reveal";
import { services } from "../../../data/services";

export default function IndustryServiceLinks({ industry }) {
  // Select 4 services to connect to this industry
  const recommendedServices = services.slice(0, 4);

  return (
    <section className="py-20 sm:py-28 bg-white text-domenion-blue border-b border-neutral-border">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12">
          <div className="lg:col-span-7">
            <Reveal direction="up">
              <span className="inline-flex items-center gap-2 text-domenion-gold font-heading text-xs font-extrabold tracking-widest uppercase">RELEVANT DOMINION SERVICES</span>
            </Reveal>

            <Reveal direction="up" delay={0.1}>
              <h2 className="text-domenion-blue font-heading text-3xl sm:text-4xl font-extrabold tracking-tight mt-2 leading-tight">
                Recommended protection capabilities <span className="text-domenion-gold">for {industry.badge || "this sector"}.</span>
              </h2>
            </Reveal>
          </div>

          <div className="lg:col-span-5 flex justify-start lg:justify-end">
            <Reveal direction="up" delay={0.2}>
              <Link to="/services" className="inline-flex items-center gap-2 text-domenion-gold font-heading text-sm font-bold hover:underline">
                <span>Explore All Services</span>
                <ArrowRight size={16} />
              </Link>
            </Reveal>
          </div>
        </div>

        {/* Large Horizontal Service Rows Layout */}
        <div className="flex flex-col gap-4">
          {recommendedServices.map((svc, idx) => (
            <Reveal key={svc.slug} direction="up" delay={0.06 * idx}>
              <Link
                to={`/services/${svc.slug}`}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-xl bg-neutral-light border border-neutral-border hover:border-domenion-gold/50 shadow-sm hover:shadow-md transition-all duration-200 group text-decoration-none gap-4"
              >
                <div className="flex items-center gap-4">
                  <span className="text-domenion-gold font-heading text-sm font-extrabold">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <div className="flex flex-col">
                    <h3 className="text-domenion-blue font-heading text-base font-bold group-hover:text-domenion-gold transition-colors">{svc.title}</h3>
                    <p className="text-gray-500 text-xs sm:text-sm mt-0.5">{svc.shortDescription || "Enterprise protection capability."}</p>
                  </div>
                </div>

                <div className="inline-flex items-center gap-2 text-domenion-gold font-heading text-xs font-bold group-hover:translate-x-1 transition-transform flex-shrink-0">
                  <span>Explore Capability</span>
                  <ArrowRight size={16} />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

