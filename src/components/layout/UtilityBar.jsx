import { Phone, Mail, ShieldCheck } from "lucide-react";
import "./UtilityBar.css";

export default function UtilityBar() {
  return (
    <div className="ds-utility-bar" role="region" aria-label="Quick Contact Bar">
      <div className="ds-utility-inner">
        {/* Left Side: Short Verified Phrase */}
        <div className="ds-utility-left">
          <ShieldCheck size={14} className="ds-utility-icon-gold" />
          <span className="ds-utility-label">24/7 SECURITY DISPATCH & CONSULTATION</span>
        </div>

        {/* Right Side: Direct Contact Lines */}
        <div className="ds-utility-right">
          <a href="tel:+16024384445" className="ds-utility-link">
            <Phone size={13} className="ds-utility-icon-gold" />
            <span className="ds-utility-tag">CALL</span>
            <span className="ds-utility-val">(602) 438-4445</span>
          </a>

          <span className="ds-utility-divider" />

          <a href="mailto:info@domenionsecurity.com" className="ds-utility-link">
            <Mail size={13} className="ds-utility-icon-gold" />
            <span className="ds-utility-tag">EMAIL</span>
            <span className="ds-utility-val">info@domenionsecurity.com</span>
          </a>
        </div>
      </div>
    </div>
  );
}
