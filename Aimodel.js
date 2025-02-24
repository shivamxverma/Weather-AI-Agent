const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI('');
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});
async function generateContent(prompt) {
  const res = await model.generateContent(prompt);
  return res.response.text();
}
module.exports = generateContent;