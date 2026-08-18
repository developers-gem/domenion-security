import "./States.css";
import { MapPin, ArrowRight } from "lucide-react";

const states = [
  { name: "California", cities: 18 },
  { name: "Texas", cities: 14 },
  { name: "Arizona", cities: 9 },
  { name: "Nevada", cities: 7 },
  { name: "Florida", cities: 12 },
  { name: "New York", cities: 10 },
  { name: "Colorado", cities: 6 },
  { name: "Washington", cities: 8 },
  { name: "Illinois", cities: 9 },
  { name: "Georgia", cities: 7 },
  { name: "Virginia", cities: 6 },
  { name: "North Carolina", cities: 8 },
];

function States() {
  return (
    <section className="states-section section">

      <div className="container">

        <div className="row mb-5 align-items-end">

          <div className="col-lg-6">

            <span className="section-label">
              STATES WE SERVE
            </span>

            <h2 className="section-title">
              Security Coverage Across Multiple States
            </h2>

          </div>

          <div className="col-lg-6">

            <input
              type="text"
              className="form-control state-search"
              placeholder="Search State..."
            />

          </div>

        </div>

        <div className="row g-4">

          {states.map((state, index) => (

            <div className="col-xl-3 col-lg-4 col-md-6" key={index}>

              <div className="state-card">

                <div className="state-icon">

                  <MapPin size={28} />

                </div>

                <h4>{state.name}</h4>

                <p>

                  {state.cities} Cities Covered

                </p>

                <button className="btn btn-outline-danger">

                  View Coverage

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

export default States;