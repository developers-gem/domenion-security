import "./Industries.css";
import { ArrowUpRight } from "lucide-react";

const industries = [
  {
    title: "Government",
    image: "/images/industries/government.jpg",
  },
  {
    title: "Healthcare",
    image: "/images/industries/healthcare.jpg",
  },
  {
    title: "Commercial",
    image: "/images/industries/commercial.jpg",
  },
  {
    title: "Data Centers",
    image: "/images/industries/datacenter.jpg",
  },
  {
    title: "Airports",
    image: "/images/industries/airport.jpg",
  },
  {
    title: "Construction",
    image: "/images/industries/construction.jpg",
  },
];

function Industries() {
  return (
    <section className="industries-section section">

      <div className="container">

        <div className="row mb-5">

          <div className="col-lg-7">

            <span className="section-label">
              INDUSTRIES WE SERVE
            </span>

            <h2 className="section-title">
              Security Tailored
              <br />
              For Every Industry
            </h2>

          </div>

          <div className="col-lg-5 d-flex align-items-end">

            <p className="section-description">
              Every industry has unique security challenges. We deliver
              customized protection strategies designed around operational,
              regulatory and physical risks.
            </p>

          </div>

        </div>

        <div className="row g-4">

          {industries.map((item, index) => (

            <div className="col-lg-4 col-md-6" key={index}>

              <div className="industry-card">

                <img
                  src={item.image}
                  alt={item.title}
                />

                <div className="industry-overlay"></div>

                <div className="industry-content">

                  <h3>{item.title}</h3>

                  <button>

                    Learn More

                    <ArrowUpRight size={18}/>

                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default Industries;