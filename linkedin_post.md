# Built FanPath: a Smart Venue Assistant

I just wrapped **FanPath**, a mobile-first web app built for the **Smart Venue Assistant** challenge.

The idea is simple: large venues are stressful when you are trying to enter quickly, avoid congestion, and still find food, restrooms, or merchandise without wasting time. FanPath helps attendees make better decisions in real time.

## What FanPath does

- Recommends the best entry gate based on section, congestion, and accessibility needs.
- Surfaces live venue alerts with clear suggested actions.
- Uses **Google Maps** to keep venue context visible.
- Uses **Google Gemini** through the official `@google/genai` SDK for amenity guidance, with a deterministic fallback so the experience still works without secrets.

## What I focused on technically

- **Next.js 16 + TypeScript** for a modern App Router architecture.
- Stronger **accessibility** with semantic sections, skip navigation, better form labels, focus states, and live status messaging.
- Better **security** with validated API inputs and production headers like CSP and `Referrer-Policy`.
- Better **testing** with Vitest coverage for the core routing logic.
- Cleaner **maintainability** by moving venue decisions into shared helper modules.

This project was a great exercise in combining product thinking, routing logic, real-world UX constraints, and Google service integration into one focused assistant experience.

Repo: [Add your GitHub repo link here]
Live preview: [Add your deployed link here]

#Nextjs #TypeScript #GoogleAI #GeminiAPI #GoogleMaps #WebDevelopment #Hackathon #Accessibility #SoftwareEngineering
