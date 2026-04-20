import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import { buildFallbackRecommendation, isAssistantQuery, zoneFromSection } from '@/lib/venue';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    const { query, userContext, venueState } = await req.json();

    if (!isAssistantQuery(query)) {
      return NextResponse.json({ success: false, error: 'Unsupported assistant query.' }, { status: 400 });
    }

    const section = typeof userContext?.section === 'string' ? userContext.section : '101';
    const fallbackRecommendation = buildFallbackRecommendation(query, {
      currentZone: zoneFromSection(section),
    });

    const apiKey = process.env.GEMINI_API_KEY;

    if (apiKey) {
      const ai = new GoogleGenAI({ apiKey });
      const prompt = `You are StadiumFlow AI, a smart assistant for a large venue.
Context:
User Section: ${section}
Venue State: ${JSON.stringify(venueState)}
User's Question: What is the fastest ${query} nearby?
Expected fallback route: ${fallbackRecommendation.reason}

Respond with a concise, helpful 1-2 sentence recommendation on where they should go based on the venue state wait times. Include an encouraging tone.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      return NextResponse.json({
        success: true,
        recommendation: {
          ...fallbackRecommendation,
          reason: response.text?.trim() || fallbackRecommendation.reason,
        },
      });
    }

    return NextResponse.json({
      success: true,
      recommendation: fallbackRecommendation,
    });
  } catch (error) {
    console.error('Gemini AI Error:', error);
    return NextResponse.json({ success: false, error: 'Failed to process request' }, { status: 500 });
  }
}
