let { GoogleGenAI } = require("@google/genai")
let fs = require('fs')

const genAI = new GoogleGenAI( {} );

genAI.models.generateContent({
  model: 'gemini-2.5-flash',
  contents: 'what is cheese'
}).then( resp => console.log(resp.text))

  


