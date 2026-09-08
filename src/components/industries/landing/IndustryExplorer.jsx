import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "../../common/Reveal";
import { industries } from "../../../data/industries";

export default function IndustryExplorer() {
  const [activeSlug, setActiveSlug] = useState(
    industries[0]?.slug || "government",
  );

  const activeIndustry =
    industries.find((i) => i.slug === activeSlug) || industries[0];

  return (
    <section
      className="py-20 sm:py-28 bg-neutral-light text-domenion-blue border-b border-neutral-border"
      id="industry-explorer"
    >
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12">
          <div className="lg:col-span-7">
            <Reveal direction="up">
              <span className="inline-flex items-center gap-2 text-domenion-gold font-heading text-xs font-extrabold tracking-widest uppercase">
                INTERACTIVE SECTOR EXPLORER
              </span>
            </Reveal>

            <Reveal direction="up" delay={0.1}>
              <h2 className="text-domenion-blue font-heading text-3xl sm:text-4xl font-extrabold tracking-tight mt-2 leading-tight capitalize">
                Explore protection tailored{" "}
                <span className="text-domenion-gold">
                  for your environment.
                </span>
              </h2>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal direction="up" delay={0.2}>
              <p className="text-gray-600 font-sans text-base sm:text-lg leading-relaxed">
                Hover on desktop or tap on mobile to inspect Domenion Security's
                specialized capabilities across sectors.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Explorer Split Panel Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Vertical Industry Nav List */}
          <div className="lg:col-span-5">
            <div className="flex flex-col gap-2 max-h-[460px] overflow-y-auto pr-2 custom-scrollbar">
              {industries.map((ind, index) => {
                const isActive = ind.slug === activeSlug;
                return (
                  <button
                    key={ind.slug}
                    type="button"
                    className={`w-full flex items-center justify-between p-4 rounded-xl text-left border transition-all duration-200 cursor-pointer ${
                      isActive
                        ? "bg-domenion-blue text-white border-domenion-gold/40 shadow-md"
                        : "bg-white text-domenion-blue border-neutral-border hover:border-domenion-gold/40"
                    }`}
                    onMouseEnter={() => setActiveSlug(ind.slug)}
                    onClick={() => setActiveSlug(ind.slug)}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`font-heading text-sm font-extrabold ${isActive ? "text-domenion-gold" : "text-domenion-gold"}`}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="font-heading text-base font-bold">
                        {ind.title}
                      </span>
                    </div>

                    <ChevronRight
                      size={16}
                      className={`transition-transform ${isActive ? "text-domenion-gold translate-x-1" : "text-gray-400"}`}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Dynamic Crossfading Visual Image Frame */}
          <div className="lg:col-span-7">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-neutral-border bg-domenion-blue h-[460px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndustry.slug}
                  className="relative w-full h-full"
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <img
                    src={
                      activeIndustry.heroImage ||
                      activeIndustry.overviewImage ||
                      "/images/company-security.jpg"
                    }
                    alt={activeIndustry.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = "/images/company-security.jpg";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-domenion-blue via-domenion-blue/60 to-transparent" />

                  {/* Active Industry Statement Overlay */}
                  <div className="absolute bottom-6 left-6 right-6 text-white flex flex-col items-start">
                    <span className="inline-flex items-center gap-2 px-3 py-1 bg-domenion-gold/20 border border-domenion-gold/40 rounded-full text-domenion-gold font-heading text-[10px] font-extrabold tracking-widest uppercase mb-2">
                      {activeIndustry.badge || "SECURITY SECTOR"}
                    </span>
                    <h3 className="font-heading text-2xl sm:text-3xl font-extrabold mb-2 text-white">
                      {activeIndustry.title}
                    </h3>
                    <p className="text-white/85 font-sans text-sm leading-relaxed mb-4 line-clamp-2 max-w-xl">
                      {activeIndustry.shortDescription ||
                        "Tailored security post orders and operational procedures for this specific environment."}
                    </p>

                    <Link
                      to={`/industries/${activeIndustry.slug}`}
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-domenion-gold text-domenion-blue rounded-lg font-heading text-xs font-bold hover:bg-white transition-colors text-decoration-none"
                    >
                      <span>Explore {activeIndustry.badge || "Sector"}</span>
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
