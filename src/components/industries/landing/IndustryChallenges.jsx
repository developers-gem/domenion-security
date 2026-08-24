import Reveal from "../../common/Reveal";
import "./IndustryChallenges.css";

const CHALLENGE_BLOCKS = [
  {
    num: "01",
    tag: "PEOPLE",
    title: "Protecting human lives & daily occupants.",
    desc: "From employees and healthcare patients to passengers, residents, and visitors, every environment requires specialized de-escalation, crowd control, and visitor screening protocols.",
  },
  {
    num: "02",
    tag: "PROPERTY",
    title: "Safeguarding physical assets & facilities.",
    desc: "Commercial real estate, data center servers, construction materials, and transportation fleets present unique physical entry vectors and perimeter vulnerabilities.",
  },
  {
    num: "03",
    tag: "OPERATIONS",
    title: "Ensuring uncompromised business continuity.",
    desc: "Security incidents cause costly operational downtime. Our post orders and 24/7 dispatch protocols maintain seamless operational momentum across all facilities.",
  },
];

export default function IndustryChallenges() {
  return (
    <section className="section ds-ind-challenges-section">
      <div className="container">
        {/* Section Header */}
        <div className="row align-items-end mb-5">
          <div className="col-lg-7">
            <Reveal direction="up">
              <span className="section-label">THE SECURITY CHALLENGE</span>
            </Reveal>

            <Reveal direction="up" delay={0.1}>
              <h2 className="section-title text-white">
                Every environment
                <br />
                <span>has its own risks.</span>
              </h2>
            </Reveal>
          </div>

          <div className="col-lg-5 mt-4 mt-lg-0">
            <Reveal direction="up" delay={0.2}>
              <p className="ds-challenges-intro-desc">
                Effective protection requires understanding the distinct vulnerabilities of people, property, and operational continuity within each specific sector.
              </p>
            </Reveal>
          </div>
        </div>

        {/* 3 Large Editorial Challenge Blocks */}
        <div className="row g-4">
          {CHALLENGE_BLOCKS.map((block, idx) => (
            <div key={block.tag} className="col-lg-4">
              <Reveal direction="up" delay={0.1 * idx}>
                <div className="ds-challenge-block-card">
                  <div className="ds-challenge-card-header">
                    <span className="ds-challenge-num">{block.num}</span>
                    <span className="ds-challenge-tag">{block.tag}</span>
                  </div>

                  <h3 className="ds-challenge-title">{block.title}</h3>
                  <p className="ds-challenge-desc">{block.desc}</p>
                  <div className="ds-challenge-gold-separator" />
                </div>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
