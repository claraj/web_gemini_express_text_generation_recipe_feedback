let { GoogleGenAI, Type } = require("@google/genai")

const genAI = new GoogleGenAI( {} );

const systemInstruction = `You are a recipe suggestion bot for a health-concious, budget-friendly website. 
    Suggest recipes that are low cost and use healthy ingredients. You don't have to use all the 
    ingredients the user enters, especially if they enter a lot of ingredients, but use as many as possible.`

function generateRecipeJSON(ingredients) {

    let prompt = `Suggest one recipe that uses these ingredients. Return the response in JSON format.
                Ingredients: ${ingredients}`

    return genAI.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            systemInstruction: systemInstruction,
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
    }).then(response => {
        // convert the JSON string to JavaScript objects 
        let responseText = response.text 
        let recipe = JSON.parse(responseText)
        return recipe
    })
}

function generateRecipeHTML(ingredients) {

    let prompt = `Suggest one recipe that uses these ingredients. 
                Return the recipe formatted with the recipe name, a list of ingredients, and a list of instructions
                Format the recipe using HTML. Only return the HTML, no extra formatting, no markdown.
                Ingredients: ${ingredients}`
    
    return genAI.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          systemInstruction: systemInstruction,
        }
      }).then( response => {
        return response.text    // hopefull valid HTML
    })
}

module.exports = { generateRecipeJSON, generateRecipeHTML }