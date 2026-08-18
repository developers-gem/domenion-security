import "./OpenPositions.css";
import {
  MapPin,
  Briefcase,
  Clock3,
  DollarSign,
  ArrowRight,
} from "lucide-react";

const jobs = [
  {
    title: "Security Officer",
    department: "Operations",
    location: "California",
    type: "Full Time",
    salary: "$22 - $28/hr",
  },
  {
    title: "Mobile Patrol Officer",
    department: "Field Services",
    location: "Arizona",
    type: "Full Time",
    salary: "$24 - $30/hr",
  },
  {
    title: "Executive Protection Agent",
    department: "Executive Protection",
    location: "Texas",
    type: "Contract",
    salary: "$35 - $50/hr",
  },
  {
    title: "Control Room Operator",
    department: "Monitoring",
    location: "Remote",
    type: "Night Shift",
    salary: "$25 - $32/hr",
  },
];

function OpenPositions() {
  return (
    <section className="career-jobs section">

      <div className="container">

        <div className="row mb-5 align-items-end">

          <div className="col-lg-6">

            <span className="section-label">
              OPEN POSITIONS
            </span>

            <h2 className="section-title">
              Current Career Opportunities
            </h2>

          </div>

          <div className="col-lg-6">

            <p className="section-description">
              Explore available positions and become part of a trusted
              security team serving clients nationwide.
            </p>

          </div>

        </div>

        <div className="row g-4">

          {jobs.map((job, index) => (

            <div className="col-lg-6" key={index}>

              <div className="job-card">

                <div className="d-flex justify-content-between align-items-start flex-wrap">

                  <div>

                    <span className="job-department">

                      {job.department}

                    </span>

                    <h3>

                      {job.title}

                    </h3>

                  </div>

                  <span className="job-type">

                    {job.type}

                  </span>

                </div>

                <div className="job-meta">

                  <span>

                    <MapPin size={18}/>

                    {job.location}

                  </span>

                  <span>

                    <DollarSign size={18}/>

                    {job.salary}

                  </span>

                  <span>

                    <Briefcase size={18}/>

                    Security

                  </span>

                  <span>

                    <Clock3 size={18}/>

                    Immediate

                  </span>

                </div>

                <button className="btn btn-danger">

                  Apply Now

                  <ArrowRight size={18} className="ms-2"/>

                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default OpenPositions;