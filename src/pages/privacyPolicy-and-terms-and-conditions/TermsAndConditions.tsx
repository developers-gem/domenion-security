import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight, ShieldAlert, Scale, AlertTriangle, FileCheck, CheckCircle2 } from "lucide-react";
import Reveal from "../../components/common/Reveal";


const TermsAndConditions: React.FC = () => {
  const lastUpdated: string = "September 2026";

  return (
    <div className="bg-domenion-blue/5 min-h-screen  text-domenion-blue">
      {/* Header Banner */}
      <section className="relative py-16 sm:py-20 bg-domenion-blue text-white overflow-hidden border-b border-domenion-gold/20">
        <div className="absolute inset-0 bg-gradient-to-r from-domenion-blue via-domenion-blue/95 to-domenion-blue/80" />
        <div className="relative z-10 max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal direction="fade">
            <div className="flex items-center justify-center gap-2 text-xs font-heading font-bold text-domenion-gold mb-4">
              <Link to="/" className="hover:underline">Home</Link>
              <ChevronRight size={13} />
              <span className="text-white">Terms & Conditions</span>
            </div>
          </Reveal>

          <Reveal direction="up" delay={0.1}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-domenion-gold/15 border border-domenion-gold/35 rounded-full text-domenion-gold font-heading text-xs font-extrabold tracking-widest mb-4">
              <Scale size={15} className="text-domenion-gold" />
              <span>LEGAL AGREEMENT & SERVICE POLICIES</span>
            </div>
          </Reveal>

          <Reveal direction="up" delay={0.2}>
            <h1 className="text-white font-heading text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 leading-tight">
              Terms & Conditions
            </h1>
          </Reveal>

          <Reveal direction="up" delay={0.3}>
            <p className="text-white/80 font-sans text-sm sm:text-base max-w-xl mx-auto">
              Standards, operational parameters, and contractual commitments governing Domenion Security deployments.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="bg-white rounded-2xl shadow-xl border border-domenion-gold/20 p-6 sm:p-10 space-y-10">
          <div className="border-b border-gray-200 pb-4 flex items-center justify-between">
            <span className="text-xs font-heading font-bold tracking-wider text-gray-500 uppercase">
              Revised: {lastUpdated}
            </span>
            <span className="text-xs font-heading font-bold text-domenion-gold uppercase">
              Standard Operating Protocols
            </span>
          </div>

          {/* Clause 1 */}
          <section className="space-y-3">
            <div className="flex items-center gap-2.5 text-domenion-blue font-heading text-xl font-bold">
              <FileCheck size={20} className="text-domenion-gold" />
              <h2>1. Acceptance of Terms</h2>
            </div>
            <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
              By accessing this website, requesting service assessments, or signing a Master Services Agreement (MSA) with Domenion Security, you agree to be bound by these Terms and Conditions along with applicable state and federal security compliance laws.
            </p>
          </section>

          {/* Clause 2 */}
          <section className="space-y-3">
            <div className="flex items-center gap-2.5 text-domenion-blue font-heading text-xl font-bold">
              <CheckCircle2 size={20} className="text-domenion-gold" />
              <h2>2. Scope of Services & Deployment</h2>
            </div>
            <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
              Domenion Security provides manned guarding, Construction Surveillance Technicians (CST), transportation logistics protection, and electronic surveillance. Specific operational duties, post orders, and response thresholds are governed by each client's individual Service Order.
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm sm:text-base pl-2">
              <li>Personnel perform protective duties according to predefined standing orders approved by the site authority.</li>
              <li>Any changes to post orders or tactical parameters must be submitted in writing with reasonable advance notice.</li>
            </ul>
          </section>

          {/* Clause 3 */}
          <section className="space-y-3">
            <div className="flex items-center gap-2.5 text-domenion-blue font-heading text-xl font-bold">
              <AlertTriangle size={20} className="text-domenion-gold" />
              <h2>3. Client Responsibilities & Safety</h2>
            </div>
            <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
              Clients must provide a safe working environment for all deployed officers and technicians:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm sm:text-base pl-2">
              <li>Ensuring physical structures, construction zones, and terminal facilities comply with OSHA and environmental safety standards.</li>
              <li>Providing clear authorizations, access credentials, and designated supervisory contacts during emergency responses.</li>
              <li>Disclosing known environmental hazards, structural defects, or specific pre-existing threat situations.</li>
            </ul>
          </section>

          {/* Clause 4 */}
          <section className="space-y-3">
            <div className="flex items-center gap-2.5 text-domenion-blue font-heading text-xl font-bold">
              <ShieldAlert size={20} className="text-domenion-gold" />
              <h2>4. Limitation of Liability</h2>
            </div>
            <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
              While Domenion Security maintains rigorous protocols and trained personnel to prevent losses, security services constitute a deterrent and risk mitigation measure rather than an insurance policy:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm sm:text-base pl-2">
              <li>Clients are required to maintain appropriate commercial property, liability, and casualty insurance.</li>
              <li>Domenion Security shall not be liable for losses caused by unforeseen labor disputes, acts of God, or third-party criminal actions beyond the reasonable control of post personnel.</li>
              <li>Aggregate liability is strictly limited to the service fees received under the specific service period as outlined in the MSA.</li>
            </ul>
          </section>

          {/* Clause 5 */}
          <section className="space-y-3 border-t border-gray-200 pt-6">
            <div className="flex items-center gap-2.5 text-domenion-blue font-heading text-xl font-bold">
              <Scale size={20} className="text-domenion-gold" />
              <h2>5. Governing Law & Dispute Resolution</h2>
            </div>
            <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
              These terms shall be governed by and construed under the laws of the jurisdiction where primary security operations are contracted. Any disputes arising out of these terms shall first be subject to good-faith mediation before formal arbitration proceedings.
            </p>
            <div className="bg-domenion-blue/5 p-4 rounded-xl border border-domenion-gold/20 text-sm space-y-1 mt-4">
              <p><strong>Legal Inquiries:</strong></p>
              <p>Domenion Security Legal Department</p>
              <p>
                Email:{" "}
                <a
                  href="mailto:legal@domenionsecurity.com"
                  className="text-domenion-blue font-semibold hover:underline"
                >
                  Domenionseurityllc@gmail.com
                </a>
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default TermsAndConditions;