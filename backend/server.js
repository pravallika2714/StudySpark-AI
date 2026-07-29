const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const PORT = process.env.PORT || 5000;

// Configure CORS: support a comma-separated whitelist via FRONTEND_URL
// If FRONTEND_URL is unset, fall back to permissive CORS (useful for quick testing)
const FRONTEND_URL = process.env.FRONTEND_URL || '';
const allowedOrigins = FRONTEND_URL
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (e.g., curl, server-to-server)
      if (!origin) return callback(null, true);
      if (allowedOrigins.length === 0) return callback(null, true); // permissive if not configured
      if (allowedOrigins.indexOf(origin) !== -1) return callback(null, true);
      return callback(new Error('CORS policy: Origin not allowed'), false);
    },
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Note: explicit app.options('*', cors()) can break on some router/path-to-regexp versions;
// the global CORS middleware above handles preflight requests, so no explicit options route is needed.
app.use(express.json());

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const SYSTEM_PROMPT = `
You are an educational AI tutor.
Convert the user's notes into effective study material.
Return ONLY valid JSON.
Do not use markdown.
Do not use code fences.
Generate between 8 and 12 flashcards.
Generate exactly 10 multiple-choice questions.
Each question must have exactly four options.
Only one option should be correct.
Questions should test understanding instead of simple memorization.
Keep explanations short and educational.
Never output anything outside the JSON object.

The JSON MUST exactly match this schema:
{
  "flashcards": [
    {
      "question": "string",
      "answer": "string"
    }
  ],
  "quiz": [
    {
      "question": "string",
      "options": ["string", "string", "string", "string"],
      "correctAnswer": "string",
      "explanation": "string"
    }
  ]
}`;

app.post('/api/generate', async (req, res) => {
  const { notes } = req.body;

  if (!notes || notes.trim() === '') {
    return res.status(400).json({ error: 'Input notes cannot be empty.' });
  }

  // 8. Verify the API key is loaded correctly
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'your_gemini_api_key_here') {
    return res.status(401).json({ 
      error: 'Invalid or missing Gemini API Key.',
      details: 'Please provide a valid API key in backend/.env.'
    });
  }

  try {
    // 2, 3, 4, 5. Verify and configure the model according to the latest SDK
    const model = genAI.getGenerativeModel({
      model: 'gemini-flash-latest',
      systemInstruction: SYSTEM_PROMPT,
      generationConfig: {
        responseMimeType: 'application/json',
      },
    });

    const result = await model.generateContent(notes);
    const response = await result.response;
    let text = response.text();

    text = text.replace(/^```json\s*/i, '').replace(/\s*```$/i, '').trim();

    let parsedData;
    try {
      parsedData = JSON.parse(text);
    } catch (parseError) {
      console.error('Failed to parse Gemini output:', text);
      return res.status(502).json({
        error: 'Received malformed JSON from the AI. Please try again.',
        details: parseError.message
      });
    }

    if (!parsedData.flashcards || !Array.isArray(parsedData.flashcards) || !parsedData.quiz || !Array.isArray(parsedData.quiz)) {
       return res.status(502).json({
        error: 'The AI response was missing required flashcards or quiz fields.',
        details: 'Schema validation failed.'
      });
    }

    return res.json(parsedData);

  } catch (error) {
    console.error('Error generating content:', error);
    
    // 6. Print the complete SDK error object for debugging
    console.dir(error, { depth: null });
    
    // 7. Do not suppress SDK errors
    return res.status(500).json({
      error: 'An error occurred while communicating with the Google Gemini API.',
      details: error.message || error.statusText || 'Unknown SDK Error',
      status: error.status
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Health check route for Render / uptime monitoring
app.get('/', (req, res) => {
  res.json({ status: 'ok', env: process.env.NODE_ENV || 'development' });
});
