import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Reveal from "../../common/Reveal";
import { industries } from "../../../data/industries";

export default function RelatedIndustries({ currentSlug }) {
  const otherIndustries = industries.filter((i) => i.slug !== currentSlug);
  const relatedList = otherIndustries.slice(0, 3);

  return (
    <section className="py-20 sm:py-28 bg-white text-domenion-blue border-b border-neutral-border">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12">
          <div className="lg:col-span-7">
            <Reveal direction="up">
              <span className="inline-flex items-center gap-2 text-domenion-gold font-heading text-xs font-extrabold tracking-widest uppercase">OTHER PROTECTED SECTORS</span>
            </Reveal>

            <Reveal direction="up" delay={0.1}>
              <h2 className="text-domenion-blue font-heading text-3xl sm:text-4xl font-extrabold tracking-tight mt-2 leading-tight">
                Explore protection for <span className="text-domenion-gold">other environments.</span>
              </h2>
            </Reveal>
          </div>

          <div className="lg:col-span-5 flex justify-start lg:justify-end">
            <Reveal direction="up" delay={0.2}>
              <Link to="/industries" className="inline-flex items-center gap-2 text-domenion-gold font-heading text-sm font-bold hover:underline">
                <span>View All Industries</span>
                <ArrowRight size={16} />
              </Link>
            </Reveal>
          </div>
        </div>

        {/* 3 Related Industry Image Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedList.map((item, idx) => (
            <div key={item.slug}>
              <Reveal direction="up" delay={0.1 * idx}>
                <Link
                  to={`/industries/${item.slug}`}
                  className="block relative rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group h-72 border border-neutral-border text-decoration-none"
                >
                  <img
                    src={item.heroImage || item.overviewImage || "/images/company-security.jpg"}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.target.src = "/images/company-security.jpg";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-domenion-blue via-domenion-blue/60 to-transparent" />

                  <div className="absolute inset-0 p-6 flex flex-col justify-between text-white z-10">
                    <span className="text-domenion-gold font-heading text-sm font-extrabold">
                      {String(idx + 1).padStart(2, "0")}
                    </span>

                    <div className="flex flex-col">
                      <h3 className="text-white font-heading text-xl font-bold group-hover:text-domenion-gold transition-colors mb-1">{item.title}</h3>
                      <p className="text-white/80 text-xs leading-relaxed line-clamp-2 mb-3">
                        {item.shortDescription || "Environmental security capability."}
                      </p>

                      <div className="inline-flex items-center gap-2 text-domenion-gold font-heading text-xs font-bold group-hover:translate-x-1 transition-transform">
                        <span>Explore Sector</span>
                        <ArrowRight size={14} />
                      </div>
                    </div>
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

