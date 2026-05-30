import { useEffect } from 'react';
import { socket } from '@/services/socket';
import toast from 'react-hot-toast';

const useSocket = ({
    setMessages,
    setBot,
    setStreamingMessage,
}) => {

    useEffect(() => {
        // ---------------- CONNECT ----------------
        socket.on('connect', () => {
            console.log('✅ Connected:', socket.id);

            toast.dismiss('socket-error');

            toast.success('Connected to server');
        });

        // ---------------- RECONNECTING ----------------
        socket.io.on('reconnect_attempt', (attempt) => {
            console.log(`Reconnecting Attempt: ${attempt}`);

            toast.loading(
                `Reconnecting... Attempt ${attempt}`,
                {
                    id: 'socket-error',
                }
            );
        });

        // ---------------- RECONNECTED ----------------
        socket.io.on('reconnect', (attempt) => {
            console.log(`Reconnected after ${attempt} attempts`);

            toast.dismiss('socket-error');

            toast.success('Reconnected successfully');
        });

        // ---------------- DISCONNECT ----------------
        socket.on('disconnect', (reason) => {
            console.log('Socket disconnected:', reason);

            setBot(prevState => ({
                ...prevState,
                isThinking: false,
                isTyping: false
            }));

            setStreamingMessage('');

            toast.error(
                `Connection lost: ${reason}`,
                {
                    id: 'socket-error',
                }
            );
        });

        // ---------------- CONNECTION ERROR ----------------
        socket.on('connect_error', (error) => {
            console.log('Connection Error:', error.message);

            setBot(prevState => ({
                ...prevState,
                isThinking: false,
                isTyping: false
            }));

            setStreamingMessage('');

            toast.error(
                `Connection Error: ${error.message}`,
                {
                    id: 'socket-error',
                }
            );
        });

        // ---------------- BOT EVENTS ----------------
        socket.on('bot_thinking', () => {
            setBot(prevState => ({
                ...prevState,
                isThinking: true,
                isTyping: false
            }));
        });

        socket.on('bot_typing', () => {
            setBot(prevState => ({
                ...prevState,
                isThinking: false,
                isTyping: true
            }));
        });

        socket.on('stream_start', () => {
            setStreamingMessage('');
        });

        socket.on('stream_token', (token) => {
            setStreamingMessage((prev) => prev + token);
        });

        socket.on('stream_end', (data) => {
            setBot(prevState => ({
                ...prevState,
                isThinking: false,
                isTyping: false
            }));

            setMessages((prev) => [
                ...prev,
                {
                    id: Date.now(),
                    role: 'bot',
                    text: data.text,
                    source: data.source,
                    timestamp: new Date().toLocaleTimeString(),
                },
            ]);

            setStreamingMessage('');
        });

        return () => {
            socket.off('connect');
            socket.off('disconnect');
            socket.off('connect_error');

            socket.off('bot_typing');
            socket.off('bot_thinking');

            socket.off('stream_start');
            socket.off('stream_token');
            socket.off('stream_end');

            socket.io.off('reconnect_attempt');
            socket.io.off('reconnect');
        };
    }, [setMessages, setBot, setStreamingMessage]);
};

export default useSocket;