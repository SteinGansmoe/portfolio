import type { Project } from "./types";

/**
 * Edit portfolio content here. Store images in public/projects/<slug>/ and use
 * root-relative paths. See docs/content-recovery.md for sources and missing data.
 * Status is intentionally omitted until the original project status is confirmed.
 */
export const projects: Project[] = [
  {
    id: "lanestomp",
    title: "LaneStomp",
    slug: "lanestomp",
    excerpt: "A League of Legends platform for matchup guides and counter picks.",
    content: `## Project overview

LaneStomp is an independent League of Legends platform designed to help players better understand champion matchups and make more informed decisions during champion select and in-game.

The project started with a simple idea: matchup information should explain **why an interaction works and how players can approach it**, rather than relying solely on win rates and statistics.

Built with Next.js, TypeScript and Supabase, LaneStomp combines structured champion knowledge, AI-assisted matchup generation and a review workflow to deliver practical, role-specific guidance.

The platform is an ongoing personal project, continuously evolving through experimentation, testing and improvements.

## My role

**Product Owner · Architecture & Planning · AI-Assisted Development**

As the creator of LaneStomp, I have been responsible for shaping the product from its initial concept through development and deployment.

My responsibilities include:

- Defining the product vision, features and development priorities.
- Planning application architecture, data structures and user workflows.
- Coordinating AI-assisted implementation using Codex.
- Reviewing changes, testing functionality and refining solutions through iteration.
- Making technical and product decisions as the platform evolves.
- Managing deployment and ongoing improvements.

LaneStomp has also been an opportunity to explore how AI-assisted development can be used effectively while maintaining ownership of technical decisions and overall product quality.

## Technology

Next.js, React, TypeScript, Tailwind CSS, Supabase, and OpenAI.

# Technical Challenges & Solutions

## 01 — Riot API & Rate Limiting

**Challenge**

One of the biggest technical challenges was collecting League of Legends match data while working within Riot Games' API rate limits.

The development API key imposed strict request limits, making it important to control how often the application communicated with Riot's services.

**Solution**

I planned and iteratively developed a rate-limited data collection workflow that manages requests within the available API budget.

The system includes request throttling, candidate management, cooldown handling and administrative tools for controlling data collection.

This helped establish a more reliable foundation for collecting match data without unnecessarily exceeding API limits.

**What I learned**

Working with external APIs involves more than fetching data. It requires understanding constraints, designing reliable workflows and planning how a system should behave when resources are limited.



## 02 — AI-Generated Matchup Guides & Quality Assurance

**Challenge**

LaneStomp aims to explain why certain champion matchups are favorable or difficult, rather than simply presenting win rates.

Producing useful guidance across thousands of champion and role combinations presents a significant content challenge.

AI-generated explanations can also contain inaccuracies or overly generic recommendations.

**Solution**

I developed a workflow using structured champion combat profiles as context for AI-assisted matchup generation.

The platform includes an administrative review process, editing and publishing tools, confidence indicators and player feedback mechanisms.

These features help distinguish generated content from reviewed information and support ongoing quality improvements.

**What I learned**

AI-generated content needs structure, evaluation and quality controls.

This project taught me to treat AI as part of a larger system rather than assuming its output is automatically correct.


### Human-in-the-Loop Quality Assurance

AI-generated matchup guides are created using structured champion knowledge and stored as drafts.

I manually review and refine the content before marking guides as reviewed, helping ensure that published recommendations are accurate, relevant and useful to players.


## 03 — Scalability & Continuous Development

**Challenge**

LaneStomp gradually evolved from a relatively simple concept into an application with multiple interconnected features, data workflows and administrative tools.

As the project expanded, keeping the system maintainable and planning future improvements became increasingly important.

**Solution**

I organized development around smaller features, reusable components and dedicated workflows for managing content and data.

Using Next.js, TypeScript and Supabase, I worked on separating responsibilities between the user-facing application, server-side functionality, data storage and administrative tools.

I also prioritized incremental development, testing and reviewing changes before introducing additional functionality.

**What I learned**

Building a larger application requires continuous prioritization and a willingness to reconsider earlier decisions.

LaneStomp has strengthened my understanding of application architecture, technical trade-offs and the importance of controlling project scope.

`,
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase"],
    githubUrl: "https://github.com/SteinGansmoe/lanestomp",
    demoUrl: "https://www.lanestomp.com",
    imageUrl: "/projects/lanestomp/homepage.jpg",
    imageUrls: ["/projects/lanestomp/homepage.jpg", "/projects/lanestomp/logo.png"],
    isFeatured: true,
    sortOrder: 1,
  },
  {
    id: "holidaze",
    title: "Holidaze",
    slug: "holidaze",
    excerpt: "A venue booking platform built with React, TypeScript, and the Noroff API.",
    content: `## Project Overview

Holidaze Retreats is a responsive venue booking platform developed as my final Project Exam at Noroff Vocational School.

The goal was to create a complete booking experience where users could discover accommodation, explore venue details, make reservations and manage their bookings.

The application also supports venue managers, allowing them to create, edit and manage their own listings and view reservations made by guests.

Built with React, TypeScript and Tailwind CSS, Holidaze integrates with the Noroff API for authentication, venue management and bookings.

The project challenged me to combine frontend architecture, API integration and user experience into a functional application.

**Project Exam 2 - 99/100 points**

## My Role

**Frontend Developer · UI/UX Design · API Integration**

Holidaze was an individual development project in which I was responsible for designing, building and delivering the application.

My responsibilities included:

- Planning the application structure and user journeys.
- Designing the interface and creating a high-fidelity prototype in Figma.
- Building reusable React components using TypeScript and Tailwind CSS.
- Integrating the Noroff API for authentication, venue data and reservations.
- Implementing booking flows, date validation and availability checks.
- Developing separate functionality for guests and venue managers.
- Creating responsive layouts, loading states and user feedback.
- Testing, debugging and deploying the completed application to Vercel.

The project gave me practical experience in managing a larger frontend application, integrating external services and balancing technical requirements with usability.

## From Design to Implementation

Holidaze started with a design process in Figma, where I explored the visual identity, page layouts and user journeys before implementing the application.

My goal was to create a booking experience that felt modern, intuitive and consistent across different screen sizes.

During development, I translated the designs into reusable React components, using TypeScript and Tailwind CSS to maintain consistency throughout the application.

As the project progressed, I refined the interface to accommodate real API data, loading states, validation messages and different user roles.

The process taught me that frontend development involves more than reproducing a design. It requires continuously balancing visual quality, functionality, accessibility and usability.

**Design tool:** Figma

**Implementation:** React, TypeScript and Tailwind CSS

**Result:** A responsive booking platform supporting venue discovery, reservations and venue management.`,
    tags: ["React", "TypeScript", "Tailwind CSS", "Noroff API"],
    githubUrl: "https://github.com/SteinGansmoe/holidaze-retreats",
    demoUrl: "https://holidaze-retreats.vercel.app/",
    imageUrl: "/projects/holidaze/hero.png",
    imageUrls: [
      "/projects/holidaze/hero.png",
      "/projects/holidaze/venue-details.png",
      "/projects/holidaze/booking-confirm.png",
    ],
    designComparison: {
      figmaUrl:
        "https://www.figma.com/design/htw7KszeYpn37xAPXynCQJ/Holidaze?node-id=0-1&t=p1xDRaMkBhMfXCpt-1",
      // Original Figma export is missing. Do not substitute an application screenshot.
      implementationImage: {
        src: "/projects/holidaze/hero.png",
        alt: "Holidaze application homepage showing the booking introduction and venue listings",
      },
    },
    isFeatured: true,
    sortOrder: 2,
  },
];
