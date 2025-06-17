import Navbar from './components/navbar/navbar';
import Buttons from './components/buttons/buttons.js';
import Hero from './components/hero/hero.js';
import './App.css';
import Footer from './components/footer/footer.js';
import Appoint from './components/appoint/appoint.js';
import Services from './components/services/services.js';
import Chatbox from './components/chat_bot/chatbox.js';
import { useState } from 'react';

function App() {
  const [displayChat, setChat] = useState(false);

  const closeChatbox = () => {
    setChat(false);
  };

  const toggleChatbox = (e) => {
    e.stopPropagation();
    setChat(!displayChat);
  };

  const handleChatboxClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="App poppins-regular" onClick={closeChatbox}>
      <Navbar />
      <Hero />
      <Buttons />
      <Appoint />
      <Services />
      <Footer />

      {/* Toggle Button fixed bottom right */}
      <button className="chat-toggle-btn" onClick={toggleChatbox} aria-label="Toggle chatbox">
        {displayChat ? "✕" : "💬"}
      </button>

      {/* Chatbox fixed above toggle button */}
      {displayChat && (
        <div className="chatbox-container" onClick={handleChatboxClick}>
          <Chatbox />
        </div>
      )}
    </div>
  );
}


export default App;
