import "./WhyChoose.css";
import {
  ShieldCheck,
  Clock3,
  Users,
  Cpu,
  MapPinned,
  BadgeCheck,
} from "lucide-react";

const features = [
  {
    icon: <ShieldCheck size={42} />,
    title: "Licensed Professionals",
    text: "Certified and highly trained security officers with extensive field experience.",
  },
  {
    icon: <Clock3 size={42} />,
    title: "24/7 Operations",
    text: "Continuous monitoring and rapid emergency response whenever required.",
  },
  {
    icon: <Users size={42} />,
    title: "Dedicated Teams",
    text: "Specialized security teams tailored to your industry and operational needs.",
  },
  {
    icon: <Cpu size={42} />,
    title: "Advanced Technology",
    text: "Integrated surveillance, AI monitoring and modern access control systems.",
  },
  {
    icon: <MapPinned size={42} />,
    title: "Nationwide Coverage",
    text: "Scalable security services across multiple cities and critical facilities.",
  },
  {
    icon: <BadgeCheck size={42} />,
    title: "Trusted Partner",
    text: "Long-term security partnerships built on trust, quality and compliance.",
  },
];

function WhyChoose() {
  return (
    <section className="why-section section">

      <div className="container">

        <div className="row mb-5">

          <div className="col-lg-7">

            <span className="section-label">
              WHY DOMENION
            </span>

            <h2 className="section-title text-white">
              Trusted Security
              <br />
              Beyond Expectations.
            </h2>

          </div>

          <div className="col-lg-5 d-flex align-items-end">

            <p className="why-text">
              We combine experienced personnel, modern technology,
              proactive planning and operational excellence to protect
              what matters most.
            </p>

          </div>

        </div>

        <div className="row g-4">

          {features.map((item, index) => (

            <div className="col-lg-4 col-md-6" key={index}>

              <div className="why-box h-100">

                <div className="why-icon">
                  {item.icon}
                </div>

                <h3>{item.title}</h3>

                <p>{item.text}</p>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default WhyChoose;