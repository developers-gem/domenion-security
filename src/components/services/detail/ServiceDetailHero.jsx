
import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
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
  const location = useLocation();
  const [videoFailed, setVideoFailed] = useState(false);

  const pathname = location.pathname;

  // Identify pages that use background videos.
  const isCST =
    service?.slug === "construction-surveillance-technicians";

  const isTransportationIndustry =
    pathname.startsWith("/industries/transportation") ||
    service?.slug === "transportation";

  const isCyberSecurity =
    service?.slug === "cyber-security";

  const isDataCentersIndustry =
    pathname.startsWith("/industries/data-centers") ||
    service?.slug === "data-centers";

  const isVideoRoute =
    isCST ||
    isTransportationIndustry ||
    isCyberSecurity ||
    isDataCentersIndustry;

  // Select the video for the matching route.
  const videoSource = isCST
    ? service?.heroVideo || "/videos/security(CST).mp4"
    : isTransportationIndustry
      ? service?.heroVideo || "/videos/Transportation.mp4"
      : isCyberSecurity
        ? service?.heroVideo || "/videos/cyber-security.mp4"
        : isDataCentersIndustry
          ? service?.heroVideo || "/videos/data-center-security.mp4"
          : null;

  const bgImg = service?.heroImage;
  const cardImg = service?.heroImage;

  // Reset errors and retry playback whenever the source changes.
  useEffect(() => {
    setVideoFailed(false);

    const video = videoRef.current;

    if (!isVideoRoute || !video || !videoSource) return;

    video.muted = true;
    video.defaultMuted = true;

    const attemptPlayback = () => {
      video.play().catch((error) => {
        console.warn("Background video autoplay failed:", error);
      });
    };

    if (video.readyState >= 2) {
      attemptPlayback();
    } else {
      video.addEventListener("canplay", attemptPlayback, {
        once: true,
      });
    }

    return () => {
      video.removeEventListener("canplay", attemptPlayback);
      video.pause();
    };
  }, [isVideoRoute, videoSource]);

  return (
    <section className="relative isolate min-h-[500px] overflow-hidden border-b border-domenion-gold/20 bg-domenion-blue py-16 text-white sm:py-24 lg:py-28">
      {/* Background video */}
      {isVideoRoute && videoSource && !videoFailed && (
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-domenion-blue">
          <video
            ref={videoRef}
            key={videoSource}
            src={videoSource}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            aria-hidden="true"
            onError={(event) => {
              const video = event.currentTarget;

              console.error("Background video could not load:", {
                source: videoSource,
                error: video.error,
                networkState: video.networkState,
                readyState: video.readyState,
              });

              setVideoFailed(true);
            }}
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
        </div>
      )}

      {/* Fallback image if the video fails */}
      {isVideoRoute && videoFailed && bgImg && (
        <div
          className="pointer-events-none absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: `url("${bgImg}")` }}
        />
      )}

      {/* Static image for other service pages */}
      {!isVideoRoute && bgImg && (
        <div
          className="pointer-events-none absolute inset-0 z-0 scale-105 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url("${bgImg}")` }}
        />
      )}

      {/* Readability overlays */}
      {isVideoRoute && (
        <div className="pointer-events-none absolute inset-0 z-[1] bg-black/35" />
      )}

      {!isCST && (
        <div
          className={`pointer-events-none absolute inset-0 z-[1] ${
            isTransportationIndustry
              ? "bg-gradient-to-r from-domenion-blue/90 via-domenion-blue/55 to-domenion-blue/15"
              : "bg-gradient-to-r from-domenion-blue/90 via-domenion-blue/65 to-domenion-blue/35"
          }`}
        />
      )}

      {/* Main content */}
      <div className="relative z-10 mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          {/* Heading and breadcrumbs */}
          <div
            className={
              isVideoRoute
                ? "max-w-3xl lg:col-span-12"
                : "lg:col-span-7"
            }
          >
            <div className="flex flex-col">
              {/* Breadcrumbs */}
              <Reveal direction="fade">
                <div className="mb-4 flex items-center gap-2 text-xs font-heading font-bold text-domenion-gold">
                  <Link to="/" className="hover:underline">
                    Home
                  </Link>

                  <ChevronRight size={13} />

                  <Link
                    to={
                      pathname.startsWith("/industries")
                        ? "/industries"
                        : "/services"
                    }
                    className="hover:underline"
                  >
                    {pathname.startsWith("/industries")
                      ? "Industries"
                      : "Services"}
                  </Link>

                  <ChevronRight size={13} />

                  <span className="text-white">
                    {service?.badge || "Detail"}
                  </span>
                </div>
              </Reveal>

              {/* Badge */}
              <Reveal direction="right" delay={0.1}>
                <div className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-domenion-gold/35 bg-domenion-gold/15 px-3.5 py-1.5 font-heading text-xs font-extrabold tracking-widest text-domenion-gold">
                  <ShieldCheck size={15} />
                  <span>
                    {service?.badge || "DOMENION SECURITY"}
                  </span>
                </div>
              </Reveal>

              {/* Title */}
              <Reveal direction="right" delay={0.2}>
                <h1 className="mb-4 text-4xl font-heading font-extrabold leading-tight tracking-tight text-white [text-shadow:_0_3px_12px_rgb(0_0_0_/_95%),_0_8px_30px_rgb(0_0_0_/_80%)] sm:text-5xl lg:text-6xl">
                  {service?.title}
                </h1>
              </Reveal>

              {/* Description */}
              <Reveal direction="right" delay={0.3}>
                <p className="mb-8 max-w-xl font-sans text-base leading-relaxed text-white [text-shadow:_0_2px_8px_rgb(0_0_0_/_90%),_0_4px_18px_rgb(0_0_0_/_75%)] sm:text-lg">
                  {service?.shortDescription ||
                    service?.description}
                </p>
              </Reveal>

              {/* Action buttons */}
              <Reveal direction="right" delay={0.4}>
                <div className="flex flex-wrap items-center gap-4">
                  <Button
                    to="/contact"
                    variant="primary"
                    size="lg"
                    icon={ArrowRight}
                    className="shadow-[0_8px_24px_rgba(0,0,0,0.55)] transition-all hover:shadow-[0_12px_32px_rgba(0,0,0,0.7)]"
                  >
                    Request A Security Quote
                  </Button>

                  <Button
                    to={
                      pathname.startsWith("/industries")
                        ? "/industries"
                        : "/services"
                    }
                    variant="gold-outline"
                    size="lg"
                    className="shadow-[0_8px_24px_rgba(0,0,0,0.55)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.7)]"
                  >
                    Explore All{" "}
                    {pathname.startsWith("/industries")
                      ? "Industries"
                      : "Services"}
                  </Button>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Image card on non-video pages */}
          {!isVideoRoute && cardImg && (
            <div className="lg:col-span-5">
              <Reveal direction="left" delay={0.2}>
                <div className="group relative overflow-hidden rounded-2xl border border-domenion-gold/30 shadow-2xl">
                  <img
                    src={cardImg}
                    alt={service?.title || "Security Service"}
                    className="h-80 w-full object-cover object-top transition-transform duration-500 group-hover:scale-105 sm:h-96"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-domenion-blue/80 via-transparent to-transparent" />

                  <div className="absolute bottom-6 left-6 right-6 flex flex-col rounded-xl border border-domenion-gold/40 bg-white/95 p-4 text-domenion-blue shadow-lg backdrop-blur-md">
                    <div className="mb-1 flex items-center gap-1.5 font-heading text-[10px] font-extrabold uppercase tracking-wider text-domenion-gold">
                      <LockKeyhole size={14} />
                      <span>24/7 READINESS</span>
                    </div>

                    <strong className="font-heading text-sm font-extrabold">
                      {service?.badge || "DOMENION PROTECTION"}
                    </strong>

                    <span className="mt-0.5 text-xs text-gray-600">
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
