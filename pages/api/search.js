const searchClient = new CustomSearch({
    apiKey: 'YOUR_CSEARCH_API_KEY',
    engineId: 'YOUR_CSEARCH_ENGINE_ID'
  });
  
  const generateAction = async (req, res) => {
    console.log(`API: ${basePromptPrefix}${req.body.userInput}`)
  
    const baseCompletion = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `${basePromptPrefix}${req.body.userInput}\n`,
      temperature: 0.8,
      max_tokens: 550,
    });
    
    const basePromptOutput = baseCompletion.data.choices.pop();
  
    // Perform the search
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
  