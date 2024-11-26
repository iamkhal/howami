import React, { useState, useRef, useEffect } from 'react';

const Chat = ({
  userType,
  conversationHistory,
  setConversationHistory,
  onSendMessage,
  onSaveChat,
  chatHistory
}) => {
  const [message, setMessage] = useState('');
  const [showHistory, setShowHistory] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversationHistory]);

  const handleSend = async () => {
    if (!message.trim()) return;

    const newMessage = { role: 'user', content: message };
    setConversationHistory([...conversationHistory, newMessage]);
    setMessage('');

    const response = await onSendMessage(message);
    const botMessage = { role: 'assistant', content: response };
    setConversationHistory(prev => [...prev, botMessage]);
    onSaveChat();
  };

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto p-4 bg-white/50 backdrop-blur-sm">
      <div className="flex justify-between mb-4 gap-4">
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-2 bg-[#bce10c] text-white rounded-full hover:bg-[#e48c04] transition-colors duration-300 shadow-md"
        >
          Back
        </button>
        <button
          onClick={() => setShowHistory(!showHistory)}
          className="px-6 py-2 bg-[#bce10c] text-white rounded-full hover:bg-[#e48c04] transition-colors duration-300 shadow-md"
        >
          History
        </button>
      </div>

      {showHistory && (
        <div className="mb-4 p-4 bg-white rounded-lg shadow-lg">
          <h3 className="font-bold mb-2 text-[#2D3748]">Chat History</h3>
          {chatHistory.map((chat) => (
            <div
              key={chat.$id}
              className="p-3 hover:bg-[#E8F1F2] cursor-pointer rounded-md transition-colors duration-200"
              onClick={() => setConversationHistory(JSON.parse(chat.conversation))}
            >
              Chat from {new Date(chat.timestamp).toLocaleString()}
            </div>
          ))}
        </div>
      )}

      <div className="flex-1 overflow-y-auto bg-white rounded-lg shadow-lg mb-4 p-4">
        {conversationHistory.map((msg, index) => (
          <div
            key={index}
            className={`mb-4 ${
              msg.role === 'user' ? 'text-right' : 'text-left'
            }`}
          >
            <div
              className={`inline-block p-4 rounded-2xl max-w-[80%] ${
                msg.role === 'user'
                  ? 'bg-[#bce10c] text-white'
                  : 'bg-[#E8F1F2] text-[#2D3748]'
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex gap-3">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type your message..."
          className="flex-1 p-4 border border-[#E8F1F2] rounded-full focus:outline-none focus:border-[#bce10c] focus:ring-2 focus:ring-[#bce10c]/50 transition-all duration-300"
        />
        <button
          onClick={handleSend}
          className="px-8 py-4 bg-[#bce10c] text-white rounded-full hover:bg-[#e48c04] transition-colors duration-300 shadow-md"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;