import "./Features.css";

function Features({ service }) {
  return (
    <section className="service-features section">

      <div className="container">

        <div className="text-center mb-5">

          <span className="section-label">
            CORE FEATURES
          </span>

          <h2 className="section-title">
            {service.featuresTitle}
          </h2>

          <p className="section-description mx-auto">
            {service.featuresDescription}
          </p>

        </div>

        <div className="row g-4">

          {service.features.map((feature, index) => {

            const Icon = feature.icon;

            return (

              <div
                className="col-lg-4 col-md-6"
                key={index}
              >

                <div className="feature-card">

                  <div className="feature-icon">

                    <Icon size={38} />

                  </div>

                  <h4>
                    {feature.title}
                  </h4>

                  <p>
                    {feature.text}
                  </p>

                </div>

              </div>

            );

          })}

        </div>

      </div>

    </section>
  );
}

export default Features;