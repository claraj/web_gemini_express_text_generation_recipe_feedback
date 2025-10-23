let { GoogleGenAI, Type } = require("@google/genai")
let departments = require("./departments.json")

const genAI = new GoogleGenAI( {} );

function selectDepartments(message) {

    let departmentString = JSON.stringify(departments) 

    let prompt = `Return a list of the most likely departments to handle the following message.
    Only include departments which seem to be a good fit for the message.
    If there does not seem to be a good fit, return an empty list. 
    message: ${message}
    department choices: ${departmentString}`

    return genAI.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            responseMimeType: 'application/json',
            responseSchema: {
                type: Type.ARRAY,
                items: {
                    type: Type.STRING
                }
            }
        }
    })
}

module.exports = selectDepartments

