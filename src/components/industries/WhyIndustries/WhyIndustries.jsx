import "./WhyIndustries.css";
import {
  ShieldCheck,
  Clock3,
  FileCheck,
  MonitorSmartphone,
} from "lucide-react";

const features = [
  {
    icon: <ShieldCheck size={42} />,
    title: "Industry-Specific Protection",
    text: "Every industry receives customized security plans based on operational risks and compliance requirements.",
  },
  {
    icon: <Clock3 size={42} />,
    title: "24/7 Monitoring",
    text: "Round-the-clock surveillance, patrols and rapid incident response from experienced teams.",
  },
  {
    icon: <FileCheck size={42} />,
    title: "Compliance & Reporting",
    text: "Detailed reporting, audit trails and security documentation for complete transparency.",
  },
  {
    icon: <MonitorSmartphone size={42} />,
    title: "Advanced Technology",
    text: "AI surveillance, access control, visitor management and integrated security systems.",
  },
];

function WhyIndustries() {
  return (
    <section className="why-industries section">

      <div className="container">

        <div className="row mb-5">

          <div className="col-lg-6">

            <span className="section-label">
              WHY CHOOSE US
            </span>

            <h2 className="section-title">
              Security Built
              <br />
              Around Your Industry
            </h2>

          </div>

          <div className="col-lg-6 d-flex align-items-end">

            <p className="section-description">
              We understand that every industry faces unique security
              challenges. Our tailored solutions ensure safety,
              compliance and operational continuity.
            </p>

          </div>

        </div>

        <div className="row gy-4">

          {features.map((item, index) => (

            <div className="col-lg-6" key={index}>

              <div className="industry-feature">

                <div className="feature-icon">
                  {item.icon}
                </div>

                <div>

                  <h3>{item.title}</h3>

                  <p>{item.text}</p>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default WhyIndustries;