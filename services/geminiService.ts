import { GoogleGenAI } from "@google/genai";
import { AspectRatio } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateDesignImage = async (
  prompt: string,
  aspectRatio: AspectRatio
): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: prompt }],
      },
      config: {
        imageConfig: {
          aspectRatio: aspectRatio,
        },
      },
    });

    if (!response.candidates || response.candidates.length === 0) {
      throw new Error("No candidates returned from Gemini.");
    }

    const parts = response.candidates[0].content.parts;
    let imageUrl = "";

    for (const part of parts) {
      if (part.inlineData) {
        const base64EncodeString = part.inlineData.data;
        imageUrl = `data:${part.inlineData.mimeType};base64,${base64EncodeString}`;
        break; 
      }
    }

    if (!imageUrl) {
      throw new Error("No image data found in the response.");
    }

    return imageUrl;
  } catch (error) {
    console.error("Error generating image:", error);
    throw error;
  }
};
