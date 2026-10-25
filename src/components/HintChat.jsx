/**
 * HintChat Component
 * Main chat interface for AI-powered hints
 * Slides in from right, displays messages in Instagram-style bubbles
 */
import { useEffect, useRef } from 'react';
import { ChatMessage } from './ChatMessage';

export function HintChat({ isOpen, messages, isLoading, onClose }) {
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  return (
    <>
      {/* Backdrop overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40 transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Chat panel */}
      <div
        className={`fixed right-0 top-0 h-full w-80 bg-white shadow-2xl z-50 flex flex-col transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 flex justify-between items-center shadow-md">
          <h2 className="text-lg font-bold">AI Hint Assistant</h2>
          <button
            onClick={onClose}
            className="text-white text-2xl leading-none hover:bg-blue-700 w-8 h-8 flex items-center justify-center rounded transition-colors"
            aria-label="Close chat"
          >
            ✕
          </button>
        </div>

        {/* Messages container */}
        <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
          {messages.length === 0 && !isLoading && (
            <div className="h-full flex items-center justify-center">
              <div className="text-center text-gray-400">
                <p className="text-sm">Click "Hint" to ask for help</p>
              </div>
            </div>
          )}

          {messages.map((msg, idx) => (
            <ChatMessage
              key={idx}
              message={msg.text}
              isUser={msg.isUser}
              isLoading={false}
            />
          ))}

          {isLoading && <ChatMessage message="" isUser={false} isLoading={true} />}

          {/* Auto-scroll anchor */}
          <div ref={messagesEndRef} />
        </div>

        {/* Footer message */}
        <div className="border-t border-gray-200 p-3 bg-gray-100 text-xs text-gray-600 text-center">
          <p>Hints remaining: Check game status</p>
        </div>
      </div>
    </>
  );
}
