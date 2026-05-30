import ErrorBoundary from '@/components/error-boundary/error-boundary';
import ChatPage from '@/pages/chat-page';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />

      <ErrorBoundary>
        <ChatPage />
      </ErrorBoundary>
    </>
  )
}

export default App
