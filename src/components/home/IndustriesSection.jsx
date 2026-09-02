import { useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import {
  Building2,
  Landmark,
  Truck,
  HardHat,
  Plane,
  HeartPulse,
  ShoppingBag,
  Home as HomeIcon,
  Cpu,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import Button from "../common/Button";
import Reveal from "../common/Reveal";
import { industries } from "../../data/industries";

import "swiper/css";
import "swiper/css/navigation";

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

export default function IndustriesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [swiperRef, setSwiperRef] = useState(null);

  const totalSlides = industries.length;

  return (
    <section className="py-20 sm:py-28 bg-white text-domenion-blue border-b border-neutral-border">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Slider Navigation Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12">
          <div className="lg:col-span-7">
            <Reveal direction="up">
              <span className="inline-flex items-center gap-2 text-domenion-gold font-heading text-xs font-extrabold tracking-widest uppercase">INDUSTRIES WE PROTECT</span>
            </Reveal>

            <Reveal direction="up" delay={0.1}>
              <h2 className="text-domenion-blue font-heading text-3xl sm:text-4xl font-extrabold tracking-tight mt-2">
                Security tailored to <span className="text-domenion-gold">the environments you operate in.</span>
              </h2>
            </Reveal>
          </div>

          <div className="lg:col-span-5 flex flex-col items-start lg:items-end">
            <Reveal direction="up" delay={0.2}>
              <p className="text-gray-600 font-sans text-base leading-relaxed lg:text-right mb-6">
                Every sector faces unique threats, regulatory compliance standards, and
                operational vulnerabilities. Dominion provides custom-tailored security
                programs built around your specific industry.
              </p>

              {/* Slider Navigation Counter & Arrows */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 font-heading text-sm font-bold">
                  <span className="text-domenion-gold">
                    {String(activeIndex + 1).padStart(2, "0")}
                  </span>
                  <span className="text-gray-300">/</span>
                  <span className="text-gray-400">
                    {String(totalSlides).padStart(2, "0")}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className="w-10 h-10 rounded-full bg-neutral-light border border-neutral-border text-domenion-blue hover:bg-domenion-gold hover:text-domenion-blue hover:border-domenion-gold transition-colors flex items-center justify-center cursor-pointer"
                    onClick={() => swiperRef?.slidePrev()}
                    aria-label="Previous Industry"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    type="button"
                    className="w-10 h-10 rounded-full bg-neutral-light border border-neutral-border text-domenion-blue hover:bg-domenion-gold hover:text-domenion-blue hover:border-domenion-gold transition-colors flex items-center justify-center cursor-pointer"
                    onClick={() => swiperRef?.slideNext()}
                    aria-label="Next Industry"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Premium Industry Swiper Carousel */}
        <Reveal direction="up" delay={0.3}>
          <Swiper
            onSwiper={setSwiperRef}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            modules={[Navigation, Autoplay]}
            speed={600}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            spaceBetween={24}
            breakpoints={{
              320: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              992: { slidesPerView: 3 },
              1200: { slidesPerView: 4 },
            }}
            loop
            className="pb-4"
          >
            {industries.map((ind, index) => {
              const Icon = INDUSTRY_ICONS[ind.slug] || Building2;
              return (
                <SwiperSlide key={ind.slug}>
                  <Link
                    to={`/industries/${ind.slug}`}
                    className="block rounded-xl overflow-hidden bg-white border border-neutral-border hover:border-domenion-gold/50 shadow-sm hover:shadow-md transition-all duration-300 group text-decoration-none h-full"
                  >
                    <div className="relative h-52 overflow-hidden">
                      <img
                        src={ind.heroImage || ind.overviewImage || "/images/company-security.jpg"}
                        alt={ind.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          e.target.src = "/images/company-security.jpg";
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-domenion-blue/80 via-transparent to-transparent" />
                      <span className="absolute bottom-3 left-4 font-heading font-extrabold text-domenion-gold text-sm">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div className="absolute top-4 right-4 w-10 h-10 rounded-lg bg-white/95 text-domenion-blue grid place-items-center shadow-md group-hover:bg-domenion-gold group-hover:text-domenion-blue transition-colors">
                        <Icon size={20} />
                      </div>
                    </div>

                    <div className="p-6 flex flex-col gap-2">
                      <span className="text-[10px] font-extrabold text-domenion-gold tracking-widest uppercase">{ind.badge || "SECURITY SECTOR"}</span>
                      <h3 className="text-domenion-blue font-heading text-xl font-bold group-hover:text-domenion-gold transition-colors">{ind.title}</h3>
                      <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">
                        {ind.shortDescription || "Specialized security coverage"}
                      </p>

                      <div className="inline-flex items-center gap-2 text-domenion-gold font-heading text-xs font-bold mt-3 group-hover:translate-x-1 transition-transform">
                        <span>Explore Industry Solutions</span>
                        <ArrowRight size={16} />
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </Reveal>

        {/* Bottom Action CTA */}
        <div className="mt-12 text-center">
          <Reveal direction="up" delay={0.4}>
            <Button to="/industries" variant="primary" icon={ArrowRight}>
              Explore All Industry Solutions
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

