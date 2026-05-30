import './thinking-indicator.scss';

function ThinkingIndicator() {
  return (
    <div className={`typing-wrapper`}>
      <div className={`typing-bubble`}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
}

export default ThinkingIndicator;