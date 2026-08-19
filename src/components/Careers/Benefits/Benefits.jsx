import "./Benefits.css";
import {
  CheckCircle2,
  HeartPulse,
  GraduationCap,
  CalendarClock,
  Trophy,
  BriefcaseBusiness,
} from "lucide-react";

const benefits = [
  {
    icon: <HeartPulse size={26} />,
    title: "Health & Wellness",
    text: "Comprehensive health and wellness support for employees."
  },
  {
    icon: <GraduationCap size={26} />,
    title: "Paid Training",
    text: "Professional certifications and continuous skill development."
  },
  {
    icon: <CalendarClock size={26} />,
    title: "Flexible Scheduling",
    text: "Day, night and weekend shifts based on availability."
  },
  {
    icon: <BriefcaseBusiness size={26} />,
    title: "Career Growth",
    text: "Clear promotion path into leadership and management roles."
  },
  {
    icon: <Trophy size={26} />,
    title: "Employee Recognition",
    text: "Performance awards and recognition programs."
  },
  {
    icon: <CheckCircle2 size={26} />,
    title: "Job Stability",
    text: "Long-term opportunities with nationwide contracts."
  }
];

function Benefits() {
  return (
    <section className="career-benefits section">

      <div className="container">

        <div className="row align-items-center g-5">

          <div className="col-lg-6">

            <div className="benefits-image">

              <img
                src="/images/careers/employee-benefits.jpg"
                alt="Employee Benefits"
              />

              <div className="benefit-badge">

                <h2>25+</h2>

                <span>Years of Excellence</span>

              </div>

            </div>

          </div>

          <div className="col-lg-6">

            <span className="section-label">
              EMPLOYEE BENEFITS
            </span>

            <h2 className="section-title">

              We Invest
              In Our People

            </h2>

            <p className="section-description mb-5">

              We believe our people are our greatest strength.
              That's why we provide competitive benefits,
              professional development and long-term career
              opportunities.

            </p>

            <div className="row g-4">

              {benefits.map((item, index) => (

                <div className="col-md-6" key={index}>

                  <div className="benefit-item">

                    <div className="benefit-icon">

                      {item.icon}

                    </div>

                    <div>

                      <h5>{item.title}</h5>

                      <p>{item.text}</p>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Benefits;