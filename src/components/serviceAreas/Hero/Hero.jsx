import { MapPinned, PhoneCall, ArrowRight, ShieldCheck } from "lucide-react";
import Button from "../../common/Button";

function Hero() {
  return (
    <section className="relative py-16 sm:py-24 lg:py-28 bg-domenion-blue text-white overflow-hidden border-b border-domenion-gold/20">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-25 scale-105"
        style={{ backgroundImage: `url(/images/service-areas/bg.jpg)` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-domenion-blue via-domenion-blue/95 to-domenion-blue/70" />

      <div className="relative z-10 max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <div className="flex flex-col">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-domenion-gold/15 border border-domenion-gold/35 rounded-full text-domenion-gold font-heading text-xs font-extrabold tracking-widest w-fit mb-6">
                <ShieldCheck size={15} className="text-domenion-gold" />
                <span>SERVICE AREAS</span>
              </div>

              <h1 className="text-white font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 leading-tight">
                Trusted Security <span className="text-domenion-gold">Across The Nation</span>
              </h1>

              <p className="text-white/85 font-sans text-base sm:text-lg leading-relaxed mb-8 max-w-xl">
                Licensed, bonded, and providing professional security coverage across all 50 states with licensed officers, rapid response teams, mobile patrols and enterprise-grade protection for businesses, government agencies and residential communities.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <Button to="/contact" variant="primary" size="lg" icon={ArrowRight}>
                  Request Security
                </Button>
                <Button href="tel:+16024384445" variant="gold-outline" size="lg" icon={PhoneCall} iconPosition="left">
                  (602) 438-4445
                </Button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="bg-white/5 border border-domenion-gold/30 rounded-2xl p-8 backdrop-blur-md shadow-2xl">
              <div className="flex items-center gap-4 pb-6 mb-6 border-b border-white/10">
                <div className="w-12 h-12 rounded-xl bg-domenion-gold/15 border border-domenion-gold/30 text-domenion-gold grid place-items-center">
                  <MapPinned size={28} />
                </div>
                <div>
                  <h3 className="text-white font-heading text-xl font-extrabold">Coverage Summary</h3>
                  <span className="text-white/70 text-xs">Nationwide Security Infrastructure</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                  <h2 className="text-domenion-gold font-heading text-3xl font-extrabold mb-1">50</h2>
                  <span className="text-white/80 text-xs font-semibold">States Covered</span>
                </div>
                <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                  <h2 className="text-domenion-gold font-heading text-3xl font-extrabold mb-1">50+</h2>
                  <span className="text-white/80 text-xs font-semibold">Metro Hubs</span>
                </div>
                <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                  <h2 className="text-domenion-gold font-heading text-3xl font-extrabold mb-1">100%</h2>
                  <span className="text-white/80 text-xs font-semibold">Vetted Personnel</span>
                </div>
                <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                  <h2 className="text-domenion-gold font-heading text-3xl font-extrabold mb-1">24/7</h2>
                  <span className="text-white/80 text-xs font-semibold">Dispatch Response</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;