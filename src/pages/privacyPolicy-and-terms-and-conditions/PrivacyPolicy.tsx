import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight, ShieldCheck, Lock, Eye, FileText, Bell } from "lucide-react";
import Reveal from "../../components/common/Reveal";

const PrivacyPolicy: React.FC = () => {
  const lastUpdated: string = "September 2026";

  return (
    <div className="bg-domenion-blue/5 min-h-screen text-domenion-blue">
      {/* Header Banner */}
      <section className="relative py-16 sm:py-20 bg-domenion-blue text-white overflow-hidden border-b border-domenion-gold/20">
        <div className="absolute inset-0 bg-gradient-to-r from-domenion-blue via-domenion-blue/95 to-domenion-blue/80" />
        <div className="relative z-10 max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal direction="fade">
            <div className="flex items-center justify-center gap-2 text-xs font-heading font-bold text-domenion-gold mb-4">
              <Link to="/" className="hover:underline">Home</Link>
              <ChevronRight size={13} />
              <span className="text-white">Privacy Policy</span>
            </div>
          </Reveal>

          <Reveal direction="up" delay={0.1}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-domenion-gold/15 border border-domenion-gold/35 rounded-full text-domenion-gold font-heading text-xs font-extrabold tracking-widest mb-4">
              <ShieldCheck size={15} className="text-domenion-gold" />
              <span>DATA GOVERNANCE & PRIVACY</span>
            </div>
          </Reveal>

          <Reveal direction="up" delay={0.2}>
            <h1 className="text-white font-heading text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 leading-tight">
              Privacy Policy
            </h1>
          </Reveal>

          <Reveal direction="up" delay={0.3}>
            <p className="text-white/80 font-sans text-sm sm:text-base max-w-xl mx-auto">
              How Domenion Security handles, safeguards, and respects client records, surveillance assets, and personal information.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="bg-white rounded-2xl shadow-xl border border-domenion-gold/20 p-6 sm:p-10 space-y-10">
          <div className="border-b border-gray-200 pb-4 flex items-center justify-between">
            <span className="text-xs font-heading font-bold tracking-wider text-gray-500 uppercase">
              Effective Date: {lastUpdated}
            </span>
            <span className="text-xs font-heading font-bold text-domenion-gold uppercase">
              Domenion Security Compliance
            </span>
          </div>

          {/* Section 1 */}
          <section className="space-y-3">
            <div className="flex items-center gap-2.5 text-domenion-blue font-heading text-xl font-bold">
              <Lock size={20} className="text-domenion-gold" />
              <h2>1. Information We Collect</h2>
            </div>
            <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
              At Domenion Security, we gather only the necessary information to provide professional security, surveillance, logistics protection, and incident mitigation services:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm sm:text-base pl-2">
              <li><strong>Contact & Corporate Information:</strong> Names, corporate emails, phone numbers, facility addresses, and billing credentials provided via quotes or service inquiries.</li>
              <li><strong>Facility & Operational Data:</strong> Site maps, floor layouts, gate codes, access lists, and schedules supplied to coordinate our security personnel and CST deployments.</li>
              <li><strong>Surveillance Footage & Logs:</strong> CCTV feeds, patrol checkpoints, access verification logs, and incident report data gathered strictly under explicit client contractual agreements.</li>
            </ul>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <div className="flex items-center gap-2.5 text-domenion-blue font-heading text-xl font-bold">
              <Eye size={20} className="text-domenion-gold" />
              <h2>2. How We Use Collected Data</h2>
            </div>
            <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
              The data collected serves solely to execute tactical protective measures and ensure regulatory adherence:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm sm:text-base pl-2">
              <li>Deploying trained security officers and Construction Surveillance Technicians (CST) efficiently.</li>
              <li>Investigating incidents, documenting site irregularities, and generating audit-ready chain-of-custody reports.</li>
              <li>Ensuring swift communication during facility alerts or supply chain transportation emergencies.</li>
              <li>Fulfilling municipal, state, and federal compliance mandates regarding commercial security operations.</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <div className="flex items-center gap-2.5 text-domenion-blue font-heading text-xl font-bold">
              <ShieldCheck size={20} className="text-domenion-gold" />
              <h2>3. Data Retention & Safeguards</h2>
            </div>
            <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
              All digital logs, surveillance records, and client files are stored on isolated, encrypted environments with strict multi-factor role-based access. Surveillance footage is retained strictly in accordance with contractual agreements and regulatory standards, after which it is sanitized using industry-standard digital shredding.
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <div className="flex items-center gap-2.5 text-domenion-blue font-heading text-xl font-bold">
              <FileText size={20} className="text-domenion-gold" />
              <h2>4. Third-Party Disclosures</h2>
            </div>
            <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
              Domenion Security does not sell, license, or monetize client data. Information is disclosed only when:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm sm:text-base pl-2">
              <li>Requested by legal authorities pursuant to a valid judicial warrant or court order.</li>
              <li>Necessary to prevent imminent bodily injury, physical threat, or catastrophic asset destruction.</li>
              <li>Explicitly authorized in writing by the client or facility risk manager.</li>
            </ul>
          </section>

          {/* Section 5 */}
          <section className="space-y-3 border-t border-gray-200 pt-6">
            <div className="flex items-center gap-2.5 text-domenion-blue font-heading text-xl font-bold">
              <Bell size={20} className="text-domenion-gold" />
              <h2>5. Contact Our Compliance Office</h2>
            </div>
            <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
              For inquiries regarding access to your records, surveillance retention schedules, or data privacy requests, reach out directly:
            </p>
            <div className="bg-domenion-blue/5 p-4 rounded-xl border border-domenion-gold/20 text-sm space-y-1">
              <p><strong>Domenion Security Services Inc.</strong></p>
              <p>Attention: Privacy & Compliance Office</p>
              <p>
                Email:{" "}
                <a
                  href="mailto:privacy@domenionsecurity.com"
                  className="text-domenion-blue font-semibold hover:underline"
                >
                  privacy@domenionsecurity.com
                </a>
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default PrivacyPolicy;