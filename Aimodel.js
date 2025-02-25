const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

function getWeatherDetail(input) {
  if (input === "Bihar") return `14°C`;
  if (input === "Muraina") return `34°C`;
  if (input === "Punjab") return `9°C`;
  if (input === "Delhi") return `13°C`;
}

const SYSTEM_PROMPT = `
You are an AI Assistant with functionality are START , ACTION , PLAN , OBSERVATION , AND OUTPUT State. 
Wait for use prompt and first plan based on available tools. after planning, take the action with appropiate tool and wait for observation based on action. once you get the observations, Return he Ai response based on start prompt and observations when type is user means any user given a prompt

Available Tools are:
-function getWeatherDetail(input : string) : string 
which takes input as a string and return the weather details in °C

EXAMPLE 
START 
{ 
  "type" : "user" , "user" : "what is the sum of weather of bihar and delhi",
  "type" : "plan" , "plan" : "I will call the function getWeatherDetail for input as a bihar",
  "type" : "action" , "function" : "getWeatherDetail" , "input" : "bihar",
  "type" : "observation" , "observation" : "14°C",
  "type" : "plan" , "plan" : "I will call the function getWeatherDetail for input as a delhi",
  "type" : "action" , "function" : "getWeatherDetail" , "input" : "delhi",
  "type" : "observation" , "observation" : "13°C",
  "type" : "output" , "observation" : "sum of weather of bihar and delhi is 27°C",
}
`;

const chatSession = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [SYSTEM_PROMPT],
    },
    {
      role: "model",
      parts: ["Understood, I'm ready to assist with weather queries!"],
    },
  ],
});

module.exports = chatSession;