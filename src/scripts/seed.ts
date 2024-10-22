import type {
  Candidate,
  Election,
  Question,
  CandidateQuestionAnswer,
} from "@prisma/client";
import { prisma } from "../lib/prisma";

const SFElections: Election[] = [
  {
    id: 1,
    name: "United States Representative, District 11",
    slug: "us-rep-district-11",
    description: "Election for the United States Representative, District 11",
    isActive: false,
    isQuestionnaire: false,
  },
  {
    id: 2,
    name: "United States Representative, District 15",
    slug: "us-rep-district-15",
    description: "Election for the United States Representative, District 15",
    isActive: false,
    isQuestionnaire: false,
  },
  {
    id: 3,
    name: "State Senate, District 11",
    slug: "state-senate-district-11",
    description: "Election for State Senate, District 11",
    isActive: false,
    isQuestionnaire: false,
  },
  {
    id: 4,
    name: "State Assembly, District 17",
    slug: "state-assembly-district-17",
    description: "Election for State Assembly, District 17",
    isActive: false,
    isQuestionnaire: false,
  },
  {
    id: 5,
    name: "State Assembly, District 19",
    slug: "state-assembly-district-19",
    description: "Election for State Assembly, District 19",
    isActive: false,
    isQuestionnaire: false,
  },
  {
    id: 6,
    name: "Board of Education",
    slug: "board-of-education",
    description: "Election for San Francisco Board of Education",
    isActive: false,
    isQuestionnaire: false,
  },
  {
    id: 7,
    name: "Community College Board",
    slug: "community-college-board",
    description: "Election for San Francisco Community College Board",
    isActive: false,
    isQuestionnaire: false,
  },
  {
    id: 8,
    name: "BART Board, District 7",
    slug: "bart-board-district-7",
    description: "Election for BART Board, District 7",
    isActive: false,
    isQuestionnaire: false,
  },
  {
    id: 9,
    name: "BART Board, District 9",
    slug: "bart-board-district-9",
    description: "Election for BART Board, District 9",
    isActive: false,
    isQuestionnaire: false,
  },
  {
    id: 10,
    name: "Mayor of San Francisco",
    slug: "mayor",
    description: "Election for Mayor of San Francisco",
    isActive: true,
    isQuestionnaire: true,
  },
  {
    id: 11,
    name: "City Attorney",
    slug: "city-attorney",
    description: "Election for City Attorney of San Francisco",
    isActive: false,
    isQuestionnaire: false,
  },
  {
    id: 12,
    name: "District Attorney",
    slug: "district-attorney",
    description: "Election for District Attorney of San Francisco",
    isActive: false,
    isQuestionnaire: false,
  },
  {
    id: 13,
    name: "Sheriff",
    slug: "sheriff",
    description: "Election for Sheriff of San Francisco",
    isActive: false,
    isQuestionnaire: false,
  },
  {
    id: 14,
    name: "Treasurer",
    slug: "treasurer",
    description: "Election for Treasurer of San Francisco",
    isActive: false,
    isQuestionnaire: false,
  },
  {
    id: 15,
    name: "Board of Supervisors, District 1",
    slug: "supervisors-district-1",
    description: "Election for Board of Supervisors, District 1",
    isActive: false,
    isQuestionnaire: false,
  },
  {
    id: 16,
    name: "Board of Supervisors, District 3",
    slug: "supervisors-district-3",
    description: "Election for Board of Supervisors, District 3",
    isActive: false,
    isQuestionnaire: false,
  },
  {
    id: 17,
    name: "Board of Supervisors, District 5",
    slug: "supervisors-district-5",
    description: "Election for Board of Supervisors, District 5",
    isActive: false,
    isQuestionnaire: false,
  },
  {
    id: 18,
    name: "Board of Supervisors, District 7",
    slug: "supervisors-district-7",
    description: "Election for Board of Supervisors, District 7",
    isActive: false,
    isQuestionnaire: false,
  },
  {
    id: 19,
    name: "Board of Supervisors, District 9",
    slug: "supervisors-district-9",
    description: "Election for Board of Supervisors, District 9",
    isActive: false,
    isQuestionnaire: false,
  },
  {
    id: 20,
    name: "Board of Supervisors, District 11",
    slug: "supervisors-district-11",
    description: "Election for Board of Supervisors, District 11",
    isActive: false,
    isQuestionnaire: false,
  },
];

const MayorQuestions: Question[] = [
  {
    id: 1,
    title: "Should we expand rent control?",
    category: "Housing",
    description: "",
    electionId: 10,
    order: 0,
    type: "YesNo",
  },
  {
    id: 2,
    title: "Should we fund the police more?",
    category: "Policing",
    description: "",
    electionId: 10,
    order: 1,
    type: "YesNo",
  },
  {
    id: 3,
    title: "Should there be more street sweep?",
    category: "Policing",
    description: "",
    electionId: 10,
    order: 2,
    type: "YesNo",
  },
  {
    id: 4,
    title:
      "Should there be tax incentive for businesses to require their workers to work downtown?",
    category: "Business",
    description: "",
    electionId: 10,
    order: 2,
    type: "YesNo",
  },
  {
    id: 5,
    title:
      "Should San Francisco force people with severe drug addictions to go into treatment programs?",
    category: "Homelessness",
    description: "",
    electionId: 10,
    order: 2,
    type: "YesNo",
  },
];

const MayorCandidates: Candidate[] = [
  {
    id: 1,
    name: "London Breed",
    slug: "london-breed",
    profileImg: "/candidates/london-breed-pfp.jpg", // Add URL if available
    description: "Incumbent Mayor of San Francisco",
    hasFinished: true,
    electionId: 10, // Changed from 1 to 10
  },
  {
    id: 2,
    name: "Mark Farrell",
    slug: "mark-farrell",
    profileImg: "/candidates/mark-farrell-pfp.jpg", // Add URL if available
    description: "Former interim mayor and San Francisco Supervisor",
    hasFinished: true,
    electionId: 10, // Changed from 1 to 10
  },
  {
    id: 3,
    name: "Daniel Lurie",
    slug: "daniel-lurie",
    profileImg: "/candidates/daniel-lurie-pfp.jpg", // Add URL if available
    description: "Founder and former CEO of Tipping Point Community",
    hasFinished: true,
    electionId: 10, // Changed from 1 to 10
  },
  {
    id: 4,
    name: "Aaron Peskin",
    slug: "aaron-peskin",
    profileImg: "/candidates/aaron-peskin-pfp.jpg", // Add URL if available
    description: "President of the Board of Supervisors",
    hasFinished: true,
    electionId: 10, // Changed from 1 to 10
  },
  {
    id: 5,
    name: "Ahsha Safaí",
    slug: "ahsha-safai",
    profileImg: "/candidates/ahsha-safai-pfp.jpg", // Add URL if available
    description: "Supervisor of District 11",
    hasFinished: true,
    electionId: 10, // Changed from 1 to 10
  },
  {
    id: 6,
    name: "Henry Flynn",
    slug: "henry-flynn",
    profileImg: null, // Add URL if available
    description: "Security guard",
    hasFinished: false,
    electionId: 10, // Changed from 1 to 10
  },
  {
    id: 7,
    name: "Keith Freedman",
    slug: "keith-freedman",
    profileImg: null, // Add URL if available
    description: "Teacher",
    hasFinished: false,
    electionId: 10, // Changed from 1 to 10
  },
  {
    id: 8,
    name: "Dylan Hirsch-Shell",
    slug: "dylan-hirsch-shell",
    profileImg: null, // Add URL if available
    description: "Engineer",
    hasFinished: false,
    electionId: 10, // Changed from 1 to 10
  },
  {
    id: 9,
    name: "Nelson Mei",
    slug: "nelson-mei",
    profileImg: null, // Add URL if available
    description: "Software engineer",
    hasFinished: false,
    electionId: 10, // Changed from 1 to 10
  },
  {
    id: 10,
    name: "Paul Ybarra Robertson",
    slug: "paul-ybarra-robertson",
    profileImg: null, // Add URL if available
    description: "Teacher",
    hasFinished: false,
    electionId: 10, // Changed from 1 to 10
  },
  {
    id: 11,
    name: "Shahram Shariati",
    slug: "shahram-shariati",
    profileImg: null, // Add URL if available
    description: "Transportation engineer",
    hasFinished: false,
    electionId: 10, // Changed from 1 to 10
  },
  {
    id: 12,
    name: "Jon Soderstrom",
    slug: "jon-soderstrom",
    profileImg: null, // Add URL if available
    description: "Tour guide",
    hasFinished: false,
    electionId: 10, // Changed from 1 to 10
  },
  {
    id: 13,
    name: "Ellen Lee Zhou",
    slug: "ellen-lee-zhou",
    profileImg: null, // Add URL if available
    description: "Social worker and previous mayoral candidate",
    hasFinished: false,
    electionId: 10, // Changed from 1 to 10
  },
];

const MayorAnswers: Omit<CandidateQuestionAnswer, "id">[] = [
  // London Breed
  {
    candidateId: 1,
    questionId: 1,
    option: -1,
    text: "",
    textSimpleLanguage: "",
    weighting: 2,
    changedQuestionDisclaimer: "",
  },
  {
    candidateId: 1,
    questionId: 2,
    option: 1,
    text: "",
    textSimpleLanguage: "",
    weighting: 2,
    changedQuestionDisclaimer: "",
  },

  // Mark Farrell
  {
    candidateId: 2,
    questionId: 1,
    option: -1,
    text: "",
    textSimpleLanguage: "",
    weighting: 2,
    changedQuestionDisclaimer: "",
  },
  {
    candidateId: 2,
    questionId: 2,
    option: 1,
    text: "",
    textSimpleLanguage: "",
    weighting: 2,
    changedQuestionDisclaimer: "",
  },

  // Daniel Lurie
  {
    candidateId: 3,
    questionId: 1,
    option: -1,
    text: "",
    textSimpleLanguage: "",
    weighting: 2,
    changedQuestionDisclaimer: "",
  },
  {
    candidateId: 3,
    questionId: 2,
    option: 1,
    text: "",
    textSimpleLanguage: "",
    weighting: 2,
    changedQuestionDisclaimer: "",
  },

  // Aaron Peskin
  {
    candidateId: 4,
    questionId: 1,
    option: 1,
    text: "",
    textSimpleLanguage: "",
    weighting: 2,
    changedQuestionDisclaimer: "",
  },
  {
    candidateId: 4,
    questionId: 2,
    option: -1,
    text: "",
    textSimpleLanguage: "",
    weighting: 2,
    changedQuestionDisclaimer: "",
  },
  {
    candidateId: 4,
    questionId: 3,
    option: -1,
    text: "",
    textSimpleLanguage: "",
    weighting: 2,
    changedQuestionDisclaimer: "",
  },

  // Asha Safia
  {
    candidateId: 5,
    questionId: 1,
    option: -1,
    text: "",
    textSimpleLanguage: "",
    weighting: 1,
    changedQuestionDisclaimer: "",
  },
  {
    candidateId: 5,
    questionId: 2,
    option: 1,
    text: "",
    textSimpleLanguage: "",
    weighting: 1,
    changedQuestionDisclaimer: "",
  },
];

export async function clearData() {
  await prisma.voterQuestionAnswer.deleteMany({});
  await prisma.voterCandidateMatch.deleteMany({});
  await prisma.candidateQuestionAnswer.deleteMany({});
  await prisma.question.deleteMany({});
  await prisma.candidate.deleteMany({});
  await prisma.voter.deleteMany({}); // Add this line to delete voters
  await prisma.election.deleteMany({});
}


