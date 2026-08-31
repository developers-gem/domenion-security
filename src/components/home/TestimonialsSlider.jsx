import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation } from "swiper/modules";
import { Quote, Star, ChevronLeft, ChevronRight, ShieldCheck } from "lucide-react";
import Reveal from "../common/Reveal";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "./TestimonialsSlider.css";

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
    <section className="section ds-testimonials-section">
      <div className="container">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-4">
          <Reveal direction="up">
            <div className="ds-testimonials-badge">
              <ShieldCheck size={14} />
              <span>CLIENT TRUST & REPUTATION</span>
            </div>
          </Reveal>

          <Reveal direction="up" delay={0.1}>
            <h2 className="section-title text-white mt-2">
              Trusted by leading organizations.
            </h2>
          </Reveal>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-10 col-xl-9">
            <Reveal direction="up" delay={0.2}>
              <div className="ds-testimonial-card-premium">
                <Quote size={64} className="ds-quote-icon-bg" />

                <Swiper
                  onSwiper={setSwiperRef}
                  onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                  modules={[Autoplay, EffectFade, Navigation]}
                  effect="fade"
                  fadeEffect={{ crossFade: true }}
                  speed={600}
                  autoplay={{ delay: 6500, disableOnInteraction: false }}
                  loop
                  className="ds-testimonials-swiper"
                >
                  {TESTIMONIALS.map((item) => (
                    <SwiperSlide key={item.id}>
                      <div className="ds-testimonial-slide-inner">
                        <div className="ds-stars-row">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={18}
                              className="ds-star-gold"
                              fill="currentColor"
                            />
                          ))}
                        </div>

                        <blockquote className="ds-testimonial-quote-text">
                          "{item.quote}"
                        </blockquote>

                        <div className="ds-testimonial-author-box">
                          <strong className="ds-author-name-text">
                            {item.author}
                          </strong>
                          <span className="ds-author-org-text">
                            {item.organization}
                          </span>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>

                {/* Slider Controls Bar */}
                <div className="ds-testimonial-controls-bar">
                  <div className="ds-testimonial-counter">
                    <span className="ds-t-active">
                      {String(activeIndex + 1).padStart(2, "0")}
                    </span>
                    <span className="ds-t-sep">/</span>
                    <span className="ds-t-total">
                      {String(totalSlides).padStart(2, "0")}
                    </span>
                  </div>

                  <div className="ds-testimonial-arrows">
                    <button
                      type="button"
                      className="ds-t-arrow"
                      onClick={() => swiperRef?.slidePrev()}
                      aria-label="Previous Testimonial"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <button
                      type="button"
                      className="ds-t-arrow"
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
      </div>
    </section>
  );
}
