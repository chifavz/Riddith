import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addChatMessage, fetchRecommendations } from './foodSlice';

const AIWaiterChat = () => {
  const dispatch = useDispatch();
  const { chatMessages, status } = useSelector(state => state.food);
  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      // Add user message
      dispatch(addChatMessage({
        sender: 'user',
        message: inputMessage
      }));

      // Simulate AI response
      setTimeout(() => {
        if (inputMessage.toLowerCase().includes('recommend') || inputMessage.toLowerCase().includes('suggestion')) {
          dispatch(addChatMessage({
            sender: 'ai',
            message: "Let me find some personalized meal recommendations for you! Based on your preferences, I'm curating the perfect options..."
          }));
          dispatch(fetchRecommendations());
        } else if (inputMessage.toLowerCase().includes('diet') || inputMessage.toLowerCase().includes('allergy')) {
          dispatch(addChatMessage({
            sender: 'ai',
            message: "I see you're asking about dietary preferences. You can update your profile in the Preferences section to include allergies, dietary restrictions, and cuisine preferences. This helps me provide better recommendations!"
          }));
        } else {
          dispatch(addChatMessage({
            sender: 'ai',
            message: "I understand! I can help you discover amazing meals, update your dietary preferences, or find specific cuisines. Try asking me for recommendations or tell me about your dietary needs!"
          }));
        }
      }, 1000);

      setInputMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div style={{ 
      backgroundColor: 'white', 
      borderRadius: '0.5rem', 
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', 
      padding: '1.5rem', 
      maxWidth: '42rem', 
      margin: '0 auto' 
    }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', color: '#f97316' }}>
        🤖 AI Food Waiter
      </h2>
      
      {/* Chat Messages */}
      <div style={{ 
        height: '384px', 
        overflowY: 'auto', 
        marginBottom: '1rem', 
        padding: '1rem', 
        border: '1px solid #d1d5db', 
        borderRadius: '0.5rem', 
        backgroundColor: '#f9fafb' 
      }}>
        {chatMessages.map((msg) => (
          <div
            key={msg.id}
            style={{
              marginBottom: '1rem',
              textAlign: msg.sender === 'user' ? 'right' : 'left'
            }}
          >
            <div
              style={{
                display: 'inline-block',
                padding: '0.75rem',
                borderRadius: '0.5rem',
                maxWidth: '18rem',
                backgroundColor: msg.sender === 'user' ? '#f97316' : 'white',
                color: msg.sender === 'user' ? 'white' : 'black',
                border: msg.sender === 'ai' ? '1px solid #d1d5db' : 'none'
              }}
            >
              <p style={{ fontSize: '0.875rem', margin: 0 }}>{msg.message}</p>
              <span style={{ fontSize: '0.75rem', opacity: 0.7 }}>
                {new Date(msg.timestamp).toLocaleTimeString()}
              </span>
            </div>
          </div>
        ))}
        {status === 'loading' && (
          <div style={{ textAlign: 'left' }}>
            <div style={{ 
              display: 'inline-block', 
              padding: '0.75rem', 
              borderRadius: '0.5rem', 
              backgroundColor: '#e5e7eb' 
            }}>
              <p style={{ fontSize: '0.875rem', margin: 0 }}>AI is thinking...</p>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask me for meal recommendations, dietary info, or anything food-related..."
          style={{
            flex: 1,
            padding: '0.75rem',
            border: '1px solid #d1d5db',
            borderRadius: '0.5rem',
            outline: 'none'
          }}
        />
        <button
          onClick={handleSendMessage}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#f97316',
            color: 'white',
            borderRadius: '0.5rem',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default AIWaiterChat;