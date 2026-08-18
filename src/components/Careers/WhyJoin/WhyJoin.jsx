import "./WhyJoin.css";
import {
  BadgeDollarSign,
  GraduationCap,
  ShieldCheck,
  Users,
} from "lucide-react";

const benefits = [
  {
    icon: <BadgeDollarSign size={42} />,
    title: "Competitive Pay",
    text: "Industry-leading salaries with overtime opportunities and performance incentives.",
  },
  {
    icon: <GraduationCap size={42} />,
    title: "Professional Training",
    text: "Continuous learning, certifications and career development programs.",
  },
  {
    icon: <ShieldCheck size={42} />,
    title: "Career Growth",
    text: "Clear promotion paths from Security Officer to Site Supervisor and Management.",
  },
  {
    icon: <Users size={42} />,
    title: "Strong Team Culture",
    text: "Join experienced professionals committed to excellence and teamwork.",
  },
];

function WhyJoin() {
  return (
    <section className="why-join section">

      <div className="container">

        <div className="row mb-5 align-items-end">

          <div className="col-lg-6">

            <span className="section-label">
              WHY JOIN US
            </span>

            <h2 className="section-title">
              Build A Career,
              <br />
              Not Just A Job.
            </h2>

          </div>

          <div className="col-lg-6">

            <p className="section-description">
              At Domenion Security, you'll work alongside experienced professionals,
              receive continuous training and enjoy real opportunities for career growth.
            </p>

          </div>

        </div>

        <div className="row g-4">

          {benefits.map((item, index) => (

            <div className="col-lg-3 col-md-6" key={index}>

              <div className="career-card">

                <div className="career-icon">
                  {item.icon}
                </div>

                <h4>{item.title}</h4>

                <p>{item.text}</p>

              </div>

            </div>

          ))}

        </div>

        <div className="row mt-5 g-4">

          <div className="col-md-3">

            <div className="career-stat">
              <h2>1200+</h2>
              <span>Security Professionals</span>
            </div>

          </div>

          <div className="col-md-3">

            <div className="career-stat">
              <h2>25+</h2>
              <span>Years Experience</span>
            </div>

          </div>

          <div className="col-md-3">

            <div className="career-stat">
              <h2>500+</h2>
              <span>Active Clients</span>
            </div>

          </div>

          <div className="col-md-3">

            <div className="career-stat">
              <h2>24/7</h2>
              <span>Operations</span>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default WhyJoin;