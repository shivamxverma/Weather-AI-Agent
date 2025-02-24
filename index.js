const generateContent = require('./Aimodel');

(async () => {
  const prompt = "Hey what is weather of Delhi Now";
  const answer = await generateContent(prompt);
  console.log(answer);
})();