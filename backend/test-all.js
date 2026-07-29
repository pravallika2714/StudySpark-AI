require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function run() {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GEMINI_API_KEY}`);
  const data = await res.json();
  const models = data.models.filter(m => m.supportedGenerationMethods.includes('generateContent')).map(m => m.name.replace('models/', ''));
  
  for (const name of models) {
    try {
      const model = genAI.getGenerativeModel({ model: name });
      await model.generateContent('hello');
      console.log("SUCCESS for", name);
    } catch (e) {
      console.log("FAIL for", name, e.status, e.message);
    }
  }
}
run();
