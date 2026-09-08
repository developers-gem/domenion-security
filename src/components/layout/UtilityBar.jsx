import { Phone, Mail, ShieldCheck } from "lucide-react";

export default function UtilityBar() {
  return (
    <div
      className="bg-[#C7A45B] text-white font-heading border-b border-white/10 relative z-50 transition-all duration-200"
      role="region"
      aria-label="Quick Contact Bar"
    >
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 min-h-[56px] py-2.5 md:py-0 flex flex-col md:flex-row items-center justify-between gap-2.5 md:gap-4">
        {/* Left Side: Shield & Licensing Phrase */}
        <div className="flex items-center gap-2 text-black tracking-wider font-extrabold text-[11px] sm:text-xs uppercase text-center md:text-left">
          <ShieldCheck size={22} className="text-black flex-shrink-0" />
          <span>LICENSED & BONDED • 50-STATE COVERAGE</span>
        </div>

        {/* Right Side: Direct Call & Email Lines */}
        <div className="flex flex-wrap items-center justify-center md:justify-end gap-3 sm:gap-5 text-xs">
          <a
            href="tel:+16024384445"
            className="flex items-center gap-1.5 text-white hover:text-black transition-colors duration-200"
          >
            <Phone size={18} className="text-black shrink-0 mt-0.5" />
            {/* <span className="text-black font-extrabold text-[10px] tracking-wider uppercase">
              CALL
            </span> */}
            <span className="font-bold text-xs sm:text-sm tracking-tight text-black">
              (602) 438-4445
            </span>
          </a>

          <span className="h-4 w-px bg-white/20 hidden md:inline-block" />

          <a
            href="mailto:Domenionseurityllc@gmail.com"
            className="flex items-center gap-1.5 text-white hover:text-black transition-colors duration-200"
          >
            <Mail size={20} className="text-black shrink-0 " />
            {/* <span className="text-black font-extrabold text-[12px] tracking-wider uppercase">
              EMAIL
            </span> */}
            <span className="font-bold text-xs sm:text-sm tracking-wide text-black">
              Domenionseurityllc@gmail.com
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}
