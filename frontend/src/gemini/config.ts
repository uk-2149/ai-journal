import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY});

async function analyzeMood(text: string): Promise<{
    happy: number;
    sad: number;
    angry: number;
    stressed: number;
}> {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: `Analyze the emotional tone of the following text and provide percentage scores (0-100) for the emotions Happy, Sad, Angry, and Stressed to best accuracy you can. Return the result as a JSON object with keys 'happy', 'sad', 'angry', 'stressed'. Ensure the percentages sum to 100. No explanation, only JSON file. Text: ${text}`,
  });

  const raw = response.text;

  if (!raw) {
    throw new Error("No response text received from Gemini.");
  }
  console.log(raw);
  const cleanedText = raw.replace(/```json\n?|```/g, "").trim();
  const parsedResult = JSON.parse(cleanedText);
  console.log(parsedResult);
    return {
        happy: parsedResult.happy || 0,
        sad: parsedResult.sad || 0,
        angry: parsedResult.angry || 0,
        stressed: parsedResult.stressed || 0,
      };
}

export default analyzeMood;
