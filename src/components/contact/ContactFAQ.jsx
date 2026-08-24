import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "../common/Reveal";
import "./ContactFAQ.css";

const FAQ_ITEMS = [
  {
    q: "What types of security services does Dominion Security provide?",
    a: "Dominion Security provides professional physical security guarding, mobile patrol services, executive protection, data center security, government security solutions, site clearance security, and comprehensive risk assessment services.",
  },
  {
    q: "How quickly can Dominion deploy security officers to a new site?",
    a: "We can deploy licensed security personnel rapidly depending on facility location and post order requirements. In urgent cases, emergency response security teams can be dispatched within 24 hours.",
  },
  {
    q: "What information should I provide when requesting a security quote?",
    a: "To help us prepare an accurate proposal, please provide your facility type, location, estimated coverage hours or shift structure, and any specific post requirements (e.g., access control, visitor logging, patrol requirements).",
  },
  {
    q: "Does Dominion Security tailor post orders for specific industry sectors?",
    a: "Yes. Every security deployment begins with an environmental threat assessment. We build customized post orders, visitor verification rules, and emergency escalation matrices tailored around your specific sector.",
  },
  {
    q: "How can I apply for a career or submit a resume to Dominion Security?",
    a: "You can view current career opportunities on our Careers page or submit a general security application directly through our online recruitment portal.",
  },
];

export default function ContactFAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="section ds-contact-faq-section">
      <div className="container">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-5">
          <Reveal direction="up">
            <span className="section-label">HELPFUL INFORMATION</span>
          </Reveal>

          <Reveal direction="up" delay={0.1}>
            <h2 className="section-title">
              Frequently asked
              <br />
              <span>questions & answers.</span>
            </h2>
          </Reveal>
        </div>

        {/* Clean Accordion List */}
        <div className="max-w-3xl mx-auto">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <Reveal key={idx} direction="up" delay={0.06 * idx}>
                <div className={`ds-faq-item ${isOpen ? "open" : ""}`}>
                  <button
                    type="button"
                    className="ds-faq-question-btn"
                    onClick={() => toggleFAQ(idx)}
                    aria-expanded={isOpen}
                  >
                    <span className="ds-faq-question-text">{item.q}</span>
                    <div className="ds-faq-toggle-icon">
                      {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                    </div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        className="ds-faq-answer-wrap"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <p className="ds-faq-answer-text">{item.a}</p>
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
