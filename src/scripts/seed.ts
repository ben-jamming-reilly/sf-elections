import type { Candidate, Election } from "@prisma/client";
import { prisma, db } from "../lib/prisma";

async function seed() {
  // Clear Data

  await prisma.candidate.deleteMany({});
  await prisma.election.deleteMany({});

  // Add Elections
  await prisma.election.createMany({
    data: [
      {
        id: 1,
        name: "United States Representative, District 11",
        slug: "us-rep-district-11",
        description:
          "Election for the United States Representative, District 11",
        isActive: false,
        isQuestionnaire: false,
      },
      {
        id: 2,
        name: "United States Representative, District 15",
        slug: "us-rep-district-15",
        description:
          "Election for the United States Representative, District 15",
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
        isActive: true,
        isQuestionnaire: false,
      },
      {
        id: 7,
        name: "Community College Board",
        slug: "community-college-board",
        description: "Election for San Francisco Community College Board",
        isActive: true,
        isQuestionnaire: false,
      },
      {
        id: 8,
        name: "BART Board, District 7",
        slug: "bart-board-district-7",
        description: "Election for BART Board, District 7",
        isActive: true,
        isQuestionnaire: false,
      },
      {
        id: 9,
        name: "BART Board, District 9",
        slug: "bart-board-district-9",
        description: "Election for BART Board, District 9",
        isActive: true,
        isQuestionnaire: false,
      },
      {
        id: 10,
        name: "Mayor of San Francisco",
        slug: "mayor",
        description: "Election for Mayor of San Francisco",
        isActive: true,
        isQuestionnaire: false,
      },
      {
        id: 11,
        name: "City Attorney",
        slug: "city-attorney",
        description: "Election for City Attorney of San Francisco",
        isActive: true,
        isQuestionnaire: false,
      },
      {
        id: 12,
        name: "District Attorney",
        slug: "district-attorney",
        description: "Election for District Attorney of San Francisco",
        isActive: true,
        isQuestionnaire: false,
      },
      {
        id: 13,
        name: "Sheriff",
        slug: "sheriff",
        description: "Election for Sheriff of San Francisco",
        isActive: true,
        isQuestionnaire: false,
      },
      {
        id: 14,
        name: "Treasurer",
        slug: "treasurer",
        description: "Election for Treasurer of San Francisco",
        isActive: true,
        isQuestionnaire: false,
      },
      {
        id: 15,
        name: "Board of Supervisors, District 1",
        slug: "supervisors-district-1",
        description: "Election for Board of Supervisors, District 1",
        isActive: true,
        isQuestionnaire: false,
      },
      {
        id: 16,
        name: "Board of Supervisors, District 3",
        slug: "supervisors-district-3",
        description: "Election for Board of Supervisors, District 3",
        isActive: true,
        isQuestionnaire: false,
      },
      {
        id: 17,
        name: "Board of Supervisors, District 5",
        slug: "supervisors-district-5",
        description: "Election for Board of Supervisors, District 5",
        isActive: true,
        isQuestionnaire: false,
      },
      {
        id: 18,
        name: "Board of Supervisors, District 7",
        slug: "supervisors-district-7",
        description: "Election for Board of Supervisors, District 7",
        isActive: true,
        isQuestionnaire: false,
      },
      {
        id: 19,
        name: "Board of Supervisors, District 9",
        slug: "supervisors-district-9",
        description: "Election for Board of Supervisors, District 9",
        isActive: true,
        isQuestionnaire: false,
      },
      {
        id: 20,
        name: "Board of Supervisors, District 11",
        slug: "supervisors-district-11",
        description: "Election for Board of Supervisors, District 11",
        isActive: true,
        isQuestionnaire: false,
      },
    ],
  });

  await prisma.candidate.createMany({
    data: [
      {
        name: "London Breed",
        slug: "london-breed",
        profileImg: "/candidates/london-breed-pfp.jpg", // Add URL if available
        description: "Incumbent Mayor of San Francisco",
        hasFinished: true,
        electionId: 10, // Changed from 1 to 10
      },
      {
        name: "Mark Farrell",
        slug: "mark-farrell",
        profileImg: null, // Add URL if available
        description: "Former interim mayor and San Francisco Supervisor",
        hasFinished: false,
        electionId: 10, // Changed from 1 to 10
      },
      {
        name: "Henry Flynn",
        slug: "henry-flynn",
        profileImg: null, // Add URL if available
        description: "Security guard",
        hasFinished: false,
        electionId: 10, // Changed from 1 to 10
      },
      {
        name: "Keith Freedman",
        slug: "keith-freedman",
        profileImg: null, // Add URL if available
        description: "Teacher",
        hasFinished: false,
        electionId: 10, // Changed from 1 to 10
      },
      {
        name: "Dylan Hirsch-Shell",
        slug: "dylan-hirsch-shell",
        profileImg: null, // Add URL if available
        description: "Engineer",
        hasFinished: false,
        electionId: 10, // Changed from 1 to 10
      },
      {
        name: "Daniel Lurie",
        slug: "daniel-lurie",
        profileImg: null, // Add URL if available
        description: "Founder and former CEO of Tipping Point Community",
        hasFinished: false,
        electionId: 10, // Changed from 1 to 10
      },
      {
        name: "Nelson Mei",
        slug: "nelson-mei",
        profileImg: null, // Add URL if available
        description: "Software engineer",
        hasFinished: false,
        electionId: 10, // Changed from 1 to 10
      },
      {
        name: "Aaron Peskin",
        slug: "aaron-peskin",
        profileImg: null, // Add URL if available
        description: "President of the Board of Supervisors",
        hasFinished: false,
        electionId: 10, // Changed from 1 to 10
      },
      {
        name: "Paul Ybarra Robertson",
        slug: "paul-ybarra-robertson",
        profileImg: null, // Add URL if available
        description: "Teacher",
        hasFinished: false,
        electionId: 10, // Changed from 1 to 10
      },
      {
        name: "Ahsha Safaí",
        slug: "ahsha-safai",
        profileImg: null, // Add URL if available
        description: "Supervisor of District 11",
        hasFinished: false,
        electionId: 10, // Changed from 1 to 10
      },
      {
        name: "Shahram Shariati",
        slug: "shahram-shariati",
        profileImg: null, // Add URL if available
        description: "Transportation engineer",
        hasFinished: false,
        electionId: 10, // Changed from 1 to 10
      },
      {
        name: "Jon Soderstrom",
        slug: "jon-soderstrom",
        profileImg: null, // Add URL if available
        description: "Tour guide",
        hasFinished: false,
        electionId: 10, // Changed from 1 to 10
      },
      {
        name: "Ellen Lee Zhou",
        slug: "ellen-lee-zhou",
        profileImg: null, // Add URL if available
        description: "Social worker and previous mayoral candidate",
        hasFinished: false,
        electionId: 10, // Changed from 1 to 10
      },
    ],
  });
}

seed();
