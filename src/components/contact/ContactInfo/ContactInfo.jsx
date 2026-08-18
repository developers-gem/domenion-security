import "./ContactInfo.css";
import {
  MapPin,
  Phone,
  Mail,
  Clock3,
} from "lucide-react";

const contactData = [
  {
    icon: <Phone size={36} />,
    title: "Call Us",
    value: "(800) 555-1234",
    text: "24/7 Emergency Support",
  },
  {
    icon: <Mail size={36} />,
    title: "Email Us",
    value: "info@domenionsecurity.com",
    text: "We'll respond within 24 hours",
  },
  {
    icon: <MapPin size={36} />,
    title: "Head Office",
    value: "Los Angeles, California",
    text: "Corporate Security Headquarters",
  },
  {
    icon: <Clock3 size={36} />,
    title: "Business Hours",
    value: "Mon - Fri: 8AM - 6PM",
    text: "Emergency Service Available 24/7",
  },
];

function ContactInfo() {
  return (
    <section className="contact-info section">

      <div className="container">

        <div className="row g-4">

          {contactData.map((item, index) => (

            <div className="col-lg-3 col-md-6" key={index}>

              <div className="contact-card">

                <div className="contact-icon">
                  {item.icon}
                </div>

                <h4>{item.title}</h4>

                <h6>{item.value}</h6>

                <p>{item.text}</p>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default ContactInfo;