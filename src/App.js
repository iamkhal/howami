import React, { useState, useEffect } from 'react';
import { Client, Account, Databases, Query } from 'appwrite'; // Added Query import
import Login from './components/Login';
import Chat from './components/Chat';
import UserType from './components/UserType';

const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('67420672000a217d436a');

const account = new Account(client);
const databases = new Databases(client);

const OPENAI_API_KEY = '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';

const TEEN_PROMPT = `[Your existing teen prompt]`;
const PARENT_PROMPT = `[Your existing parent prompt]`;

const App = () => {
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);
  const [conversationHistory, setConversationHistory] = useState([]);

  const handleLogin = async (email, password) => {
    try {
      await account.createEmailSession(email, password);
      const user = await account.get();
      setUser(user);
      loadChatHistory();
    } catch (error) {
      alert(error.message);
    }
  };

  const handleSignup = async (email, password) => {
    try {
      await account.create('unique()', email, password);
      return true;
    } catch (error) {
      alert(error.message);
      return false;
    }
  };

  const loadChatHistory = async () => {
    try {
      const response = await databases.listDocuments(
        'howamichatbot',
        '67436185001d123667f7',
        [Query.equal('userId', user.$id)]
      );
      setChatHistory(response.documents);
    } catch (error) {
      console.error("Error loading history:", error);
    }
  };

  const saveChatHistory = async () => {
    if (!user) return;
    try {
      await databases.createDocument(
        'howamichatbot',
        '67436185001d123667f7',
        'unique()',
        {
          userId: user.$id,
          conversation: JSON.stringify(conversationHistory),
          timestamp: new Date().toISOString()
        }
      );
      loadChatHistory();
    } catch (error) {
      console.error("Error saving chat:", error);
    }
  };

  const getChatResponse = async (message) => {
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: userType === 'teen' ? TEEN_PROMPT : PARENT_PROMPT
            },
            ...conversationHistory,
            { role: "user", content: message }
          ],
          temperature: 0.7
        })
      });
      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error('Error:', error);
      return "I'm having trouble connecting right now. Please try again in a moment.";
    }
  };

  if (!user) {
    return <Login onLogin={handleLogin} onSignup={handleSignup} />;
  }

  if (!userType) {
    return <UserType onSelect={setUserType} />;
  }

  return (
    <Chat
      userType={userType}
      conversationHistory={conversationHistory}
      setConversationHistory={setConversationHistory}
      onSendMessage={getChatResponse}
      onSaveChat={saveChatHistory}
      chatHistory={chatHistory}
    />
  );
};

export default App;