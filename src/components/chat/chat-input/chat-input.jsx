import './chat-input.scss';
import { useState } from 'react';
import { socket } from '@/services/socket';

function ChatInput({
  setMessages,
  selectedLanguage,
  isTyping,
}) {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim() || isTyping) return;

    const userMessage = {
      id: Date.now(),
      role: 'user',
      text: input,
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, userMessage]);

    socket.emit('send_message', {
      message: input,
      language: selectedLanguage?.value,
    });

    setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="chat-input-container">
      <input
        type="text"
        placeholder="Type your message..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      <button
        className={`button ${isTyping || !input.trim().length ? 'button-disabled' : 'button-enabled'}`}
        onClick={handleSend}
        disabled={isTyping || !input.trim().length}
      >
        Send
      </button>
    </div>
  );
}

export default ChatInput;