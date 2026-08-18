import "./Coverage.css";
import {
  ShieldCheck,
  Users,
  Building2,
  Clock3,
  MapPin,
} from "lucide-react";

const stats = [
  {
    icon: <Building2 size={34} />,
    number: "500+",
    title: "Protected Sites",
  },
  {
    icon: <Users size={34} />,
    number: "1200+",
    title: "Security Officers",
  },
  {
    icon: <Clock3 size={34} />,
    number: "24/7",
    title: "Operations",
  },
  {
    icon: <ShieldCheck size={34} />,
    number: "25+",
    title: "Years Experience",
  },
];

const locations = [
 "Government",
"Healthcare",
"Commercial",
"Retail",
"Warehousing",
"Data Centers",
"Airports",
"Transportation",
"Residential",
"Construction",

];

function Coverage() {
  return (
    <section className="coverage-section section">

      <div className="container">

        <div className="text-center mb-5">

          <span className="section-label">
            OUR COVERAGE
          </span>

          <h2 className="section-title text-black">
            Protecting Critical Industries
            Across Every Sector
          </h2>

        </div>

        <div className="row align-items-center g-5">

          <div className="col-lg-7">

            <div className="coverage-map">

              <img
                src="/images/industries/world-map.png"
                alt="Coverage Map"
              />

              <div className="pin pin1">
                <MapPin size={18}/>
              </div>

              <div className="pin pin2">
                <MapPin size={18}/>
              </div>

              <div className="pin pin3">
                <MapPin size={18}/>
              </div>

              <div className="pin pin4">
                <MapPin size={18}/>
              </div>

            </div>

          </div>

          <div className="col-lg-5">

            <div className="coverage-list">

              {locations.map((item,index)=>(

                <div className="coverage-item" key={index}>

                  <MapPin size={18}/>

                  {item}

                </div>

              ))}

            </div>

          </div>

        </div>

        <div className="row mt-5 g-4">

          {stats.map((item,index)=>(

            <div className="col-lg-3 col-md-6" key={index}>

              <div className="coverage-card">

                {item.icon}

                <h3>{item.number}</h3>

                <p>{item.title}</p>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default Coverage;