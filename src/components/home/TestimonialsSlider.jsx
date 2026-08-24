import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { Quote, Star } from "lucide-react";
import Reveal from "../common/Reveal";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
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
];

export default function TestimonialsSlider() {
  return (
    <section className="section ds-testimonials-section">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-5">
          <Reveal direction="up">
            <span className="section-label">CLIENT TRUST & REPUTATION</span>
          </Reveal>

          <Reveal direction="up" delay={0.1}>
            <h2 className="section-title text-white">
              Trusted by leading organizations.
            </h2>
          </Reveal>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-9">
            <Reveal direction="up" delay={0.2}>
              <div className="ds-testimonial-card-wrap">
                <Quote size={48} className="ds-quote-icon" />

                <Swiper
                  modules={[Autoplay, EffectFade, Pagination]}
                  effect="fade"
                  fadeEffect={{ crossFade: true }}
                  speed={800}
                  autoplay={{ delay: 7000, disableOnInteraction: false }}
                  pagination={{ clickable: true }}
                  loop
                  className="ds-testimonials-swiper"
                >
                  {TESTIMONIALS.map((item) => (
                    <SwiperSlide key={item.id}>
                      <div className="ds-testimonial-slide">
                        <div className="ds-stars-row">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={16}
                              className="ds-star"
                              fill="currentColor"
                            />
                          ))}
                        </div>

                        <blockquote className="ds-testimonial-quote">
                          "{item.quote}"
                        </blockquote>

                        <div className="ds-testimonial-author-wrap">
                          <strong className="ds-author-name">
                            {item.author}
                          </strong>
                          <span className="ds-author-org">
                            {item.organization}
                          </span>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
