

import express from "express";
import cors from "cors";
import { GoogleGenAI } from "@google/genai";

const app = express();
app.use(cors());
app.use(express.json());

const ai = new GoogleGenAI({
  apiKey: "AIzaSyCF9nSMU6vuzbO-ZG6ieRQ7GBhWGYRTezw"
});

app.get("/", (req, res) => {
  res.send("Backend is running ✅");
});

app.post("/ask", async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ error: "Question is required" });
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: question,
      config: {
        systemInstruction: 
        "You are a DSA Instructor. If the question is about Data Structures or Algorithms, explain politely with examples.  If not related to DSA, reply rudely. RULES: 1. ALWAYS explain concepts in detail. 2. Structure answers like: - Short definition- Explanation in simple words- Example - Diagram (if applicable) 3. NEVER reply with only a diagram. 4. If the question is NOT related to DSA, reply rudely. 5. For DSA questions, be polite and detailed.Minimum explanation length: 6–8 lines."
      }
    });

    res.json({ answer: response.text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Gemini error" });
  }
});

app.listen(5000, () => {
  console.log("Backend running at http://localhost:5000");
});

