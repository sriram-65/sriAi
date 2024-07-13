const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const cors = require('cors');
require('dotenv').config(); 

const app = express();
app.use(express.json());
app.use(cors());

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

app.post('/generate-story', async (req, res) => {
  const { prompt } = req.body;
  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();
    res.json({ story: text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to generate story' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});