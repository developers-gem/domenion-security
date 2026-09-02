import { MapPin, ShieldCheck, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Reveal from "../../common/Reveal";

const CITIES_DATA = [
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
    <section className="py-20 sm:py-28 bg-white text-domenion-blue border-b border-neutral-border">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Reveal direction="up">
            <span className="inline-flex items-center gap-2 text-domenion-gold font-heading text-xs font-extrabold tracking-widest uppercase">CITIES WE SERVE</span>
          </Reveal>

          <Reveal direction="up" delay={0.1}>
            <h2 className="text-domenion-blue font-heading text-3xl sm:text-4xl font-extrabold tracking-tight mt-2 leading-tight">
              Local Security Teams <span className="text-domenion-gold">Ready To Protect</span>
            </h2>
          </Reveal>

          <Reveal direction="up" delay={0.2}>
            <p className="text-gray-600 font-sans text-base leading-relaxed mt-3">
              Dedicated security professionals operating across major cities
              with rapid deployment and 24/7 emergency support.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CITIES_DATA.map((city, index) => (
            <div key={city.city}>
              <Reveal direction="up" delay={0.05 * index}>
                <div className="bg-neutral-light border border-neutral-border hover:border-domenion-gold/50 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between h-full group">
                  <div>
                    <div className="flex items-center justify-between pb-4 mb-4 border-b border-neutral-border">
                      <div className="flex flex-col">
                        <h4 className="text-domenion-blue font-heading text-xl font-bold">{city.city}</h4>
                        <span className="text-gray-500 text-xs font-medium">{city.state}</span>
                      </div>
                      <div className="w-10 h-10 rounded-lg bg-domenion-blue/5 border border-domenion-gold/30 text-domenion-gold grid place-items-center group-hover:bg-domenion-gold group-hover:text-domenion-blue transition-colors">
                        <MapPin size={20} />
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-gray-600 mb-6">
                      <div className="flex items-center gap-1.5 font-heading font-semibold">
                        <ShieldCheck size={16} className="text-domenion-gold" />
                        <span>{city.guards}</span>
                      </div>
                      <div className="flex items-center gap-1.5 font-heading font-semibold">
                        <MapPin size={16} className="text-domenion-gold" />
                        <span>{city.response}</span>
                      </div>
                    </div>
                  </div>

                  <Link
                    to="/contact"
                    className="w-full inline-flex items-center justify-center gap-2 py-3 bg-domenion-blue text-white rounded-lg text-xs font-heading font-bold hover:bg-domenion-gold hover:text-domenion-blue transition-colors text-decoration-none"
                  >
                    <span>Request Security</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Cities;