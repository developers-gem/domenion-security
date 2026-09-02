import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, PhoneCall } from "lucide-react";
import Reveal from "../common/Reveal";
import { accordionCollapse } from "../common/motionVariants";

const DEFAULT_FAQS = [
  {
    id: 1,
    question: "What security services does Dominion Security provide?",
    answer:
      "Dominion Security provides comprehensive physical security officers (armed and unarmed), data center critical infrastructure defense, enterprise cybersecurity monitoring, mobile patrols, executive protection, and security risk consulting.",
  },
  {
    id: 2,
    question: "How quickly can Dominion Security deploy security officers?",
    answer:
      "We offer rapid operational deployment capabilities. For standard commercial or residential property requirements, deployment can occur within 24-48 hours. Emergency response units can be mobilized immediately.",
  },
  {
    id: 3,
    question: "Are your security officers licensed and background checked?",
    answer:
      "Yes. 100% of Dominion Security officers undergo rigorous background verification, state security licensing, drug screening, and continuous operational training in de-escalation, emergency response, and access control.",
  },
  {
    id: 4,
    question: "How do you handle custom security plans for multi-site organizations?",
    answer:
      "Our security consultants perform a detailed threat assessment of each facility. We then build custom post-orders, staffing schedules, digital incident reporting, and centralized oversight for seamless multi-location operations.",
  },
  {
    id: 5,
    question: "Can I request a custom security quote for my business?",
    answer:
      "Absolutely. You can fill out our online Security Consultation form or call our security team directly at (602) 438-4445. We will evaluate your operational requirements and provide a tailored security proposal.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleAccordion = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="py-20 sm:py-28 bg-neutral-light text-domenion-blue border-b border-neutral-border">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Title & Prompt */}
          <div className="lg:col-span-5">
            <div className="flex flex-col">
              <Reveal direction="up">
                <span className="inline-flex items-center gap-2 text-domenion-gold font-heading text-xs font-extrabold tracking-widest uppercase">FREQUENTLY ASKED QUESTIONS</span>
              </Reveal>

              <Reveal direction="up" delay={0.1}>
                <h2 className="text-domenion-blue font-heading text-3xl sm:text-4xl font-extrabold tracking-tight mt-2">
                  Security questions, <span className="text-domenion-gold">answered clearly.</span>
                </h2>
              </Reveal>

              <Reveal direction="up" delay={0.2}>
                <p className="text-gray-600 font-sans text-base sm:text-lg leading-relaxed mt-4">
                  Have specific operational questions about our security guard services,
                  cyber defense, or emergency response capabilities? Find answers below or
                  speak with our specialists.
                </p>
              </Reveal>

              <Reveal direction="up" delay={0.3}>
                <div className="mt-8 p-6 rounded-xl bg-white border border-neutral-border shadow-sm flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-domenion-blue/5 border border-domenion-gold/30 text-domenion-gold grid place-items-center flex-shrink-0">
                    <PhoneCall size={22} />
                  </div>
                  <div className="flex flex-col">
                    <strong className="text-domenion-blue font-heading text-base font-bold">Need Immediate Assistance?</strong>
                    <p className="text-gray-500 text-xs sm:text-sm mt-0.5">Our security directors are available 24/7.</p>
                    <a href="tel:+16024384445" className="text-domenion-gold font-heading text-base font-extrabold mt-1 hover:underline">
                      (602) 438-4445
                    </a>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Right Column: Framer Motion Accordion */}
          <div className="lg:col-span-7">
            <div className="flex flex-col">
              {DEFAULT_FAQS.map((faq, index) => {
                const isOpen = openIndex === index;
                return (
                  <Reveal key={faq.id} direction="up" delay={index * 0.05}>
                    <div className={`bg-white border rounded-xl mb-4 overflow-hidden shadow-sm transition-all duration-200 ${
                      isOpen ? "border-domenion-gold/60 shadow-md" : "border-neutral-border hover:border-domenion-gold/30"
                    }`}>
                      <button
                        type="button"
                        className="w-full p-5 text-left flex items-center justify-between gap-4 font-heading font-bold text-base text-domenion-blue hover:text-domenion-gold cursor-pointer"
                        onClick={() => toggleAccordion(index)}
                        aria-expanded={isOpen}
                      >
                        <span className="flex-1">
                          {faq.question}
                        </span>
                        <ChevronDown
                          size={18}
                          className={`transition-transform duration-200 flex-shrink-0 ${
                            isOpen ? "rotate-180 text-domenion-gold" : "text-gray-400"
                          }`}
                        />
                      </button>

                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            className="px-5 pb-5 pt-0 overflow-hidden"
                            variants={accordionCollapse}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                          >
                            <p className="text-gray-600 text-sm leading-relaxed border-t border-neutral-border/60 pt-3">{faq.answer}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

