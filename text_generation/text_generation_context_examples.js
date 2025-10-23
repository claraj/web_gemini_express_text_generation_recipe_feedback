let { GoogleGenAI } = require("@google/genai")

const genAI = new GoogleGenAI( {} );

genAI.models.generateContent({
  model: 'gemini-2.5-flash',
  contents: `What promotional items should we give out at our conference booth? 
  We are a startup company selling logging and monitoring products and we'll be at VueConf US in this year.
  Last year we gave out pens and tote bags, the pens were not popular. The tote bags were popular but expensive `
}).then( resp => {
  console.log(resp.text)
})



