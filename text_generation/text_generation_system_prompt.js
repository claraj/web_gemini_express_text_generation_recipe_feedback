let { GoogleGenAI } = require("@google/genai")

const genAI = new GoogleGenAI( {} );

let userInput = 'I have eggs, broccoli and leftover chicken'

let prompt = `Suggest one recipe that uses these ingredients.
Ingredients: ${userInput}`

genAI.models.generateContent({
  model: 'gemini-2.5-flash',
  contents: prompt,
  config: {
    systemInstruction: `You are a recipe suggestion bot for a health-concious, budget-friendly website. 
    Suggest recipes that are low cost but use healthy ingredients.`
  }
}).then( resp => console.log(resp.text))

  
