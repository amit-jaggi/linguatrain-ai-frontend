import './message-list.scss';
import MessageBubble from '../message-bubble/message-bubble';

function MessageList({ messages }) {
  return (
    <>
      {messages.map((message) => (
        <MessageBubble
          key={message.id}
          message={message}
        />
      ))}
    </>
  );
}

export default MessageList;