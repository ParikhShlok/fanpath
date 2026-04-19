# StadiumFlow: Smart Venue Assistant

StadiumFlow is a dynamic, mobile-first web application designed to eliminate crowd congestion and elevate the attendee experience at large-scale sporting venues. Built explicitly for the **Smart Venue Assistant** vertical, this Next.js app provides real-time, context-aware routing, crowd management warnings, and an AI-driven smart assistant.

## The Chosen Vertical
**Smart Venue Assistant:** We focus on optimizing attendee flow, ensuring the fastest entry times and providing real-time operational context (e.g., shortest food/merch lines).

## Approach and Logic
StadiumFlow operates on real-time simulated queue mapping. Our routing logic (`getBestGate`) processes a user's specific venue section and preferences (such as VIP access or ADA compliance requirement) against the live capacities of all entry gates. 
- It actively re-routes users from congested gates to optimal alternatives. 
- The smart assistant evaluates spatial awareness to recommend the fastest path to concessions, restrooms, or merchandise.

## How the Solution Works
1. **User Onboarding Phase:** Attendee enters their ticket section and personal preferences.
2. **Dashboard Overview:** The user is met with live venue alerts, an interactive entry map (featuring Google Maps integration), and a calculated optimal entry route.
3. **Smart Assistant Querying:** Users can prompt the AI Assistant for recommendations on amenities. 
4. **Google Services Integration:** 
   - **Google Maps Embed API:** Pinpoints and interactive overview of the destination natively within the Dashboard.
   - **Google Gemini AI SDK (`@google/genai`):** Built-in integration endpoint that simulates live prompt-processing to yield real-time pathing recommendations, proving out dynamic API implementations.

## Assumptions Made
1. **Venue Capacity Data:** We assume access to live venue tracking APIs (simulated in our app via mock context states).
2. **Connectivity:** We assume attendees possess reliable mobile connectivity to actively utilize the live updates.
3. **AI Fallbacks:** For the purpose of seamless Hackathon evaluation, our Google Gemini AI router provides an offline mock fallback in the event that `.env` API keys are missing on the evaluator's system, guaranteeing zero friction during review.

## Setup Instructions

Ensure your machine fulfills the prerequisites (Node, Git). The repository size is well under 1MB.

1. Clone the repository and navigate inside.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the application:
   ```bash
   npm run dev
   ```
4. Accessible at [http://localhost:3000](http://localhost:3000). To perfectly evaluate the Pro-Designer Mobile-First interface, view through Developer Tools Device Emulation (e.g., iPhone 14 Pro view).

---
*Built within the Antigravity Environment.*
