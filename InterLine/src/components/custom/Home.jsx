import React, { useState } from 'react';
import run from '@/utils/ai.api.js';
import { AI_HISTORY } from '@/constants.js'

const Home = () => {
  const [chatHistory, setChatHistory] = useState(AI_HISTORY);
  const [userInput, setUserInput] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [loading, setLoading] = useState(false); // Add loading state

  const handleSendMessage = async () => {
    if (userInput.trim() === '') return;

    setLoading(true); // Set loading to true while waiting for response
    try {
      const { response, history } = await run(userInput, chatHistory);
      setAiResponse(response);
      setChatHistory(history);
      setUserInput('');
    } catch (error) {
      console.error("Error during API call:", error);
      // Handle error, e.g., display an error message to the user
      setAiResponse("An error occurred. Please try again later.");
    } finally {
      setLoading(false); // Set loading back to false
    }
  };

  return (
    <div>
      <h1>Chat with Gemini</h1>
      <div className="chat-history">
        {chatHistory.map((message, index) => (
          <div key={index} className={`message ${message.role}`}>
            {message.parts[0].text}
          </div>
        ))}
        {loading && <div className="message loading">Thinking...</div>} {/* Display loading indicator */}
        {aiResponse && !loading && <div className="message model">{aiResponse}</div>} {/* Only show response if not loading */}
      </div>
      <input
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        disabled={loading} // Disable input while loading
      />
      <button onClick={handleSendMessage} disabled={loading}> {/* Disable button while loading */}
        {loading ? "Sending..." : "Send"}
      </button>
    </div>
  );
};

export default Home;