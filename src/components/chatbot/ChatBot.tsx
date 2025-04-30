import React, { useState } from "react";
import axios from "axios";

interface Message {
  sender: "user" | "bot";
  text: string;
}

const ChatBot: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);

  const handleSend = async () => {
    if (!query.trim()) return;

    const userMessage: Message = { sender: "user", text: query };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const res = await axios.post("http://127.0.0.1:8000/query", { query });

      const botMessage: Message = {
        sender: "bot",
        text: res.data.response,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      const errMsg: Message = {
        sender: "bot",
        text: "Oops! Something went wrong 😬",
      };
      setMessages((prev) => [...prev, errMsg]);
      console.error("API Error:", error);
    }

    setQuery("");
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>⚙️ Maintenance ChatBot</h2>
      <div style={styles.chatBox}>
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              ...styles.message,
              alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
              backgroundColor:
                msg.sender === "user" ? "#FFD70030" : "#FFFFFF10",
              color: "#FFD700",
              border: "1px solid #FFD70066",
            }}
          >
            <b>{msg.sender === "user" ? "You" : "Bot"}:</b> {msg.text}
          </div>
        ))}
      </div>
      <div style={styles.inputBox}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask something..."
          style={styles.input}
        />
        <button onClick={handleSend} style={styles.button}>
          Send
        </button>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    maxWidth: "500px",
    margin: "50px auto",
    padding: "20px",
    fontFamily: "sans-serif",
    backgroundColor: "#121212",
    border: "1px solid #FFD70033",
    borderRadius: "12px",
    color: "#FFD700",
  },
  header: {
    textAlign: "center",
    color: "#FFD700",
    marginBottom: "20px",
  },
  chatBox: {
    minHeight: "300px",
    maxHeight: "400px",
    overflowY: "auto",
    padding: "10px",
    backgroundColor: "#1e1e1e",
    borderRadius: "8px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginBottom: "20px",
    border: "1px solid #FFD70033",
  },
  message: {
    padding: "10px",
    borderRadius: "8px",
    maxWidth: "80%",
    fontSize: "14px",
  },
  inputBox: {
    display: "flex",
    gap: "10px",
  },
  input: {
    flex: 1,
    padding: "10px",
    fontSize: "16px",
    borderRadius: "6px",
    border: "1px solid #FFD70066",
    backgroundColor: "#2c2c2c",
    color: "#FFD700",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#FFD700",
    color: "#121212",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default ChatBot;
