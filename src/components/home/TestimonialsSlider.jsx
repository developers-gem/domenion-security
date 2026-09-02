import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation } from "swiper/modules";
import { Quote, Star, ChevronLeft, ChevronRight, ShieldCheck } from "lucide-react";
import Reveal from "../common/Reveal";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";

const TESTIMONIALS = [
  {
    id: 1,
    quote:
      "Dominion Security provided exceptional physical security officers for our commercial data center. Their disciplined personnel and strict access control procedures gave us total operational confidence.",
    author: "Director of Enterprise Security",
    organization: "Commercial Infrastructure Client",
  },
  {
    id: 2,
    quote:
      "Fast response times, highly professional officers, and detailed daily reporting. Dominion has been an invaluable security partner for our multi-facility property portfolio.",
    author: "VP of Property Operations",
    organization: "Commercial Real Estate Firm",
  },
  {
    id: 3,
    quote:
      "Their integrated approach combining on-site physical security guards and 24/7 active monitoring significantly reduced unauthorized access incidents at our logistics hub.",
    author: "Head of Logistics & Supply Chain Defense",
    organization: "Transportation Enterprise",
  },
  {
    id: 4,
    quote:
      "The consistency and discipline of Dominion's security officers across our retail locations has been outstanding. They seamlessly integrate with our loss prevention operations.",
    author: "Corporate Security Director",
    organization: "National Retail Enterprise",
  },
  {
    id: 5,
    quote:
      "Outstanding responsiveness and transparent communication. Whenever an operational security requirement arises, Dominion dispatches qualified personnel and resolves it immediately.",
    author: "Facilities & Operations Manager",
    organization: "Commercial Real Estate Portfolio",
  },
  {
    id: 6,
    quote:
      "Dominion's security team maintains rigorous physical security standards for our high-security technology facilities. Their 24/7 post coverage and access management give us complete peace of mind.",
    author: "Director of Facility Operations",
    organization: "Critical Infrastructure Client",
  },
];

export default function TestimonialsSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [swiperRef, setSwiperRef] = useState(null);

  const totalSlides = TESTIMONIALS.length;

  return (
    <section className="py-20 sm:py-28 bg-domenion-blue text-white overflow-hidden border-b border-domenion-gold/20">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <Reveal direction="up">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-domenion-gold/15 border border-domenion-gold/35 rounded-full text-domenion-gold font-heading text-xs font-extrabold tracking-widest">
              <ShieldCheck size={14} className="text-domenion-gold" />
              <span>CLIENT TRUST & REPUTATION</span>
            </div>
          </Reveal>

          <Reveal direction="up" delay={0.1}>
            <h2 className="text-white font-heading text-3xl sm:text-4xl font-extrabold tracking-tight mt-3">
              Trusted by leading organizations.
            </h2>
          </Reveal>
        </div>

        <div className="max-w-4xl mx-auto">
          <Reveal direction="up" delay={0.2}>
            <div className="relative bg-white/5 border border-domenion-gold/30 rounded-2xl p-8 sm:p-12 shadow-2xl backdrop-blur-md">
              <Quote size={64} className="absolute top-6 right-6 text-domenion-gold/10" />

              <Swiper
                onSwiper={setSwiperRef}
                onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                modules={[Autoplay, EffectFade, Navigation]}
                effect="fade"
                fadeEffect={{ crossFade: true }}
                speed={600}
                autoplay={{ delay: 6500, disableOnInteraction: false }}
                loop
              >
                {TESTIMONIALS.map((item) => (
                  <SwiperSlide key={item.id}>
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={18}
                            className="text-domenion-gold fill-domenion-gold"
                          />
                        ))}
                      </div>

                      <blockquote className="text-white font-heading text-lg sm:text-xl md:text-2xl font-semibold leading-relaxed my-2 italic">
                        "{item.quote}"
                      </blockquote>

                      <div className="flex flex-col mt-2">
                        <strong className="text-domenion-gold font-heading text-base font-bold">
                          {item.author}
                        </strong>
                        <span className="text-white/70 text-xs sm:text-sm">
                          {item.organization}
                        </span>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Slider Controls Bar */}
              <div className="flex items-center justify-between pt-6 mt-6 border-t border-white/10">
                <div className="flex items-center gap-1 font-heading text-xs font-bold">
                  <span className="text-domenion-gold">
                    {String(activeIndex + 1).padStart(2, "0")}
                  </span>
                  <span className="text-white/40">/</span>
                  <span className="text-white/60">
                    {String(totalSlides).padStart(2, "0")}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className="w-9 h-9 rounded-full bg-white/10 border border-white/20 text-white hover:bg-domenion-gold hover:text-domenion-blue hover:border-domenion-gold transition-colors flex items-center justify-center cursor-pointer"
                    onClick={() => swiperRef?.slidePrev()}
                    aria-label="Previous Testimonial"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    type="button"
                    className="w-9 h-9 rounded-full bg-white/10 border border-white/20 text-white hover:bg-domenion-gold hover:text-domenion-blue hover:border-domenion-gold transition-colors flex items-center justify-center cursor-pointer"
                    onClick={() => swiperRef?.slideNext()}
                    aria-label="Next Testimonial"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

