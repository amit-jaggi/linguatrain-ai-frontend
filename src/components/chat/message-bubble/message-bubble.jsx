import './message-bubble.scss';
import Svg from '@/components/atoms/svg-container/svg-container';
import { convertTo12Hour } from '@/utils/functions';

function MessageBubble({ message }) {
  return (
    <div className={`message-row ${message.role}`}>
      <div className={`message-bubble-wrapper ${message.role}`}>
        <div className={`message-bubble ${message.role}`}>
          <p>{message.text}</p>

          {message.source && (
            <span className={`source`}>
              Source: {message.source}
            </span>
          )}

          <span className="timestamp">
            {convertTo12Hour(message.timestamp)}
          </span>
        </div>

        <Svg role={message.role} />
      </div>
    </div>
  );
}

export default MessageBubble;