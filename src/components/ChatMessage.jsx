/**
 * ChatMessage Component
 * Displays individual messages (user or AI) in the chat
 * Supports different styles for user vs AI messages
 */
export function ChatMessage({ message, isUser, isLoading }) {
  if (isLoading) {
    return (
      <div className="flex justify-center mb-4">
        <div className="flex space-x-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-100"></div>
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-200"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4 animate-fadeIn`}>
      <div
        className={`max-w-xs px-4 py-3 rounded-lg ${
          isUser
            ? 'bg-blue-500 text-white rounded-br-none' // User message: blue, right aligned
            : 'bg-gray-200 text-gray-900 rounded-bl-none' // AI message: gray, left aligned
        }`}
      >
        <p className="text-sm leading-relaxed">{message}</p>
      </div>
    </div>
  );
}
