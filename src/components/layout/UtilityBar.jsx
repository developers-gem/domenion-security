import { Phone, Mail, ShieldCheck } from "lucide-react";

export default function UtilityBar() {
  return (
    <div
      className="bg-domenion-blue text-white font-heading border-b border-white/10 relative z-50 transition-all duration-200"
      role="region"
      aria-label="Quick Contact Bar"
    >
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 min-h-[56px] py-2.5 md:py-0 flex flex-col md:flex-row items-center justify-between gap-2.5 md:gap-4">
        {/* Left Side: Shield & Licensing Phrase */}
        <div className="flex items-center gap-2 text-domenion-gold tracking-wider font-extrabold text-[11px] sm:text-xs uppercase text-center md:text-left">
          <ShieldCheck size={16} className="text-domenion-gold flex-shrink-0" />
          <span>LICENSED & BONDED • 50-STATE COVERAGE</span>
        </div>

        {/* Right Side: Direct Call & Email Lines */}
        <div className="flex flex-wrap items-center justify-center md:justify-end gap-3 sm:gap-5 text-xs">
          <a
            href="tel:+16024384445"
            className="flex items-center gap-1.5 text-white hover:text-domenion-gold transition-colors duration-200"
          >
            <Phone size={14} className="text-domenion-gold flex-shrink-0" />
            <span className="text-domenion-gold font-extrabold text-[10px] tracking-wider uppercase">CALL</span>
            <span className="font-bold text-xs sm:text-sm tracking-tight">(602) 438-4445</span>
          </a>

          <span className="h-4 w-px bg-white/20 hidden md:inline-block" />

          <a
            href="mailto:Domenionseurityllc@gmail.com"
            className="flex items-center gap-1.5 text-white hover:text-domenion-gold transition-colors duration-200"
          >
            <Mail size={14} className="text-domenion-gold flex-shrink-0" />
            <span className="text-domenion-gold font-extrabold text-[10px] tracking-wider uppercase">EMAIL</span>
            <span className="font-bold text-xs sm:text-sm tracking-tight">Domenionseurityllc@gmail.com</span>
          </a>
        </div>
      </div>
    </div>
  );
}
