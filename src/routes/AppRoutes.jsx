import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home/Home";
import About from "../pages/About/About";
import Services from "../pages/Services/Services";
import Industries from "../pages/Industries/Industries";
import Careers from "../pages/Careers/careers";
import Contact from "../pages/Contact/Contact";
import ServiceAreas from "../pages/ServiceAreas/ServiceAreas";
import ServiceDetails from "../pages/ServiceDetails/ServiceDetails";
import IndustryDetails from "../pages/Industries/IndustryDetails";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/services" element={<Services/>} />
      <Route path="/industries" element={<Industries/>}/>
      <Route path="/careers" element={<Careers/>}/>
      <Route path="/contact" element={<Contact/>}/>
      <Route path="/service-areas" element={<ServiceAreas/>}/>
      <Route path="/services/:slug" element={<ServiceDetails />}/>
      <Route path="/industries/:slug" element={<IndustryDetails />}/>
    </Routes>
  );
}

export default AppRoutes;