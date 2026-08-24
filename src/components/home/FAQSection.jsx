import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle, PhoneCall } from "lucide-react";
import Button from "../common/Button";
import Reveal from "../common/Reveal";
import { accordionCollapse } from "../common/motionVariants";
import "./FAQSection.css";

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
    <section className="section ds-faq-section">
      <div className="container">
        <div className="row g-5">
          {/* Left Column: Title & Prompt */}
          <div className="col-lg-5">
            <Reveal direction="up">
              <span className="section-label">FREQUENTLY ASKED QUESTIONS</span>
            </Reveal>

            <Reveal direction="up" delay={0.1}>
              <h2 className="section-title">
                Security questions,
                <br />
                <span>answered clearly.</span>
              </h2>
            </Reveal>

            <Reveal direction="up" delay={0.2}>
              <p className="section-description mt-3">
                Have specific operational questions about our security guard services,
                cyber defense, or emergency response capabilities? Find answers below or
                speak with our specialists.
              </p>
            </Reveal>

            <Reveal direction="up" delay={0.3}>
              <div className="ds-faq-consult-card mt-4">
                <div className="ds-faq-icon-badge">
                  <PhoneCall size={20} />
                </div>
                <div>
                  <strong>Need Immediate Assistance?</strong>
                  <p>Our security directors are available 24/7.</p>
                  <a href="tel:+16024384445" className="ds-faq-phone-link">
                    (602) 438-4445
                  </a>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Framer Motion Accordion */}
          <div className="col-lg-7">
            <div className="ds-accordion-wrap">
              {DEFAULT_FAQS.map((faq, index) => {
                const isOpen = openIndex === index;
                return (
                  <Reveal key={faq.id} direction="up" delay={index * 0.05}>
                    <div className={`ds-accordion-item ${isOpen ? "open" : ""}`}>
                      <button
                        type="button"
                        className="ds-accordion-header"
                        onClick={() => toggleAccordion(index)}
                        aria-expanded={isOpen}
                      >
                        <span className="ds-accordion-title">
                          {faq.question}
                        </span>
                        <ChevronDown
                          size={18}
                          className={`ds-accordion-chevron ${isOpen ? "open" : ""}`}
                        />
                      </button>

                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            className="ds-accordion-content"
                            variants={accordionCollapse}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                          >
                            <p>{faq.answer}</p>
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
