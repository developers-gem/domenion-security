const mongoose = require("mongoose");
require("dotenv").config({ path: "./.env" });
const GlobalQuestion = require("./models/GlobalQuestion");
const connectDB = require("./config/db");

const DEFAULT_GLOBAL_QUESTIONS = [
  {
    question:
      "I certify that this is my phone number and give Domenion Security, its affiliates and subsidiaries, and their service providers, permission to contact me at this phone number about my employment application, job opportunities, staffing, scheduling, or other promotional, marketing or employment-related matters by autodialed phone call or text message. I understand that I am not required to give my consent as a condition of employment or the provision of any services, that the number and timing of messages or phone calls I receive may vary, and that message, data, and calling rates may apply. If you wish to stop receiving text messages, you may reply “Stop” to opt out at any time.",
    type: "single_choice",
    options: ["I Agree", "I Do Not Agree"],
    required: true,
    order: 1,
    isActive: true,
    scope: "global",
  },
  {
    question:
      "I acknowledge and agree that any digital interview or pre-employment process facilitated by a third-party service provider, if used by Domenion Security, may be recorded and that the recording may be used by Domenion Security and its service providers in connection with my application, onboarding, and other employment purposes.",
    type: "single_choice",
    options: ["I Agree", "I Do Not Agree", "Not Applicable"],
    required: true,
    order: 2,
    isActive: true,
    scope: "global",
  },
  {
    question: "Tell Us More About Yourself (Please provide a brief background or introduction)",
    type: "text",
    options: [],
    required: false,
    order: 3,
    isActive: true,
    scope: "global",
  },
  {
    question: "Have you ever worked for a security company previously?",
    type: "single_choice",
    options: ["Yes", "No"],
    required: true,
    order: 4,
    isActive: true,
    scope: "global",
  },
  {
    question: "Do you have a state or county issued security license / card?",
    type: "single_choice",
    options: ["Yes", "No"],
    required: true,
    order: 5,
    isActive: true,
    scope: "global",
  },
  {
    question: "Which of the following valid licenses or certifications do you possess? (Select all that apply)",
    type: "multiple_choice",
    options: [
      "None",
      "Commercial Driver's License",
      "Driver's License - for less than one year",
      "Driver's License - for more than one year",
      "EMT",
      "Firearm Certification",
      "TSA - Issued TWIC",
    ],
    required: true,
    order: 6,
    isActive: true,
    scope: "global",
  },
  {
    question: "Do you hold a security clearance?",
    type: "single_choice",
    options: ["Yes", "No"],
    required: true,
    order: 7,
    isActive: true,
    scope: "global",
  },
  {
    question: "What days are you available to work?",
    type: "single_choice",
    options: ["Weekdays", "Weekends", "Both"],
    required: true,
    order: 8,
    isActive: true,
    scope: "global",
  },
  {
    question: "When are you available to work? (Select all that apply)",
    type: "multiple_choice",
    options: ["Not Applicable", "Dayshift", "Swingshift", "Overnight / Graveyard"],
    required: true,
    order: 9,
    isActive: true,
    scope: "global",
  },
  {
    question: "Are you seeking full time or part time?",
    type: "single_choice",
    options: ["Full Time", "Part Time", "Either"],
    required: true,
    order: 10,
    isActive: true,
    scope: "global",
  },
  {
    question: "How many hours per week are you available to work?",
    type: "text",
    options: [],
    required: true,
    order: 11,
    isActive: true,
    scope: "global",
  },
  {
    question: "How many miles are you willing to commute for a job?",
    type: "text",
    options: [],
    required: true,
    order: 12,
    isActive: true,
    scope: "global",
  },
  {
    question: "Are you able to perform the essential functions of this position, with or without special accommodations?",
    type: "single_choice",
    options: ["Yes", "No"],
    required: true,
    order: 13,
    isActive: true,
    scope: "global",
  },
  {
    question: "How did you hear about Domenion Security?",
    type: "text",
    options: [],
    required: false,
    order: 14,
    isActive: true,
    scope: "global",
  },
];

async function seedGlobalQuestions() {
  try {
    await connectDB();
    console.log("Connected to MongoDB for seeding global screening questions...");

    let seededCount = 0;
    let updatedCount = 0;

    for (const q of DEFAULT_GLOBAL_QUESTIONS) {
      const existing = await GlobalQuestion.findOne({ question: q.question });
      if (!existing) {
        await GlobalQuestion.create(q);
        seededCount++;
      } else {
        await GlobalQuestion.updateOne({ _id: existing._id }, { $set: q });
        updatedCount++;
      }
    }

    console.log(`Global Questions Seeding Complete! Seeded: ${seededCount}, Updated: ${updatedCount}`);
    process.exit(0);
  } catch (error) {
    console.error("Error seeding global screening questions:", error);
    process.exit(1);
  }
}

seedGlobalQuestions();
