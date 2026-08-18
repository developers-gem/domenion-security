import "./OfficeLocations.css";
import {
  MapPin,
  Phone,
  Mail,
  Clock3,
  ArrowUpRight,
} from "lucide-react";

const offices = [
  {
    city: "Los Angeles",
    state: "California",
    address: "2450 Wilshire Blvd, Los Angeles, CA",
    phone: "(800) 555-1234",
    email: "la@domenionsecurity.com",
    hours: "Mon - Fri | 8:00 AM - 6:00 PM",
  },
  {
    city: "Dallas",
    state: "Texas",
    address: "900 Main Street, Dallas, TX",
    phone: "(800) 555-2234",
    email: "tx@domenionsecurity.com",
    hours: "Mon - Fri | 8:00 AM - 6:00 PM",
  },
  {
    city: "Phoenix",
    state: "Arizona",
    address: "500 Central Ave, Phoenix, AZ",
    phone: "(800) 555-3234",
    email: "az@domenionsecurity.com",
    hours: "Mon - Fri | 8:00 AM - 6:00 PM",
  },
  {
    city: "Las Vegas",
    state: "Nevada",
    address: "1200 Fremont Street, Las Vegas, NV",
    phone: "(800) 555-4234",
    email: "nv@domenionsecurity.com",
    hours: "24/7 Operations",
  },
];

function OfficeLocations() {
  return (
    <section className="office-locations section">

      <div className="container">

        <div className="text-center mb-5">

          <span className="section-label">
            OUR LOCATIONS
          </span>

          <h2 className="section-title">
            Offices Across The United States
          </h2>

          <p className="section-description mx-auto">
            Our nationwide presence enables us to provide rapid response
            and reliable security services wherever you need us.
          </p>

        </div>

        <div className="row g-4">

          {offices.map((office, index) => (

            <div className="col-lg-6" key={index}>

              <div className="office-card">

                <div className="office-header">

                  <div>

                    <h3>{office.city}</h3>

                    <span>{office.state}</span>

                  </div>

                  <button className="office-btn">

                    <ArrowUpRight size={20}/>

                  </button>

                </div>

                <ul>

                  <li>

                    <MapPin size={18}/>

                    {office.address}

                  </li>

                  <li>

                    <Phone size={18}/>

                    {office.phone}

                  </li>

                  <li>

                    <Mail size={18}/>

                    {office.email}

                  </li>

                  <li>

                    <Clock3 size={18}/>

                    {office.hours}

                  </li>

                </ul>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default OfficeLocations;