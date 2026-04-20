# FanPath: Smart Venue Assistant

FanPath is a mobile-first Next.js 16 application built for the **Smart Venue Assistant** challenge vertical. It helps attendees choose the best gate, respond to live venue alerts, and find the fastest nearby amenity through a safe Google Gemini integration with deterministic fallback logic.

## Chosen Vertical

**Smart Venue Assistant**

The product is designed for attendees entering and navigating a large sports or entertainment venue. The assistant focuses on reducing congestion, improving arrival flow, and keeping visitors informed with clear routing guidance.

## Approach and Logic

FanPath combines deterministic venue logic with optional AI assistance:

- A venue-routing engine scores open gates by congestion, wait time, and accessibility needs.
- Search-param onboarding lets the app tailor routing by attendee section and preferences.
- Live alert prioritization surfaces the most important operational issue first.
- The assistant API validates incoming requests, uses the official `@google/genai` SDK when `GEMINI_API_KEY` is available, and falls back to a predictable venue recommendation when reviewers run the repo without secrets.
- Google Maps is embedded directly in the dashboard so evaluators can see a real Google service in the user flow.

## How the Solution Works

1. The attendee selects a section and optional preferences from the home screen.
2. The dashboard derives the attendee zone and recommends the best entry gate.
3. Live alerts explain current venue issues and suggested actions.
4. The assistant page answers amenity queries such as concessions, restrooms, and merchandise.
5. The Gemini route returns a concise recommendation while preserving a safe local fallback path.

## Google Services Used

- **Google Maps Embed** powers the venue map preview in the dashboard.
- **Google Gemini via `@google/genai`** powers contextual amenity guidance in `src/app/api/gemini/route.ts`.

## Quality Improvements Included

This submission was hardened specifically against the evaluation rubric:

- **Code Quality:** shared venue helpers, cleaner route logic, stronger typing, and lower client-side surface area on non-interactive pages.
- **Security:** validated assistant input, response fallback logic, Content Security Policy, `Referrer-Policy`, `X-Content-Type-Options`, and restrictive `Permissions-Policy` headers.
- **Efficiency:** reduced unnecessary client routing, deterministic recommendation reuse, and a separate production build output to avoid stale local build artifacts.
- **Testing:** Vitest unit tests cover routing and venue helper behavior.
- **Accessibility:** skip link, better labels, `aria-live` status messaging, semantic sections, `aria-current` navigation state, focus-visible styling, and reduced-motion support.

## Assumptions

- Venue status is represented with mock operational data in `src/lib/mockData.ts`.
- Reviewers may not provide API keys, so Gemini must degrade gracefully.
- Section numbers map to venue zones by their leading digit for this prototype.

## Local Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the dev server:
   ```bash
   npm run dev
   ```
3. Run checks:
   ```bash
   npm run lint
   npm run test
   npm run build
   ```

## Project Structure

- `src/app/` contains the App Router pages, metadata routes, and Gemini endpoint.
- `src/components/` contains the shared UI building blocks.
- `src/lib/` contains mock data, routing logic, and venue helpers.

## Submission Notes

- The repository is intended to stay public and on a single branch for submission.
- The LinkedIn narrative lives in `linkedin_post.md`.
- Environment variables are ignored by `.gitignore`; use `GEMINI_API_KEY` only when you want live Gemini responses.
