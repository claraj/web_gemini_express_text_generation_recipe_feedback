let { GoogleGenAI, Type } = require("@google/genai")

let genAI = new GoogleGenAI( {} );

let userInput = 'I have eggs, broccoli and leftover chicken'

let prompt = `Suggest one recipe that uses these ingredients.
Ingredients: ${userInput}`

genAI.models.generateContent({
  model: 'gemini-3.1-flash-lite',
  contents: prompt,
  config: {
    systemInstruction: `You are a recipe suggestion bot for a health-concious, budget-friendly website. 
    Suggest recipes that are low cost and use healthy ingredients.`,
    responseMimeType: 'application/json',
    responseSchema: {
      type: Type.OBJECT,
      properties: {
        recipeName: {   
          type: Type.STRING
        },
        description: {   
          type: Type.STRING
        },
        ingredients: {
          type: Type.ARRAY,
          items: {
            type: Type.STRING
          }
        },
        instructions: {
          type: Type.ARRAY,
          items: {
            type: Type.STRING
          }
        }
      }
    }
  }
}).then( resp => {
  let recipe = JSON.parse(resp.text)
  console.log(recipe)
  console.log(recipe.recipeName)
})







