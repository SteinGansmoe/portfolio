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

LaneStomp is a League of Legends learning platform. Its current MVP focuses on matchup guidance, using champion combat profiles and role-specific advice.

## Documented features

- AI-powered matchup draft generation with an admin review and publishing workflow.
- Player-facing matchup pages and feedback on matchup card quality.
- Champion data imports using Riot Data Dragon.

## Technology

Next.js, React, TypeScript, Tailwind CSS, Supabase, and OpenAI.

## Source and recovery note

This summary is based on the [LaneStomp repository README](https://github.com/SteinGansmoe/lanestomp/blob/main/README.md). The homepage screenshot was captured from the live LaneStomp site on 18 October 2026. Its counter-pick and matchup navigation were verified on that site. The original portfolio case-study text and historical screenshots have not been recovered. No project results are claimed here.`,
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
    content: `## Project overview

Holidaze Retreats is a venue booking platform created for Project Exam 2. Users can browse venues, book stays, manage listings, and edit profiles through the Noroff API.

## Documented features

- Venue browsing, search, filters, and detail pages with image galleries.
- Bookings with date validation and conflict checking.
- Venue manager tools to create, edit, and delete listings and see bookings.
- Profile editing and booking receipts.

## Technology

React, TypeScript, Tailwind CSS, React Router, Vite, and the Noroff API.

## Source and recovery note

This summary is based on the [Holidaze Retreats repository README](https://github.com/SteinGansmoe/holidaze-retreats/blob/main/README.md). The home, venue details, and booking confirmation screenshots are copied from that repository. The original portfolio case-study text has not been recovered. No project results are claimed here.`,
    tags: ["React", "TypeScript", "Tailwind CSS", "Noroff API"],
    githubUrl: "https://github.com/SteinGansmoe/holidaze-retreats",
    demoUrl: "https://holidaze-retreats.vercel.app/",
    imageUrl: "/projects/holidaze/hero.png",
    imageUrls: [
      "/projects/holidaze/hero.png",
      "/projects/holidaze/venue-details.png",
      "/projects/holidaze/booking-confirm.png",
    ],
    isFeatured: true,
    sortOrder: 2,
  },
];
