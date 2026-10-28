let { GoogleGenAI } = require("@google/genai")

const genAI = new GoogleGenAI( {} );

genAI.models.generateContent({
  model: 'gemini-3.1-flash-lite',
  contents: 'What promotional items should we give out at our conference booth?'
}).then( resp => {
  console.log(resp.text)
})



