// src/App.js
import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import "./App.css";

const socket = io.connect("https://kuvakchat-server.onrender.com");

function App() {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  useEffect(() => {
    // Set the username received from the server
    socket.on("setUsername", (username) => {
      setUsername(username);
    });

    // Listen for messages from the server
    socket.on("message", (data) => {
      setChat([...chat, data]);
    });
  }, [chat]);

  const sendMessage = () => {
    if (message.trim() !== "") {
      socket.emit("message", message);

      setMessage("");
    }
  };

  return (
    <div className="App">
      <div>
        <h2 className=" header">Welcome, {username}!</h2>
        <div className="chat-container">
          {chat.map((item, index) => (
            <div
              key={index}
              className={item.username === username ? "sent" : "received"}
            >
              <h1>{item.username}</h1>
              <p  className='message'>{item.message}</p>
            </div>
          ))}
        </div>
        <div>
          <input
            type="text"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default App;
