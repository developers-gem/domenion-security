import { useState } from "react";
import { MapPin, ArrowRight } from "lucide-react";
import Reveal from "../../common/Reveal";

const ALL_STATES = [
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
  const [searchTerm, setSearchTerm] = useState("");

  const filteredStates = ALL_STATES.filter((st) =>
    st.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="py-20 sm:py-28 bg-neutral-light text-domenion-blue border-b border-neutral-border">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12">
          <div className="lg:col-span-7">
            <Reveal direction="up">
              <span className="inline-flex items-center gap-2 text-domenion-gold font-heading text-xs font-extrabold tracking-widest uppercase">50-STATE COVERAGE</span>
            </Reveal>

            <Reveal direction="up" delay={0.1}>
              <h2 className="text-domenion-blue font-heading text-3xl sm:text-4xl font-extrabold tracking-tight mt-2 leading-tight">
                Licensed, bonded, and providing professional security coverage across all 50 states.
              </h2>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal direction="up" delay={0.2}>
              <input
                type="text"
                className="w-full px-4 py-3 bg-white border border-neutral-border rounded-xl text-domenion-blue text-sm focus:outline-none focus:border-domenion-gold transition-colors placeholder:text-gray-400"
                placeholder="Search State..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Reveal>
          </div>
        </div>

        {/* States Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredStates.map((state, index) => (
            <div key={state.name}>
              <Reveal direction="up" delay={0.04 * index}>
                <div className="bg-white border border-neutral-border hover:border-domenion-gold/50 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-start group">
                  <div className="w-10 h-10 rounded-lg bg-domenion-blue/5 border border-domenion-gold/30 text-domenion-gold grid place-items-center mb-4 group-hover:bg-domenion-gold group-hover:text-domenion-blue transition-colors">
                    <MapPin size={20} />
                  </div>

                  <h4 className="text-domenion-blue font-heading text-lg font-bold mb-1">{state.name}</h4>
                  <p className="text-gray-500 text-xs mb-4">{state.cities} Cities Covered</p>

                  <button className="inline-flex items-center gap-2 px-4 py-2 bg-domenion-blue/5 text-domenion-blue rounded-lg text-xs font-heading font-bold hover:bg-domenion-gold hover:text-domenion-blue transition-colors cursor-pointer">
                    <span>View Coverage</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default States;