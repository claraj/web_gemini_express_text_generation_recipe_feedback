let { GoogleGenAI } = require("@google/genai")

const genAI = new GoogleGenAI( {} );

genAI.models.generateContent({
  model: 'gemini-3.1-flash-lite',
  contents: 'When was the last major AWS outage?'
}).then( resp => {
  console.log(resp.text)
})


