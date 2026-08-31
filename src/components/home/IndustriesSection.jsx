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
import "./IndustriesSection.css";

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
    <section className="section ds-industries-section">
      <div className="container">
        {/* Section Header with Slider Navigation Controls */}
        <div className="row align-items-end mb-5">
          <div className="col-lg-7">
            <Reveal direction="up">
              <span className="section-label">INDUSTRIES WE PROTECT</span>
            </Reveal>

            <Reveal direction="up" delay={0.1}>
              <h2 className="section-title">
                Security tailored to
                <br />
                <span>the environments you operate in.</span>
              </h2>
            </Reveal>
          </div>

          <div className="col-lg-5 mt-4 mt-lg-0 d-flex flex-column align-items-lg-end">
            <Reveal direction="up" delay={0.2}>
              <p className="section-description text-lg-end mb-4">
                Every sector faces unique threats, regulatory compliance standards, and
                operational vulnerabilities. Dominion provides custom-tailored security
                programs built around your specific industry.
              </p>

              {/* Slider Navigation Counter & Arrows */}
              <div className="ds-industry-nav-controls">
                <div className="ds-slider-counter">
                  <span className="ds-current-slide">
                    {String(activeIndex + 1).padStart(2, "0")}
                  </span>
                  <span className="ds-counter-divider">/</span>
                  <span className="ds-total-slides">
                    {String(totalSlides).padStart(2, "0")}
                  </span>
                </div>

                <div className="ds-slider-arrows">
                  <button
                    type="button"
                    className="ds-slider-arrow ds-prev-arrow"
                    onClick={() => swiperRef?.slidePrev()}
                    aria-label="Previous Industry"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    type="button"
                    className="ds-slider-arrow ds-next-arrow"
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
            className="ds-industries-swiper"
          >
            {industries.map((ind, index) => {
              const Icon = INDUSTRY_ICONS[ind.slug] || Building2;
              return (
                <SwiperSlide key={ind.slug}>
                  <Link
                    to={`/industries/${ind.slug}`}
                    className="ds-industry-card-premium"
                  >
                    <div className="ds-ind-card-img-wrap">
                      <img
                        src={ind.heroImage || ind.overviewImage || "/images/company-security.jpg"}
                        alt={ind.title}
                        className="ds-ind-card-img"
                        onError={(e) => {
                          e.target.src = "/images/company-security.jpg";
                        }}
                      />
                      <div className="ds-ind-card-overlay" />
                      <span className="ds-ind-num">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div className="ds-ind-icon-badge">
                        <Icon size={20} />
                      </div>
                    </div>

                    <div className="ds-ind-card-content">
                      <span className="ds-ind-badge">{ind.badge || "SECURITY SECTOR"}</span>
                      <h3 className="ds-ind-title">{ind.title}</h3>
                      <p className="ds-ind-desc">
                        {ind.shortDescription || "Specialized security coverage"}
                      </p>

                      <div className="ds-ind-link-bar">
                        <span>Explore Industry Solutions</span>
                        <ArrowRight size={16} className="ds-ind-arrow-icon" />
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </Reveal>

        {/* Bottom Action CTA */}
        <div className="mt-5 text-center">
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
