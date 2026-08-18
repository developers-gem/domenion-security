import "./ApplicationForm.css";
import { UploadCloud, Send } from "lucide-react";

function ApplicationForm() {
  return (
    <section className="application-form section">

      <div className="container">

        <div className="row align-items-center g-5">

          <div className="col-lg-5">

            <span className="section-label">
              APPLY TODAY
            </span>

            <h2 className="section-title">
              Start Your Security Career
            </h2>

            <p className="section-description">

              Complete the application below and our recruitment team
              will contact qualified candidates shortly.

            </p>

            <img
              src="/images/careers/apply.jpg"
              alt="Apply"
              className="img-fluid rounded mt-4"
            />

          </div>

          <div className="col-lg-7">

            <form className="career-form">

              <div className="row g-4">

                <div className="col-md-6">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Full Name"
                  />
                </div>

                <div className="col-md-6">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email Address"
                  />
                </div>

                <div className="col-md-6">
                  <input
                    type="tel"
                    className="form-control"
                    placeholder="Phone Number"
                  />
                </div>

                <div className="col-md-6">

                  <select className="form-select">

                    <option>
                      Select Position
                    </option>

                    <option>
                      Security Officer
                    </option>

                    <option>
                      Mobile Patrol Officer
                    </option>

                    <option>
                      Executive Protection
                    </option>

                    <option>
                      Control Room Operator
                    </option>

                  </select>

                </div>

                <div className="col-md-6">

                  <input
                    type="text"
                    className="form-control"
                    placeholder="Preferred Location"
                  />

                </div>

                <div className="col-md-6">

                  <input
                    type="text"
                    className="form-control"
                    placeholder="Years of Experience"
                  />

                </div>

                <div className="col-12">

                  <textarea
                    rows="5"
                    className="form-control"
                    placeholder="Tell us about yourself..."
                  ></textarea>

                </div>

                <div className="col-12">

                  <label className="upload-box">

                    <UploadCloud size={26} />

                    <span>
                      Upload Resume (PDF / DOC)
                    </span>

                    <input
                      type="file"
                      hidden
                    />

                  </label>

                </div>

                <div className="col-12">

                  <button className="btn btn-danger btn-lg">

                    Submit Application

                    <Send size={18} className="ms-2"/>

                  </button>

                </div>

              </div>

            </form>

          </div>

        </div>

      </div>

    </section>
  );
}

export default ApplicationForm;