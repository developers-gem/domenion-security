import "./Process.css";
import {
  ClipboardCheck,
  FileSearch,
  Shield,
  RadioTower,
  FileText,
  TrendingUp,
} from "lucide-react";

const process = [
  {
    icon: <ClipboardCheck size={34} />,
    number: "01",
    title: "Risk Assessment",
    text: "Understanding your security challenges and identifying vulnerabilities.",
  },
  {
    icon: <FileSearch size={34} />,
    number: "02",
    title: "Security Planning",
    text: "Creating a customized security strategy for your organization.",
  },
  {
    icon: <Shield size={34} />,
    number: "03",
    title: "Deployment",
    text: "Deploying highly trained officers and advanced security technology.",
  },
  {
    icon: <RadioTower size={34} />,
    number: "04",
    title: "24/7 Monitoring",
    text: "Continuous surveillance, patrols and rapid emergency response.",
  },
  {
    icon: <FileText size={34} />,
    number: "05",
    title: "Incident Reports",
    text: "Real-time reporting with detailed documentation and analytics.",
  },
  {
    icon: <TrendingUp size={34} />,
    number: "06",
    title: "Continuous Improvement",
    text: "Regular audits and strategy updates to improve security performance.",
  },
];

function Process() {
  return (
    <section className="process-section section">

      <div className="container">

        <div className="text-center mb-5">

          <span className="section-label">
            OUR PROCESS
          </span>

          <h2 className="section-title">
            How We Secure
            <br />
            Your Business
          </h2>

        </div>

        <div className="row g-4">

          {process.map((item) => (

            <div className="col-lg-4 col-md-6" key={item.number}>

              <div className="process-card">

                <div className="process-number">
                  {item.number}
                </div>

                <div className="process-icon">
                  {item.icon}
                </div>

                <h3>{item.title}</h3>

                <p>{item.text}</p>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default Process;