import Reveal from "../common/Reveal";
import "./ContactProcess.css";

const PROCESS_STEPS = [
  {
    step: "01",
    title: "TELL US WHAT YOU NEED",
    desc: "Share your facility type, location, shift hours, and security priorities.",
  },
  {
    step: "02",
    title: "WE REVIEW REQUIREMENTS",
    desc: "Our security directors analyze post requirements, access vectors, and threat risks.",
  },
  {
    step: "03",
    title: "WE DISCUSS APPROACH",
    desc: "Connect with our operational leadership to review tailored post orders and staffing options.",
  },
  {
    step: "04",
    title: "PROTECTION DEPLOYMENT",
    desc: "Finalize security agreements and deploy licensed, trained security personnel to your site.",
  },
];

export default function ContactProcess() {
  return (
    <section className="section ds-contact-proc-section">
      <div className="container">
        {/* Section Header */}
        <div className="row align-items-end mb-5">
          <div className="col-lg-7">
            <Reveal direction="up">
              <span className="section-label">WHAT HAPPENS NEXT</span>
            </Reveal>

            <Reveal direction="up" delay={0.1}>
              <h2 className="section-title text-white">
                A simple path from
                <br />
                <span>conversation to protection.</span>
              </h2>
            </Reveal>
          </div>

          <div className="col-lg-5 mt-4 mt-lg-0">
            <Reveal direction="up" delay={0.2}>
              <p className="ds-cproc-intro-desc">
                From initial request to active guard deployment, our team ensures a seamless and transparent onboarding process.
              </p>
            </Reveal>
          </div>
        </div>

        {/* 4 Horizontal Step Cards with Gold Connecting Line */}
        <div className="ds-cproc-timeline-wrap">
          <div className="ds-cproc-gold-line" />

          <div className="row g-4">
            {PROCESS_STEPS.map((item, idx) => (
              <div key={item.step} className="col-md-6 col-lg-3">
                <Reveal direction="up" delay={0.08 * idx}>
                  <div className="ds-cproc-step-card">
                    <div className="ds-cproc-step-num-badge">
                      <span>{item.step}</span>
                    </div>

                    <h3 className="ds-cproc-step-title">{item.title}</h3>
                    <p className="ds-cproc-step-desc">{item.desc}</p>
                  </div>
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
