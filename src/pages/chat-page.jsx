import './chat-page.scss';
import { useState } from 'react';
import ChatContainer from '@/components/chat/chat-container/chat-container';

function ChatPage() {
  const [selectedLanguage, setSelectedLanguage] = useState({ label: "English", value: "English" });

  return (
    <div className={`chat-page`}>
      <ChatContainer
        selectedLanguage={selectedLanguage}
        setSelectedLanguage={setSelectedLanguage}
      />
    </div>
  );
}

export default ChatPage;