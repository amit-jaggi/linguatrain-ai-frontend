import './chat-bot-wrapper.scss';
import Svg from '@/components/atoms/svg-container/svg-container';

function ChatBotWrapper({ children }) {
    return (
        <div className={`chat-bot-wrapper`}>
            <div className={`chat-bot-container`}>
                <Svg role={'bot'} />

                {children}
            </div>
        </div>
    );
};

export default ChatBotWrapper;