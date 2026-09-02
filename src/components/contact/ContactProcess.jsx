import Reveal from "../common/Reveal";

const PROCESS_STEPS = [
  {
    step: "01",
    title: "TELL US WHAT YOU NEED",
    desc: "Share your facility type, location, shift hours, and security priorities.",
  },
  {
    step: "02",
    title: "WE REVIEW REQUIREMENTS",
    desc: "Our security directors analyze post requirements, access vectors, and threat risks.",
  },
  {
    step: "03",
    title: "WE DISCUSS APPROACH",
    desc: "Connect with our operational leadership to review tailored post orders and staffing options.",
  },
  {
    step: "04",
    title: "PROTECTION DEPLOYMENT",
    desc: "Finalize security agreements and deploy licensed, trained security personnel to your site.",
  },
];

export default function ContactProcess() {
  return (
    <section className="py-20 sm:py-28 bg-domenion-blue text-white border-b border-domenion-gold/20">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12">
          <div className="lg:col-span-7">
            <Reveal direction="up">
              <span className="inline-flex items-center gap-2 text-domenion-gold font-heading text-xs font-extrabold tracking-widest uppercase">WHAT HAPPENS NEXT</span>
            </Reveal>

            <Reveal direction="up" delay={0.1}>
              <h2 className="text-white font-heading text-3xl sm:text-4xl font-extrabold tracking-tight mt-2 leading-tight">
                A simple path from <span className="text-domenion-gold">conversation to protection.</span>
              </h2>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal direction="up" delay={0.2}>
              <p className="text-white/80 font-sans text-base sm:text-lg leading-relaxed">
                From initial request to active guard deployment, our team ensures a seamless and transparent onboarding process.
              </p>
            </Reveal>
          </div>
        </div>

        {/* 4 Step Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PROCESS_STEPS.map((item, idx) => (
            <div key={item.step}>
              <Reveal direction="up" delay={0.08 * idx}>
                <div className="bg-white/5 border border-domenion-gold/25 rounded-xl p-6 hover:border-domenion-gold hover:bg-white/10 transition-all duration-300 flex flex-col h-full group">
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
                    <span className="text-domenion-gold font-heading text-2xl font-extrabold">{item.step}</span>
                  </div>

                  <h3 className="text-white font-heading text-base font-bold mb-2 uppercase">{item.title}</h3>
                  <p className="text-white/75 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

