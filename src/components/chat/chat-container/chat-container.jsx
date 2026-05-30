import './chat-container.scss';
import { useEffect, useRef, useState } from 'react';
import MessageList from '../message-list/message-list';
import ChatInput from '../chat-input/chat-input';
import TypingIndicator from '../thinking-indicator/thinking-indicator';
import LanguageSelector from '@/components/atoms/custom-dropdown/custom-dropdown';
// import LanguageSelector from '../../common/language-selector';
import ChatBotWrapper from '../chat-bot-wrapper/chat-bot-wrapper';
import useSocket from '@/hooks/useSocket';

function ChatContainer({
	selectedLanguage,
	setSelectedLanguage,
}) {
	const [messages, setMessages] = useState([
		{
			id: 1,
			role: 'bot',
			text: 'Hello! Ask me anything.',
			source: 'welcome.md',
			timestamp: new Date().toLocaleTimeString(),
		},
	]);
	const [bot, setBot] = useState({
		isThinking: false,
		isTyping: false
	})
	const [streamingMessage, setStreamingMessage] = useState('');

	const bottomRef = useRef(null);

	useSocket({
		setMessages,
		setBot,
		setStreamingMessage,
	});

	useEffect(() => {
		bottomRef.current?.scrollIntoView({
			behavior: 'smooth',
		});
	}, [messages, streamingMessage]);

	return (
		<div className="chat-container">
			<div className="chat-header">
				<h2>AI Training Bot</h2>

				<LanguageSelector
					options={
						[
						{ label: "English", value: "English" },
						{ label: "Hindi", value: "Hindi" },
						{ label: "Kannada", value: "Kannada" }
					].filter(
						(el) => el.value !== selectedLanguage.value
					)
				}
					selectedOption={selectedLanguage}
					onSelect={setSelectedLanguage}
				/>
			</div>

			<div className="chat-messages">
				<MessageList messages={messages} />

				{
					streamingMessage && (
						<ChatBotWrapper>
							<div className="streaming-message">
								<div className="streaming-bubble">
									{streamingMessage}
								</div>
							</div>
						</ChatBotWrapper>
					)
				}

				{
					bot.isThinking && (
						<ChatBotWrapper>
							<TypingIndicator />
						</ChatBotWrapper>
					)
				}

				<div ref={bottomRef} />
			</div>

			<ChatInput
				messages={messages}
				setMessages={setMessages}
				selectedLanguage={selectedLanguage}
				isTyping={[bot.isThinking, bot.isTyping].includes(true)}
			/>
		</div>
	);
}

export default ChatContainer;