import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "../common/Reveal";

const FAQ_ITEMS = [
  {
    q: "What types of security services does Domenion Security provide?",
    a: "Domenion Security provides professional physical security guarding, mobile patrol services, executive protection, data center security, government security solutions, site clearance security, and comprehensive risk assessment services.",
  },
  {
    q: "How quickly can Domenion deploy security officers to a new site?",
    a: "We can deploy licensed security personnel rapidly depending on facility location and post order requirements. In urgent cases, emergency response security teams can be dispatched within 24 hours.",
  },
  {
    q: "What information should I provide when requesting a security quote?",
    a: "To help us prepare an accurate proposal, please provide your facility type, location, estimated coverage hours or shift structure, and any specific post requirements (e.g., access control, visitor logging, patrol requirements).",
  },
  {
    q: "Does Domenion Security tailor post orders for specific industry sectors?",
    a: "Yes. Every security deployment begins with an environmental threat assessment. We build customized post orders, visitor verification rules, and emergency escalation matrices tailored around your specific sector.",
  },
  {
    q: "How can I apply for a career or submit a resume to Domenion Security?",
    a: "You can view current career opportunities on our Careers page or submit a general security application directly through our online recruitment portal.",
  },
];

export default function ContactFAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-20 sm:py-28 bg-white text-domenion-blue border-b border-neutral-border">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Reveal direction="up">
            <span className="inline-flex items-center gap-2 text-domenion-gold font-heading text-xs font-extrabold tracking-widest uppercase">HELPFUL INFORMATION</span>
          </Reveal>

          <Reveal direction="up" delay={0.1}>
            <h2 className="text-domenion-blue font-heading text-3xl sm:text-4xl font-extrabold tracking-tight mt-2 leading-tight">
              Frequently asked <span className="text-domenion-gold">questions & answers.</span>
            </h2>
          </Reveal>
        </div>

        {/* Clean Accordion List */}
        <div className="max-w-3xl mx-auto space-y-4">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <Reveal key={idx} direction="up" delay={0.06 * idx}>
                <div className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                  isOpen ? "bg-neutral-light border-domenion-gold/50 shadow-md" : "bg-white border-neutral-border hover:border-domenion-gold/30"
                }`}>
                  <button
                    type="button"
                    className="w-full flex items-center justify-between p-6 text-left cursor-pointer focus:outline-none"
                    onClick={() => toggleFAQ(idx)}
                    aria-expanded={isOpen}
                  >
                    <span className="text-domenion-blue font-heading text-base font-bold pr-4">{item.q}</span>
                    <div className="w-8 h-8 rounded-lg bg-domenion-blue/5 border border-domenion-gold/30 text-domenion-gold grid place-items-center flex-shrink-0">
                      {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                    </div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <div className="px-6 pb-6 text-gray-600 text-sm leading-relaxed border-t border-neutral-border/60 pt-4">
                          <p>{item.a}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

