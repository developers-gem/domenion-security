import "./HiringProcess.css";
import {
  FileText,
  ClipboardCheck,
  Users,
  ShieldCheck,
  GraduationCap,
  BadgeCheck,
} from "lucide-react";

const process = [
  {
    icon: <FileText size={32} />,
    step: "01",
    title: "Apply Online",
    text: "Submit your application and upload your resume through our secure careers portal.",
  },
  {
    icon: <ClipboardCheck size={32} />,
    step: "02",
    title: "Application Review",
    text: "Our recruitment team carefully reviews your qualifications and experience.",
  },
  {
    icon: <Users size={32} />,
    step: "03",
    title: "Interview",
    text: "Meet with our hiring managers to discuss your skills and career goals.",
  },
  {
    icon: <ShieldCheck size={32} />,
    step: "04",
    title: "Background Check",
    text: "Verification and screening are completed before employment.",
  },
  {
    icon: <GraduationCap size={32} />,
    step: "05",
    title: "Training",
    text: "Receive professional onboarding and security training before deployment.",
  },
  {
    icon: <BadgeCheck size={32} />,
    step: "06",
    title: "Start Your Career",
    text: "Join our team and begin protecting clients with confidence.",
  },
];

function HiringProcess() {
  return (
    <section className="hiring-process section">

      <div className="container">

        <div className="text-center mb-5">

          <span className="section-label">
            HIRING PROCESS
          </span>

          <h2 className="section-title">
            Your Journey Starts Here
          </h2>

          <p className="section-description mx-auto">
            Our recruitment process is designed to be transparent,
            efficient and focused on finding the right professionals.
          </p>

        </div>

        <div className="row g-4">

          {process.map((item, index) => (

            <div className="col-xl-2 col-lg-4 col-md-6" key={index}>

              <div className="process-card">

                <span className="process-step">
                  {item.step}
                </span>

                <div className="process-icon">
                  {item.icon}
                </div>

                <h4>{item.title}</h4>

                <p>{item.text}</p>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default HiringProcess;