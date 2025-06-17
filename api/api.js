import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { app } from './app.js';

dotenv.config();

const port = process.env.PORT || 2001;

// Initialize Gemini model
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const generationConfig = {
  stopSequences: ["\n\n"],
  maxOutputTokens: 200,
  temperature: 0.7,
  topP: 0.9,
  topK: 20,
};

const model = genAI.getGenerativeModel(
  { model: "gemini-1.5-flash" },
  generationConfig
);

// History buffer
let history = [];

// Utility to run generic prompts
async function run(prompt = "") {
  try {
    const historyContext = history.join('\n') + '\n' + prompt;
    const result = await model.generateContent(historyContext);
    const response = result.response;
    const text = await response.text(); // await is important
    history.push(prompt, text);

    if (history.length > 20) {
      history = history.slice(-20); // Keep last 10 pairs
    }

    return text;
  } catch (error) {
    console.error('Error generating content:', error.message);
    throw error;
  }
}

// Special prompt for itinerary planning
async function generateItinerary(prompt = "") {
  return run(prompt); // Currently same logic
}

// Start server
app.listen(port, () => {
  console.log(`✅ Server running on http://localhost:${port}`);
});

// Generic chat endpoint
app.post("/api", async (req, res) => {
  const { text } = req.body;
  console.log("📥 Chat Prompt Received:", text);

  if (!text) {
    return res.status(400).json({ error: "Missing prompt text" });
  }

  try {
    const data = await run(text);
    res.json({ generatedText: data });
  } catch (error) {
    res.status(500).json({ error: "Failed to generate content" });
  }
});

// Travel planning endpoint
app.post("/api/plan", async (req, res) => {
  const { name, destination, startDate, endDate, budget, preferences } = req.body;

  if (!name || !destination || !startDate || !endDate || !budget || !preferences) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const prompt = `
Return a full 4-day itinerary for ${name} traveling to ${destination} from ${startDate} to ${endDate}, 2025.

Include:
- 3–6 activities per day (meals, attractions, events)
- Structured time blocks: morning, lunch, afternoon, evening, night
- Exact place names
- Output format as JSON array like:
[
  {
    "day": "Day 1",
    "date": "2025-04-25",
    "activities": [
      { "time": "8:00 AM", "title": "Breakfast", "place": "Cafe Mocha" },
      { "time": "10:00 AM", "title": "Museum visit", "place": "National Art Gallery" }
    ]
  }
]
Preferences: ${preferences}. Budget: ₹${budget}.
`;

  try {
    const data = await generateItinerary(prompt);
    res.json({ generatedText: data });
  } catch (error) {
    res.status(500).json({ error: "Failed to generate itinerary" });
  }
});
