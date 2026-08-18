import "./Training.css";
import {
  ShieldCheck,
  HeartPulse,
  Radio,
  BadgeCheck,
  Siren,
  BookOpen,
} from "lucide-react";

const certifications = [
  {
    icon: <ShieldCheck size={30} />,
    title: "Security Officer Training",
    desc: "Comprehensive security officer certification and field readiness."
  },
  {
    icon: <HeartPulse size={30} />,
    title: "CPR & First Aid",
    desc: "Emergency medical response and first aid certification."
  },
  {
    icon: <Radio size={30} />,
    title: "Communication Skills",
    desc: "Radio communication and incident reporting procedures."
  },
  {
    icon: <BadgeCheck size={30} />,
    title: "Armed Guard License",
    desc: "State-approved armed security licensing and compliance."
  },
  {
    icon: <Siren size={30} />,
    title: "Emergency Response",
    desc: "Fire safety, evacuation and emergency management training."
  },
  {
    icon: <BookOpen size={30} />,
    title: "Leadership Development",
    desc: "Supervisor and management training for career advancement."
  },
];

function Training() {
  return (
    <section className="training-section section">

      <div className="container">

        <div className="row align-items-center mb-5">

          <div className="col-lg-6">

            <span className="section-label">
              TRAINING PROGRAMS
            </span>

            <h2 className="section-title">
              Professional Training &
              Certifications
            </h2>

          </div>

          <div className="col-lg-6">

            <p className="section-description">
              Every team member receives structured training to ensure
              professionalism, safety, compliance and exceptional service
              delivery.
            </p>

          </div>

        </div>

        <div className="row g-4">

          {certifications.map((item, index) => (

            <div className="col-lg-4 col-md-6" key={index}>

              <div className="training-card">

                <div className="training-icon">
                  {item.icon}
                </div>

                <h4>{item.title}</h4>

                <p>{item.desc}</p>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default Training;