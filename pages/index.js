import Head from 'next/head';
import Image from 'next/image';
import buildspaceLogo from '../assets/Frame 29.png';
import { useState } from 'react';
import logo from '/assets/output2.png';

const Home = () => {
  const [userInput, setUserInput] = useState('');

  const [apiOutput, setApiOutput] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  
  const callGenerateEndpoint = async () => {
    setIsGenerating(true);
    
    console.log("Calling OpenAI...")
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userInput }),
    });
  
    const data = await response.json();
    const { output } = data;
    console.log("OpenAI replied...", output.text)
  
    setApiOutput(`${output.text}`);
    setIsGenerating(false);
  }

  const onUserChangedText = (event) => {
   // console.log(event.target.value);
    setUserInput(event.target.value);
  };
  return (
    <div className="root">
      <Head>
        <title>Own Your Path w/S.A.R.A.</title>
      </Head>
      <div className="container">

      <div className="badge-container grow">
        <a
          href="http://opensourcerecovery.life"
          target="_blank"
          rel="noreferrer"
        >
          <div className="badge">
            <Image src={buildspaceLogo} alt="buildspace logo" />
            <p></p>
          </div>
        </a>
      </div>

        <div className="header">

        

          <div className="header-title">
          <Image
      
      src={logo}
      alt="logo for S.A.R.A."
      width={300}
      height={100}
    />
        
            
          </div>
          <div className="header-subtitle">
            <h2>Say hi to SARA. She's here to help you...</h2>
          </div>
        </div>
        <div className="prompt-container">
        <textarea
  className="prompt-box"
  placeholder="...start owning your path"
  value={userInput}
  onChange={onUserChangedText}
/>;
<div className="prompt-buttons">
  <a
    className={isGenerating ? 'generate-button loading' : 'generate-button'}
    onClick={callGenerateEndpoint}
  >
    <div className="generate">
    {isGenerating ? <span className="loader"></span> : <p>Generate</p>}
    </div>
  </a>
</div>

  {apiOutput && (
  <div className="output">
    <div className="output-header-container">
      <div className="output-header">
        <h3>Output</h3>
      </div>
    </div>
    <div className="output-content">
      <p>{apiOutput}</p>
    </div>
  </div>
)}


        </div>
      </div>
      <div className="badge-container grow">
        <a
          href="https://www.buymeacoffee.com/OSRecovery"
          target="_blank"
          rel="noreferrer"
        >
          <div className="badge">
            <Image src={buildspaceLogo} alt="buildspace logo" />
            <p></p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Home;
