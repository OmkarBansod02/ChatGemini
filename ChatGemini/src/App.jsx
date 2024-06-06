
import './App.css'
import gptLogo from './assets/chatgpt.svg';
import addBtn from './assets/add-30.png';
import msgIcon from './assets/message.svg';
import home from './assets/home.svg';
import saved from './assets/bookmark.svg';
import rocket from './assets/rocket.svg';
import sendBtn from './assets/send.svg';
import userIcon from './assets/user_icon.png';
import gptImgLogo from './assets/chatgptLogo.svg';
import { sendMsgTogoogleAi } from './Gemini';
import { useEffect, useRef, useState } from 'react';


 
function App(){
  const msgEnd = useRef(null);

  const [input, setInput] = useState("")
  const [messages, setMessages] = useState([
    {
    text: "Hii I am ChatGemini, How can i help you ?",
    isBot: true,
  }
]);

useEffect(() => {
  msgEnd.current.scrollIntoView();
},[messages])



  const handleSend = async () =>{
    const text = input;
    setInput("");
    setMessages([
      ...messages,
      {text, isBot: false }
    ])
    const res = await sendMsgTogoogleAi(text);
    setMessages([
      ...messages,
      { text, isBot:false},
      {text: res, isBot:true}
    
    ]);
    console.log(res);
  }

const handleEnter = async (e) => {
  if(e.key === 'Enter') await handleSend();
}

const handleQuery = async (e)=>{
    const text = e.target.value;
    setMessages([
      ...messages,
      {text, isBot: false }
    ])
    const res = await sendMsgTogoogleAi(text);
    setMessages([
      ...messages,
      { text, isBot:false},
      {text: res, isBot:true}
    
    ]);
    console.log(res);
  
};


  return (
    <div className="App">
      <div className="sideBar">
        <div className="upperSide">
        <div className="upperSideTop"><img src={gptLogo} alt="logo" className="logo" /><span className='brand'>ChatGemini</span></div>
        <button className="midBtn"onClick={() => (window.location.reload())}><img src={addBtn} alt="new chat" className="addBtn" />New Chat</button>
        <div className="upperSideQue">
          <button className='query' onClick={handleQuery} value={"Give me 10 Simple to Advance project ideas in React.js"}><img src={msgIcon} alt="Query" />React Project Ideas </button>
          <button className='query' onClick={handleQuery} value={"What is MERN Stack?"}><img src={msgIcon} alt="Query" />What is MERN Stack?</button>
          <button className='query' onClick={handleQuery} value={" I want to make a finance trading app in React with real time data. Give me the code for that "}><img src={msgIcon} alt="Query" /> finance trading app Project </button> 
          <button className='query' onClick={handleQuery} value={" What are Hooks in React js "}><img src={msgIcon} alt="Query" /> Learn About Hooks </button> 
          
          </div>
        
        </div>
        <div className="lowerSide">
            <div className="listItems"><img src={home} alt="home" className="listitemsImg" />Home</div>
            <div className="listItems"><img src={saved} alt="Saved" className="listitemsImg" />Saved</div>
            <div className="listItems"><img src={rocket} alt="upgrade" className="listitemsImg" />Upgrade to pro</div>

        </div>
      </div>
      <div className="main"> 
      <div className="chats">
       
        {messages.map((message, i) =>
          <div key={i} className={message.isBot?"chat bot":"chat"}><img className='chatImg' src={message.isBot?gptImgLogo:userIcon} alt="" /><p className="text">{message.text}</p>
          </div>
        )}

        <div ref={msgEnd}/>
      </div>
      <div className="chatFooter">
        <div className="inp">
          <input type='text' placeholder='send a message' value={input} onKeyDown={handleEnter} onChange={(e)=>{setInput(e.target.value)}} /><button className="send" onClick={handleSend}><img src={sendBtn} alt="" /></button>
        </div>
        <p>ChatGemini may produce inaccurate informationabout people, places, or facts. ChatGemini June 2 Version. </p>
      </div>  
      </div>
    
    </div>

  )
}

export default App;
