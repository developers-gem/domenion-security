import {
  ShieldCheck,
  Camera,
  Users,
  ClipboardCheck,
  Siren,
  ScanFace,
  Building2,
  LockKeyhole,
  Radio,
  FileCheck,
  Truck,
  Eye,
} from "lucide-react";

export const industries = [

  /* =====================================================
     GOVERNMENT
  ===================================================== */

  {
    slug: "government",

    badge: "GOVERNMENT SECURITY",

    title: "Government Security Solutions",

    shortDescription:
      "Comprehensive security solutions designed to protect government facilities, personnel, sensitive assets and public operations.",

    heroImage:
      "/images/industries/government/hero.jpg",

    overviewImage:
      "/images/industries/government/overview.jpg",

    benefitsImage:
      "/images/industries/government/benefits.jpg",

    overviewTitle:
      "Protecting Government Facilities, Personnel & Critical Operations",

    overviewDescription:
      "Our government security solutions provide professional protection for public facilities, administrative buildings, sensitive environments and government operations through trained personnel, access control and proactive security strategies.",

    highlights: [
      "Trained & Background-Verified Security Officers",
      "Controlled Access & Visitor Screening",
      "24/7 Facility Monitoring",
      "Emergency Response Procedures",
      "Detailed Incident Documentation",
      "Customized Government Security Plans",
    ],

    featuresTitle:
      "Comprehensive Government Security Capabilities",

    featuresDescription:
      "Our government-focused security programs combine trained personnel, technology and strict operational procedures to protect sensitive facilities and public assets.",

    features: [
      {
        icon: ShieldCheck,
        title: "Facility Security",
        text: "Professional officers providing continuous protection for government facilities and public buildings.",
      },
      {
        icon: LockKeyhole,
        title: "Access Control",
        text: "Controlled entry procedures, credential verification and visitor screening.",
      },
      {
        icon: Camera,
        title: "Surveillance Monitoring",
        text: "Continuous monitoring of facilities, entrances and sensitive areas.",
      },
      {
        icon: Users,
        title: "Personnel Protection",
        text: "Security personnel trained to protect employees, visitors and government officials.",
      },
      {
        icon: Siren,
        title: "Emergency Response",
        text: "Rapid response procedures for security incidents and emergencies.",
      },
      {
        icon: FileCheck,
        title: "Security Reporting",
        text: "Detailed activity logs, incident reports and operational documentation.",
      },
    ],

    benefitsTitle:
      "Security Built Around Government Requirements",

    benefitsDescription:
      "Government environments require disciplined procedures, accountability and dependable protection. Our security programs are designed around those requirements.",

    benefits: [
      "Professional and highly trained officers",
      "Strict access control procedures",
      "Reduced security and operational risks",
      "24/7 monitoring and response capabilities",
      "Detailed incident reporting",
      "Customized facility protection plans",
    ],
  },


  /* =====================================================
     HEALTHCARE
  ===================================================== */

  {
    slug: "healthcare",

    badge: "HEALTHCARE SECURITY",

    title: "Healthcare Security Solutions",

    shortDescription:
      "Reliable security solutions protecting healthcare facilities, staff, patients, visitors and critical medical environments.",

    heroImage:
      "/images/industries/healthcare/hero.jpg",

    overviewImage:
      "/images/industries/healthcare/overview.jpg",

    benefitsImage:
      "/images/industries/healthcare/benefits.jpg",

    overviewTitle:
      "Creating Safer Healthcare Environments",

    overviewDescription:
      "Healthcare facilities require a specialized security approach that protects patients, staff, visitors and valuable medical assets while maintaining a welcoming environment.",

    highlights: [
      "Hospital & Medical Facility Security",
      "Emergency Department Monitoring",
      "Visitor & Access Management",
      "Staff & Patient Safety",
      "Incident Response",
      "24/7 Security Coverage",
    ],

    featuresTitle:
      "Healthcare Security Capabilities",

    featuresDescription:
      "Our healthcare security programs are designed to support hospitals, clinics, medical offices and healthcare facilities.",

    features: [
      {
        icon: ShieldCheck,
        title: "Hospital Security",
        text: "Professional officers protecting patients, staff and healthcare facilities.",
      },
      {
        icon: Users,
        title: "Visitor Management",
        text: "Controlled visitor access and professional screening procedures.",
      },
      {
        icon: Siren,
        title: "Emergency Response",
        text: "Rapid response support for security incidents and emergencies.",
      },
      {
        icon: Camera,
        title: "Monitoring",
        text: "Continuous surveillance of entrances, corridors and sensitive areas.",
      },
      {
        icon: LockKeyhole,
        title: "Access Control",
        text: "Secure access to restricted medical and administrative areas.",
      },
      {
        icon: FileCheck,
        title: "Incident Reporting",
        text: "Detailed documentation of incidents and daily security activities.",
      },
    ],

    benefitsTitle:
      "Protecting Patients, Staff & Medical Facilities",

    benefitsDescription:
      "Our healthcare security teams help create a safer environment while supporting the daily operations of medical professionals.",

    benefits: [
      "Improved patient and staff safety",
      "Professional security presence",
      "Controlled access to restricted areas",
      "Fast emergency response",
      "Reduced operational risks",
      "Detailed security documentation",
    ],
  },


  /* =====================================================
     DATA CENTER
  ===================================================== */

  {
    slug: "data-center",

    badge: "DATA CENTER SECURITY",

    title: "Data Center Security Solutions",

    shortDescription:
      "Layered physical security protecting critical data centers, infrastructure, technology assets and sensitive facilities.",

    heroImage:
      "/images/industries/data-center/hero.jpg",

    overviewImage:
      "/images/industries/data-center/overview.jpg",

    benefitsImage:
      "/images/industries/data-center/benefits.jpg",

    overviewTitle:
      "Protecting Critical Digital Infrastructure",

    overviewDescription:
      "Data centers require strict physical security controls to protect servers, infrastructure, employees and sensitive technology assets from unauthorized access and physical threats.",

    highlights: [
      "24/7 Data Center Security",
      "Strict Access Control",
      "Visitor & Contractor Screening",
      "Security Patrols",
      "Surveillance Monitoring",
      "Critical Incident Response",
    ],

    featuresTitle:
      "Advanced Data Center Security Capabilities",

    featuresDescription:
      "Our security programs provide multiple layers of physical protection around critical technology infrastructure.",

    features: [
      {
        icon: LockKeyhole,
        title: "Access Control",
        text: "Strict access verification and authorization procedures for sensitive areas.",
      },
      {
        icon: Camera,
        title: "Video Surveillance",
        text: "Continuous monitoring of entrances, server areas and critical zones.",
      },
      {
        icon: ShieldCheck,
        title: "Physical Protection",
        text: "Professional officers providing visible protection throughout the facility.",
      },
      {
        icon: Users,
        title: "Visitor Screening",
        text: "Controlled visitor and contractor verification procedures.",
      },
      {
        icon: ScanFace,
        title: "Security Patrols",
        text: "Scheduled and random patrols throughout critical facility areas.",
      },
      {
        icon: Siren,
        title: "Incident Response",
        text: "Rapid response procedures for physical security incidents.",
      },
    ],

    benefitsTitle:
      "Multi-Layer Protection for Critical Infrastructure",

    benefitsDescription:
      "Our data center security programs combine personnel, technology and strict procedures to reduce physical security risks.",

    benefits: [
      "Protection of critical infrastructure",
      "Reduced unauthorized access risks",
      "24/7 security monitoring",
      "Professional visitor management",
      "Rapid incident response",
      "Detailed security reporting",
    ],
  },


  /* =====================================================
     COMMERCIAL
     =====================================================  */

  {
    slug: "commercial",

    badge: "COMMERCIAL SECURITY",

    title: "Commercial Security Solutions",

    shortDescription:
      "Professional security services protecting offices, commercial properties, employees, customers and business assets.",

    heroImage:
      "/images/industries/commercial/hero.jpg",

    overviewImage:
      "/images/industries/commercial/overview.jpg",

    benefitsImage:
      "/images/industries/commercial/benefits.jpg",

    overviewTitle:
      "Protecting Businesses & Commercial Properties",

    overviewDescription:
      "Our commercial security solutions help businesses maintain safe, secure and productive environments through professional officers, patrols and access management.",

    highlights: [
      "Office & Commercial Building Security",
      "Access Control",
      "Visitor Management",
      "Security Patrols",
      "Employee & Customer Protection",
      "Emergency Response",
    ],

    featuresTitle:
      "Complete Commercial Security Capabilities",

    featuresDescription:
      "Flexible security programs designed around the unique needs of modern businesses and commercial properties.",

    features: [
      {
        icon: ShieldCheck,
        title: "Security Officers",
        text: "Professional officers providing visible protection for employees and customers.",
      },
      {
        icon: LockKeyhole,
        title: "Access Control",
        text: "Secure entry management for employees, visitors and contractors.",
      },
      {
        icon: Camera,
        title: "CCTV Monitoring",
        text: "Continuous surveillance to detect and deter security threats.",
      },
      {
        icon: ScanFace,
        title: "Mobile Patrol",
        text: "Scheduled and random patrols to maintain a secure environment.",
      },
      {
        icon: Users,
        title: "Visitor Management",
        text: "Professional visitor registration and screening procedures.",
      },
      {
        icon: Siren,
        title: "Emergency Response",
        text: "Fast response to alarms, incidents and emergencies.",
      },
    ],

    benefitsTitle:
      "A Safer Environment for Your Business",

    benefitsDescription:
      "Our commercial security programs help reduce risks while providing employees, customers and management with greater peace of mind.",

    benefits: [
      "Visible crime deterrence",
      "Improved employee safety",
      "Professional visitor management",
      "Reduced property risks",
      "24/7 security options",
      "Customized business protection",
    ],
  },


  /* =====================================================
     CONSTRUCTION
  ===================================================== */

  {
    slug: "construction",

    badge: "CONSTRUCTION SECURITY",

    title: "Construction Site Security",

    shortDescription:
      "Protect construction sites, equipment, materials and personnel from theft, vandalism and unauthorized access.",

    heroImage:
      "/images/industries/construction/hero.jpg",

    overviewImage:
      "/images/industries/construction/overview.jpg",

    benefitsImage:
      "/images/industries/construction/benefits.jpg",

    overviewTitle:
      "Securing Construction Sites Around the Clock",

    overviewDescription:
      "Construction sites contain valuable equipment, materials and machinery. Our security solutions help prevent theft, vandalism and unauthorized activity.",

    highlights: [
      "Construction Site Security Officers",
      "Equipment & Material Protection",
      "Perimeter Patrols",
      "Access Control",
      "After-Hours Security",
      "Incident Reporting",
    ],

    featuresTitle:
      "Construction Site Security Capabilities",

    featuresDescription:
      "Flexible security solutions designed to protect construction projects from early development through completion.",

    features: [
      {
        icon: ShieldCheck,
        title: "Site Security Officers",
        text: "Visible security presence throughout construction properties.",
      },
      {
        icon: ScanFace,
        title: "Perimeter Patrols",
        text: "Regular patrols around site boundaries and vulnerable areas.",
      },
      {
        icon: LockKeyhole,
        title: "Access Control",
        text: "Control workers, contractors, deliveries and visitors entering the site.",
      },
      {
        icon: Camera,
        title: "Site Surveillance",
        text: "Monitoring of critical areas, equipment and entry points.",
      },
      {
        icon: Truck,
        title: "Equipment Protection",
        text: "Security measures designed to protect machinery and valuable materials.",
      },
      {
        icon: Siren,
        title: "After-Hours Response",
        text: "Rapid response to unauthorized activity and security incidents.",
      },
    ],

    benefitsTitle:
      "Protect Your Construction Investment",

    benefitsDescription:
      "Our construction security programs help protect valuable assets while keeping your project site organized and secure.",

    benefits: [
      "Reduced theft and vandalism",
      "Protection of equipment and materials",
      "Controlled site access",
      "After-hours monitoring",
      "Visible security deterrence",
      "Detailed incident reporting",
    ],
  },


  /* =====================================================
     RESIDENTIAL
  ===================================================== */

  {
    slug: "residential",

    badge: "RESIDENTIAL SECURITY",

    title: "Residential Security Solutions",

    shortDescription:
      "Professional residential security protecting communities, residents, homes and valuable property.",

    heroImage:
      "/images/industries/residential/hero.jpg",

    overviewImage:
      "/images/industries/residential/overview.jpg",

    benefitsImage:
      "/images/industries/residential/benefits.jpg",

    overviewTitle:
      "Creating Safer Residential Communities",

    overviewDescription:
      "Our residential security solutions provide dependable protection for gated communities, apartment complexes, private residences and residential developments.",

    highlights: [
      "Gated Community Security",
      "Residential Patrols",
      "Access Control",
      "Visitor Management",
      "Parking & Property Monitoring",
      "24/7 Security Options",
    ],

    featuresTitle:
      "Residential Security Capabilities",

    featuresDescription:
      "Security programs designed to protect residents, guests and residential properties while maintaining a welcoming community environment.",

    features: [
      {
        icon: ShieldCheck,
        title: "Community Security",
        text: "Professional security officers protecting residential communities.",
      },
      {
        icon: ScanFace,
        title: "Mobile Patrol",
        text: "Routine patrols through residential properties and common areas.",
      },
      {
        icon: LockKeyhole,
        title: "Gate & Access Control",
        text: "Controlled entry for residents, visitors and service providers.",
      },
      {
        icon: Users,
        title: "Visitor Management",
        text: "Professional guest verification and access procedures.",
      },
      {
        icon: Camera,
        title: "Property Monitoring",
        text: "Monitoring of entrances, parking areas and common spaces.",
      },
      {
        icon: Siren,
        title: "Emergency Response",
        text: "Fast response to security incidents and emergencies.",
      },
    ],

    benefitsTitle:
      "Peace of Mind for Residents & Property Managers",

    benefitsDescription:
      "Our residential security programs provide a visible and professional security presence designed around the needs of each community.",

    benefits: [
      "Improved resident safety",
      "Visible security deterrence",
      "Controlled community access",
      "Reduced property risks",
      "Professional visitor management",
      "Reliable patrol coverage",
    ],
  },


  /* =====================================================
     TRANSPORTATION
  ===================================================== */

  {
    slug: "transportation",

    badge: "TRANSPORTATION SECURITY",

    title: "Transportation Security Solutions",

    shortDescription:
      "Security solutions protecting transportation facilities, terminals, fleets, personnel and passengers.",

    heroImage:
      "/images/industries/transportation/hero.jpg",

    overviewImage:
      "/images/industries/transportation/overview.jpg",

    benefitsImage:
      "/images/industries/transportation/benefits.jpg",

    overviewTitle:
      "Protecting Transportation Operations",

    overviewDescription:
      "Transportation environments require dependable security to protect passengers, employees, facilities, vehicles and critical operations.",

    highlights: [
      "Transportation Facility Security",
      "Terminal Security",
      "Access Control",
      "Vehicle & Fleet Protection",
      "Passenger Safety",
      "Emergency Response",
    ],

    featuresTitle:
      "Transportation Security Capabilities",

    featuresDescription:
      "Security programs designed for transportation facilities and complex operational environments.",

    features: [
      {
        icon: ShieldCheck,
        title: "Facility Protection",
        text: "Professional security coverage for transportation facilities and terminals.",
      },
      {
        icon: Users,
        title: "Passenger Security",
        text: "Security presence supporting passenger and employee safety.",
      },
      {
        icon: LockKeyhole,
        title: "Access Management",
        text: "Controlled access to restricted transportation areas.",
      },
      {
        icon: Camera,
        title: "Surveillance",
        text: "Monitoring of critical transportation environments and facilities.",
      },
      {
        icon: Truck,
        title: "Fleet Protection",
        text: "Security measures protecting vehicles, equipment and fleet assets.",
      },
      {
        icon: Siren,
        title: "Incident Response",
        text: "Rapid response procedures for operational security incidents.",
      },
    ],

    benefitsTitle:
      "Security That Keeps Transportation Moving",

    benefitsDescription:
      "Our transportation security programs help maintain safe and secure environments without disrupting daily operations.",

    benefits: [
      "Improved passenger safety",
      "Protection of transportation assets",
      "Controlled access to restricted areas",
      "Professional security presence",
      "Rapid incident response",
      "Operational risk reduction",
    ],
  },


  /* =====================================================
     AVIATION
  ===================================================== */

  {
    slug: "airports",

    badge: "AVIATION SECURITY",

    title: "Aviation Security Solutions",

    shortDescription:
      "Specialized security solutions protecting airports, aviation facilities, personnel, passengers and critical infrastructure.",

    heroImage:
      "/images/industries/aviation/hero.jpg",

    overviewImage:
      "/images/industries/aviation/overview.jpg",

    benefitsImage:
      "/images/industries/aviation/benefits.jpg",

    overviewTitle:
      "Protecting Aviation Facilities & Operations",

    overviewDescription:
      "Our aviation security programs provide professional protection for airports, aviation facilities, restricted areas and operational environments.",

    highlights: [
      "Airport & Aviation Facility Security",
      "Restricted Area Access Control",
      "Passenger & Visitor Screening",
      "Perimeter Protection",
      "Surveillance Monitoring",
      "Emergency Response",
    ],

    featuresTitle:
      "Aviation Security Capabilities",

    featuresDescription:
      "Layered security solutions designed to support aviation facilities and complex airport environments.",

    features: [
      {
        icon: ShieldCheck,
        title: "Airport Security",
        text: "Professional security personnel protecting airport facilities and operational areas.",
      },
      {
        icon: LockKeyhole,
        title: "Restricted Access",
        text: "Strict access procedures for secure and restricted areas.",
      },
      {
        icon: Camera,
        title: "Surveillance",
        text: "Continuous monitoring of facilities, entrances and perimeter areas.",
      },
      {
        icon: Users,
        title: "Passenger Protection",
        text: "Security presence supporting passenger and employee safety.",
      },
      {
        icon: ScanFace,
        title: "Perimeter Patrol",
        text: "Regular patrols around critical aviation facilities and boundaries.",
      },
      {
        icon: Siren,
        title: "Emergency Response",
        text: "Rapid response procedures for security incidents and emergencies.",
      },
    ],

    benefitsTitle:
      "Layered Protection for Aviation Environments",

    benefitsDescription:
      "Our aviation security approach combines trained personnel, controlled access and proactive monitoring to reduce security risks.",

    benefits: [
      "Enhanced facility security",
      "Controlled restricted-area access",
      "Professional security presence",
      "Continuous monitoring",
      "Perimeter protection",
      "Rapid incident response",
    ],
  },


  /* =====================================================
     CRITICAL INFRASTRUCTURE
  ===================================================== */

  {
    slug: "critical-infrastructure",

    badge: "CRITICAL INFRASTRUCTURE",

    title: "Critical Infrastructure Security",

    shortDescription:
      "Comprehensive security solutions protecting critical facilities, infrastructure, personnel and essential operations.",

    heroImage:
      "/images/industries/critical-infrastructure/hero.jpg",

    overviewImage:
      "/images/industries/critical-infrastructure/overview.jpg",

    benefitsImage:
      "/images/industries/critical-infrastructure/benefits.jpg",

    overviewTitle:
      "Protecting Essential Infrastructure & Operations",

    overviewDescription:
      "Critical infrastructure requires dependable security programs that protect facilities, personnel, equipment and essential operations from physical threats.",

    highlights: [
      "Critical Facility Protection",
      "Perimeter Security",
      "Access Control",
      "24/7 Monitoring",
      "Security Patrols",
      "Emergency Response",
    ],

    featuresTitle:
      "Critical Infrastructure Security Capabilities",

    featuresDescription:
      "Our layered security programs help protect essential facilities and infrastructure against physical security threats.",

    features: [
      {
        icon: ShieldCheck,
        title: "Facility Protection",
        text: "Professional security personnel protecting critical infrastructure facilities.",
      },
      {
        icon: LockKeyhole,
        title: "Access Control",
        text: "Strict credential and access management for sensitive locations.",
      },
      {
        icon: Camera,
        title: "Continuous Monitoring",
        text: "Surveillance and monitoring of critical facility areas.",
      },
      {
        icon: ScanFace,
        title: "Perimeter Security",
        text: "Patrols and monitoring designed to protect facility boundaries.",
      },
      {
        icon: Radio,
        title: "Security Communications",
        text: "Reliable communication procedures for coordinated security operations.",
      },
      {
        icon: Siren,
        title: "Emergency Response",
        text: "Rapid response procedures for critical security incidents.",
      },
    ],

    benefitsTitle:
      "Resilient Security for Critical Operations",

    benefitsDescription:
      "Our critical infrastructure security programs focus on prevention, detection and rapid response to help maintain operational continuity.",

    benefits: [
      "Protection of essential facilities",
      "Reduced physical security risks",
      "24/7 security monitoring",
      "Controlled access",
      "Professional patrol operations",
      "Rapid emergency response",
    ],
  },

];