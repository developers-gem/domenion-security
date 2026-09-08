import { Link } from "react-router-dom";
import {
  Building2,
  Landmark,
  HeartPulse,
  ShoppingBag,
  Truck,
  Cpu,
  Plane,
  HardHat,
  Home as HomeIcon,
  ArrowRight,
} from "lucide-react";
import Reveal from "../common/Reveal";
import { industries } from "../../data/industries";

const INDUSTRY_ICONS = {
  government: Landmark,
  healthcare: HeartPulse,
  commercial: Building2,
  retail: ShoppingBag,
  warehousing: Truck,
  "data-centers": Cpu,
  airports: Plane,
  transportation: Truck,
  construction: HardHat,
  residential: HomeIcon,
};

export default function AboutIndustries() {
  return (
    <section className="py-20 sm:py-28 bg-white text-domenion-blue border-b border-neutral-border">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12">
          <div className="lg:col-span-7">
            <Reveal direction="up">
              <span className="inline-flex items-center gap-2 text-domenion-gold font-heading text-xs font-extrabold tracking-widest uppercase">WHAT WE PROTECT</span>
            </Reveal>

            <Reveal direction="up" delay={0.1}>
              <h2 className="text-domenion-blue font-heading text-3xl sm:text-4xl font-extrabold tracking-tight mt-2 leading-tight">
                Security tailored for the environments <span className="text-domenion-gold">that keep your world moving.</span>
              </h2>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal direction="up" delay={0.2}>
              <p className="text-gray-600 font-sans text-base sm:text-lg leading-relaxed">
                Every sector faces unique threat vectors, regulatory compliance standards,
                and operational risks. Domenion designs custom-tailored protection programs
                for critical environments.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Sectors Showcase Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {industries.map((ind, index) => {
            const Icon = INDUSTRY_ICONS[ind.slug] || Building2;
            return (
              <div key={ind.slug}>
                <Reveal direction="up" delay={0.05 * index}>
                  <Link
                    to={`/industries/${ind.slug}`}
                    className="block bg-neutral-light border border-neutral-border hover:border-domenion-gold/50 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 group text-decoration-none h-full flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-domenion-gold font-heading text-sm font-extrabold">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div className="w-9 h-9 rounded-lg bg-domenion-blue/5 border border-domenion-gold/30 text-domenion-gold grid place-items-center group-hover:bg-domenion-gold group-hover:text-domenion-blue transition-colors">
                        <Icon size={18} />
                      </div>
                    </div>

                    <div className="flex flex-col mb-4">
                      <h3 className="text-domenion-blue font-heading text-lg font-bold group-hover:text-domenion-gold transition-colors">{ind.title}</h3>
                      <p className="text-gray-500 text-xs sm:text-sm mt-1 leading-relaxed line-clamp-2">
                        {ind.shortDescription || "Specialized security coverage"}
                      </p>
                    </div>

                    <div className="inline-flex items-center gap-2 text-domenion-gold font-heading text-xs font-bold group-hover:translate-x-1 transition-transform">
                      <span>Explore Sector</span>
                      <ArrowRight size={14} />
                    </div>
                  </Link>
                </Reveal>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

