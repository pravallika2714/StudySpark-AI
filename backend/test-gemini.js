require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function run() {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  // List models is not directly available on genAI in all SDK versions, but we can try fetching.
  // Actually, wait, let's just try 'gemini-1.5-flash-latest' and 'gemini-pro'.
  const modelNames = ['deep-research-preview-04-2026', 'deep-research-pro-preview-12-2025'];
  for (const name of modelNames) {
    console.log("Testing:", name);
    try {
      const model = genAI.getGenerativeModel({ model: name });
      const result = await model.generateContent('hello');
      console.log("SUCCESS for", name);
    } catch (e) {
      console.log("FAIL for", name, e.status, e.message);
    }
  }
  
  try {
    const result = await model.generateContent('hello');
    console.log(result.response.text());
  } catch (error) {
    console.log("STATUS:", error.status);
    console.log("STATUS TEXT:", error.statusText);
    console.log("DETAILS:", error.errorDetails);
    console.log("MESSAGE:", error.message);
  }
}
run();
