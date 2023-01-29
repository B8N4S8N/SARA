import { Configuration, OpenAIApi } from 'openai';
import axios from 'axios';
import { customsearch } from '@googleapis/customsearch';

//require('dotenv').config();

//const { customsearch } = require('@googleapis/customsearch');

//const searchClient = new CustomSearch({
//  apiKey: 'YOUR_CSEARCH_API_KEY',
//  engineId: 'YOUR_CSEARCH_ENGINE_ID'
//});

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const basePromptPrefix = 
`
  your name is SARA. short for Serenium's AI Recovery Assistant. Serenium is also known as the serenity coin. It is the proof of attendance powered governance token for Open Source Recovery a user owned Chemical Dependency DAO built on Polygon (Matic). The peers that talk to you get rewarded with Serenium for making positive changes in their lives, and showing up to scheduled chemical dependency meetings/classes, providing clean UA's etc, engagng with peer support and attending recovery centered groups.   You are highly trained in the addiction recovery field. You are kind, compassionate, caring, and always see the best in people, but you are a little brash and direct with your delivery. You want to help people develop themselves and help them as they create a new path forward. You are here for mental health and peer support. You will abide by all ethics of a mental health care professional and be focused on providing caring support by being an advocate for peers. 
  
  SARA:
`;
const generateAction = async (req, res) => {
  // Run first prompt
  console.log(`API: ${basePromptPrefix}${req.body.userInput}`)

  //// Add a check to see if user input includes a specific keyword or phrase indicating they want to search for something
    if(req.body.userInput.toLowerCase().includes("search")) {
  // Make a call to the Google Search API using axios
  const searchResults = await axios.get(`https://www.googleapis.com/customsearch/v1?q=${req.body.userInput}&key=${process.env.GOOGLE_SEARCH_API_KEY}&cx=${process.env.GOOGLE_SEARCH_CX_KEY}`);

  // Extract the first result from the search results
const firstResult = searchResults.data.items[0];
// Use the first result as the input for ChatGPT
const baseCompletion = await openai.createCompletion({
model: 'text-davinci-003',
prompt:`${basePromptPrefix}${firstResult.title} - ${firstResult.link}\n`,
temperature: 0.8,
max_tokens: 550,
});
} else {
// Run the normal prompt
const baseCompletion = await openai.createCompletion({
model: 'text-davinci-003',
prompt: `${basePromptPrefix}${req.body.userInput}\n`,
temperature: 0.8,
max_tokens: 550,
});
}

const basePromptOutput = baseCompletion.data.choices.pop();

const [results] = await searchClient.search(req.body.userInput);
let searchOutput = '';
if (results.length > 0) {
  searchOutput = `I found the following results for "${req.body.userInput}":`;
  results.forEach(result => {
    searchOutput += `\n\n- ${result.title}: ${result.link}`;
  });
} else {
  searchOutput = `I'm sorry, I couldn't find any results for "${req.body.userInput}".`;
}

// Include the search results in the output
const finalOutput = `${basePromptOutput}\n\n${searchOutput}`;


res.status(200).json({ output: finalOutput });
};

export default generateAction;
