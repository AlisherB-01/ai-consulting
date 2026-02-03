import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.AI_API_KEY,
  baseURL: process.env.AI_BASE_URL,
  defaultHeaders: {
    "HTTP-Referer": "http://localhost:5173", 
    "X-Title": "AI Chat Project", 
  },
});

export const getAICompletion = async (userMessage) => {
  try {
    const completion = await openai.chat.completions.create({

      model: "stepfun/step-3.5-flash:free", //я взял модель из openrouter
      messages: [{ role: "user", content: userMessage }],
    });

    return completion.choices[0].message.content;
  } catch (error) {
    if (error.response) {
      console.error("OpenRouter Error Data:", error.response.data);
    } else {
      console.error("API Error:", error.message);
    }
    throw new Error(error.message);
  }
};
