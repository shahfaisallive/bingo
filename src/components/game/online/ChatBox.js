import React, { useState } from "react";
import "./ChatBox.css";

const ChatBox = ({ messages, numberHistory }) => {
  const [message, setMessage] = useState("");

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      // Functionality to send message will be added later
      setMessage("");
    }
  };

  return (
    <div className="chatbox-container">
      <div className="chatbox-header">
        <h4>Chat</h4>
      </div>
      <div className="chatbox-messages">
        {messages.map((msg, index) => (
          <div key={index} className="chat-message">
            <span className="chat-user">{msg.user}:</span> {msg.text}
          </div>
        ))}
        {numberHistory.map((entry, index) => (
          <div key={index} className="number-history">
            <span className="number-played">{entry.number}</span>{" "}
            <span className="played-by">played by {entry.player}</span>
          </div>
        ))}
      </div>
      <div className="chatbox-input">
        <input
          type="text"
          value={message}
          onChange={handleMessageChange}
          placeholder="Type your message..."
          className="chat-input-field"
        />
        <button onClick={handleSendMessage} className="send-button">
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
