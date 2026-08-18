import "./Cities.css";
import { MapPin, ShieldCheck, ArrowRight } from "lucide-react";

const cities = [
  {
    city: "Los Angeles",
    state: "California",
    guards: "250+ Officers",
    response: "15 Min Response",
  },
  {
    city: "San Diego",
    state: "California",
    guards: "120+ Officers",
    response: "20 Min Response",
  },
  {
    city: "Dallas",
    state: "Texas",
    guards: "180+ Officers",
    response: "15 Min Response",
  },
  {
    city: "Houston",
    state: "Texas",
    guards: "210+ Officers",
    response: "20 Min Response",
  },
  {
    city: "Phoenix",
    state: "Arizona",
    guards: "140+ Officers",
    response: "18 Min Response",
  },
  {
    city: "Las Vegas",
    state: "Nevada",
    guards: "110+ Officers",
    response: "15 Min Response",
  },
];

function Cities() {
  return (
    <section className="cities-section section">

      <div className="container">

        <div className="text-center mb-5">

          <span className="section-label">
            CITIES WE SERVE
          </span>

          <h2 className="section-title">
            Local Security Teams Ready To Protect
          </h2>

          <p className="section-description mx-auto">
            Dedicated security professionals operating across major cities
            with rapid deployment and 24/7 emergency support.
          </p>

        </div>

        <div className="row g-4">

          {cities.map((city, index) => (

            <div className="col-lg-4 col-md-6" key={index}>

              <div className="city-card">

                <div className="city-top">

                  <div>

                    <h4>{city.city}</h4>

                    <span>{city.state}</span>

                  </div>

                  <MapPin size={28} />

                </div>

                <div className="city-info">

                  <div>

                    <ShieldCheck size={18} />

                    {city.guards}

                  </div>

                  <div>

                    <MapPin size={18} />

                    {city.response}

                  </div>

                </div>

                <button className="btn btn-danger w-100 mt-4">

                  Request Security

                  <ArrowRight
                    size={16}
                    className="ms-2"
                  />

                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default Cities;