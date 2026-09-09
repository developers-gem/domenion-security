import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  ChevronRight,
  ArrowRight,
  ShieldCheck,
  LockKeyhole,
} from "lucide-react";
import Button from "../../common/Button";
import Reveal from "../../common/Reveal";

export default function ServiceDetailHero({ service }) {
  const videoRef = useRef(null);

  // Enable video background specifically for CST and Transportation Security
  const isVideoRoute =
    service?.slug === "construction-surveillance-technicians" ||
    service?.slug === "transportation-security";

  const videoSource = isVideoRoute ? service?.heroVideo : null;

  const bgImg = service?.heroImage;
  const cardImg = service?.heroImage;

  // Enforce autoplay policies at the DOM level when a video is loaded
  useEffect(() => {
    if (isVideoRoute && videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {});
    }
  }, [isVideoRoute, videoSource]);

  return (
    <section className="relative py-16 sm:py-24 lg:py-28 bg-domenion-blue text-white overflow-hidden border-b border-domenion-gold/20">
      {/* Background Media: Video for targeted services, static fallback image for others */}
      {isVideoRoute && videoSource ? (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <video
            ref={videoRef}
            key={videoSource}
            src={videoSource}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover object-center  scale-110 translate-y-14 pointer-events-none"
          />
        </div>
      ) : (
        bgImg && (
          <div
            className="absolute inset-0 bg-cover bg-center opacity-30 scale-105"
            style={{ backgroundImage: `url(${bgImg})` }}
          />
        )
      )}

      {/* Balanced background gradient */}
      <div
        className={`absolute inset-0 ${
          isVideoRoute
            ? "bg-gradient-to-r from-domenion-blue via-domenion-blue/70 to-domenion-blue/20"
            : "bg-gradient-to-r from-domenion-blue via-domenion-blue/90 to-domenion-blue/60"
        }`}
      />

      <div className="relative z-10 max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headlines & Breadcrumbs (expands to full width when hero image is hidden) */}
          <div
            className={
              isVideoRoute ? "lg:col-span-12 max-w-3xl" : "lg:col-span-7"
            }
          >
            <div className="flex flex-col">
              {/* Breadcrumbs */}
              <Reveal direction="fade">
                <div className="flex items-center gap-2 text-xs font-heading font-bold text-domenion-gold mb-4">
                  <Link to="/" className="hover:underline">
                    Home
                  </Link>
                  <ChevronRight size={13} />
                  <Link to="/services" className="hover:underline">
                    Services
                  </Link>
                  <ChevronRight size={13} />
                  <span className="text-white">
                    {service?.badge || "Service Detail"}
                  </span>
                </div>
              </Reveal>

              {/* Eyebrow Badge */}
              <Reveal direction="right" delay={0.1}>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-domenion-gold/15 border border-domenion-gold/35 rounded-full text-domenion-gold font-heading text-xs font-extrabold tracking-widest w-fit mb-4">
                  <ShieldCheck size={15} className="text-domenion-gold" />
                  <span>{service?.badge || "DOMENION SECURITY"}</span>
                </div>
              </Reveal>

              {/* Headline */}
              <Reveal direction="right" delay={0.2}>
                <h1 className="text-white font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 leading-tight capitalize drop-shadow-md">
                  {service?.title}
                </h1>
              </Reveal>

              {/* Description */}
              <Reveal direction="right" delay={0.3}>
                <p className="text-white/90 font-sans text-base sm:text-lg leading-relaxed max-w-xl mb-8 drop-shadow-sm">
                  {service?.shortDescription || service?.description}
                </p>
              </Reveal>

              {/* CTA Buttons */}
              <Reveal direction="right" delay={0.4}>
                <div className="flex flex-wrap items-center gap-4">
                  <Button
                    to="/contact"
                    variant="primary"
                    size="lg"
                    icon={ArrowRight}
                    className="transition-all hover:translate-0.5 active:translate-y-0.5"
                  >
                    Request A Security Quote
                  </Button>
                  <Button to="/services" variant="gold-outline" size="lg">
                    Explore All Services
                  </Button>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Right Column: Service Visual Image Card (hidden on video routes) */}
          {!isVideoRoute && (
            <div className="lg:col-span-5">
              <Reveal direction="left" delay={0.2}>
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-domenion-gold/30 group">
                  <img
                    src={cardImg}
                    alt={service?.title || "Security Service"}
                    className="w-full h-80 sm:h-96 object-cover object-top group-hover:scale-105 transition-transform duration-500 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-domenion-blue/80 via-transparent to-transparent" />

                  {/* Floating Meta Block */}
                  <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md p-4 rounded-xl border border-domenion-gold/40 shadow-lg flex flex-col text-domenion-blue">
                    <div className="flex items-center gap-1.5 text-domenion-gold font-heading text-[10px] font-extrabold tracking-wider uppercase mb-1">
                      <LockKeyhole size={14} />
                      <span>24/7 READINESS</span>
                    </div>
                    <strong className="text-domenion-blue font-heading text-sm font-extrabold">
                      {service?.badge || "DOMENION PROTECTION"}
                    </strong>
                    <span className="text-gray-600 text-xs mt-0.5">
                      Protected with purpose.
                    </span>
                  </div>
                </div>
              </Reveal>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
