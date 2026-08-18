import "./Stats.css";
import CountUp from "react-countup";

const stats = [
  {
    number: 25,
    suffix: "+",
    title: "Years Experience",
  },
  {
    number: 1200,
    suffix: "+",
    title: "Professional Officers",
  },
  {
    number: 350,
    suffix: "+",
    title: "Enterprise Clients",
  },
  {
    number: 24,
    suffix: "/7",
    title: "Operations Center",
  },
];

function Stats() {
  return (
    <section className="stats-section">

      <div className="container">

        <div className="row">

          {stats.map((item, index) => (

            <div className="col-lg-3 col-md-6 mb-4" key={index}>

              <div className="stats-box text-center">

                <h2>

                  <CountUp
                    end={item.number}
                    duration={3}
                  />

                  {item.suffix}

                </h2>

                <p>{item.title}</p>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default Stats;