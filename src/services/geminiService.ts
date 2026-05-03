import { GoogleGenAI } from "@google/genai";
import { INITIAL_PLAYERS } from "../data/players";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const SYSTEM_INSTRUCTION = `
You are the "Elite Strategist", an AI cricket analyst for the Elite Squad Builder app.
Your tone is professional, technical, and high-end.

Context:
The user is building a fantasy cricket team with a budget of 100 Cr.
Available Players:
${JSON.stringify(INITIAL_PLAYERS.map(p => ({ name: p.name, role: p.role, price: p.price, rating: p.rating })))}

Task:
1. Suggest pitch conditions (e.g., Green Top, Dust Bowl, Flat Track).
2. Recommend specific players from the list above based on those conditions.
3. Help users optimize their budget while maintaining high team ratings.

Pitch Condition Examples behavior:
- Green Top: Suggest fast bowlers (Bumrah, Boult, Starc, Cummins).
- Dust Bowl: Suggest spinners (Rashid Khan).
- Flat Track: Suggest high-impact batters (Kohli, Rohit, Smith, Williamson).

Always refer to players by their full names as listed.
Be concise but insightful.
`;

export async function getAnalystResponse(message: string, chatHistory: { role: string, text: string }[] = []) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        ...chatHistory.map(h => ({ role: h.role === 'user' ? 'user' : 'model', parts: [{ text: h.text }] })),
        { role: 'user', parts: [{ text: message }] }
      ],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having trouble analyzing the pitch right now. Please try again later.";
  }
}
