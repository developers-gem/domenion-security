const mongoose = require("mongoose");
require("dotenv").config({ path: "./.env" });
const connectDB = require("./config/db");
const GlobalQuestion = require("./models/GlobalQuestion");
const Assessment = require("./models/Assessment");

const SAMPLE_QUIZ_QUESTIONS = [
  {
    question: "What should a security officer do when they notice an unauthorized person in a restricted area?",
    type: "single_choice",
    options: [
      "Ignore the person",
      "Report the incident immediately",
      "Give them access",
      "Leave the area",
    ],
    correctAnswer: "Report the incident immediately",
    points: 1,
    isQuizQuestion: true,
    required: true,
    order: 1,
    isActive: true,
    scope: "global",
  },
  {
    question: "What is the primary responsibility of a security guard during a building evacuation?",
    type: "single_choice",
    options: [
      "Secure personal belongings first",
      "Guide occupants safely to designated emergency exits",
      "Wait inside for emergency responders",
      "Lock all exit doors immediately",
    ],
    correctAnswer: "Guide occupants safely to designated emergency exits",
    points: 1,
    isQuizQuestion: true,
    required: true,
    order: 2,
    isActive: true,
    scope: "global",
  },
  {
    question: "Which document should a security officer reference to verify visitor entry permissions?",
    type: "single_choice",
    options: [
      "Daily Incident Log",
      "Authorized Access Control List / Visitor Register",
      "Employee Shift Schedule",
      "Maintenance Request Form",
    ],
    correctAnswer: "Authorized Access Control List / Visitor Register",
    points: 1,
    isQuizQuestion: true,
    required: true,
    order: 3,
    isActive: true,
    scope: "global",
  },
  {
    question: "What action must be taken immediately upon discovering a fire in a facility?",
    type: "single_choice",
    options: [
      "Attempt to extinguish large blazes alone",
      "Activate the nearest fire alarm and alert emergency services",
      "Continue normal patrol duties until instructed otherwise",
      "Send an email to site management",
    ],
    correctAnswer: "Activate the nearest fire alarm and alert emergency services",
    points: 1,
    isQuizQuestion: true,
    required: true,
    order: 4,
    isActive: true,
    scope: "global",
  },
  {
    question: "What is the correct protocol when receiving a hazardous material spill report?",
    type: "single_choice",
    options: [
      "Isolate the area and notify Hazmat responders immediately",
      "Wipe down the liquid with standard paper towels",
      "Ignore it if there is no immediate odor",
      "Open all windows and leave the site unmanned",
    ],
    correctAnswer: "Isolate the area and notify Hazmat responders immediately",
    points: 1,
    isQuizQuestion: true,
    required: true,
    order: 5,
    isActive: true,
    scope: "global",
  },
  {
    question: "How should a security officer maintain an accurate shift activity log?",
    type: "single_choice",
    options: [
      "Fill it out from memory at the end of the week",
      "Record events chronologically with factual details in real-time",
      "Only record physical altercations and ignore routine patrols",
      "Allow visitors to write their own entries",
    ],
    correctAnswer: "Record events chronologically with factual details in real-time",
    points: 1,
    isQuizQuestion: true,
    required: true,
    order: 6,
    isActive: true,
    scope: "global",
  },
  {
    question: "What should a guard do if a keycard reader at a perimeter gate fails?",
    type: "single_choice",
    options: [
      "Prop the gate open indefinitely",
      "Manually verify credentials and report the fault to site supervisor",
      "Turn off the gate power",
      "Deny entry to all personnel including management",
    ],
    correctAnswer: "Manually verify credentials and report the fault to site supervisor",
    points: 1,
    isQuizQuestion: true,
    required: true,
    order: 7,
    isActive: true,
    scope: "global",
  },
  {
    question: "Which radio protocol is used to indicate a clear emergency message transmission?",
    type: "single_choice",
    options: [
      "Clear, concise language using standard NATO phonetic alphabet when needed",
      "Casual conversation and slang",
      "Whispering to avoid noise",
      "Continuous background music broadcast",
    ],
    correctAnswer: "Clear, concise language using standard NATO phonetic alphabet when needed",
    points: 1,
    isQuizQuestion: true,
    required: true,
    order: 8,
    isActive: true,
    scope: "global",
  },
  {
    question: "When conducting a night foot patrol, what equipment is essential?",
    type: "single_choice",
    options: [
      "High-power flashlight, two-way radio, and duty badge",
      "Dark sunglasses",
      "Headphones playing music",
      "Heavy tools for repairs",
    ],
    correctAnswer: "High-power flashlight, two-way radio, and duty badge",
    points: 1,
    isQuizQuestion: true,
    required: true,
    order: 9,
    isActive: true,
    scope: "global",
  },
  {
    question: "What is the primary purpose of a security guard presence at a commercial facility?",
    type: "single_choice",
    options: [
      "Deter crime, ensure safety, and protect property & life",
      "Perform janitorial maintenance",
      "Provide valet parking services",
      "Sell products to visitors",
    ],
    correctAnswer: "Deter crime, ensure safety, and protect property & life",
    points: 1,
    isQuizQuestion: true,
    required: true,
    order: 10,
    isActive: true,
    scope: "global",
  },
];

async function seedQuizData() {
  try {
    await connectDB();
    console.log("Connected to MongoDB for seeding quiz questions & sample assessment...");

    const seededQuestionIds = [];

    for (const q of SAMPLE_QUIZ_QUESTIONS) {
      const existing = await GlobalQuestion.findOne({ question: q.question });
      if (!existing) {
        const created = await GlobalQuestion.create(q);
        seededQuestionIds.push(created._id);
      } else {
        await GlobalQuestion.updateOne({ _id: existing._id }, { $set: q });
        seededQuestionIds.push(existing._id);
      }
    }

    console.log(`Seeded/Updated ${seededQuestionIds.length} Quiz Questions in Question Bank.`);

    // Create or update sample assessment
    const sampleAssessmentTitle = "Security Officer Training Assessment";
    const existingAssessment = await Assessment.findOne({ title: sampleAssessmentTitle });

    if (!existingAssessment) {
      await Assessment.create({
        title: sampleAssessmentTitle,
        description: "Basic security procedures, emergency response protocols, and company standards.",
        questions: seededQuestionIds,
        passingScore: 8,
        attemptsAllowed: 3,
        isActive: true,
      });
      console.log("Sample Assessment 'Security Officer Training Assessment' created with 10 questions and passingScore = 8.");
    } else {
      await Assessment.updateOne(
        { _id: existingAssessment._id },
        {
          $set: {
            questions: seededQuestionIds,
            passingScore: 8,
            attemptsAllowed: 3,
            isActive: true,
          },
        }
      );
      console.log("Sample Assessment 'Security Officer Training Assessment' updated.");
    }

    process.exit(0);
  } catch (err) {
    console.error("Error seeding quiz data:", err);
    process.exit(1);
  }
}

seedQuizData();
