import React, { useState } from "react";
import {
  //   MessageSquare,
  Send,
  Bot,
  User,
  History,
  X,
  Plus,
} from "lucide-react";
import { motion } from "framer-motion";

//Animation variants
const pageVariants = {
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut",
      type: "spring",
      bounce: 0.3,
    },
  },
  initial: {
    opacity: 0,
    x: "100%",
  },
};
// Types for our chat system
interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface ChatSession {
  id: string;
  messages: Message[];
  startTime: Date;
  endTime?: Date;
  title: string; // Generated from the first few messages
}

export default function TutorInterface() {
  // Main state management
  const [currentChat, setCurrentChat] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hello! I'm your AI tutor. How can I help you understand the course material better?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatSession[]>([]);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);

  // Helper function to generate chat title from messages
  const generateChatTitle = (messages: Message[]): string => {
    const userMessages = messages.filter((m) => m.role === "user");
    if (userMessages.length === 0) return "New Conversation";
    const firstMessage = userMessages[0].content;
    return firstMessage.length > 30
      ? `${firstMessage.substring(0, 30)}...`
      : firstMessage;
  };

  // Handle sending new messages
  const handleSend = () => {
    if (!input.trim()) return;

    const newMessage: Message = {
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setCurrentChat((prev) => [...prev, newMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        role: "assistant",
        content:
          "I understand your question. Let me help explain this concept in detail...",
        timestamp: new Date(),
      };
      setCurrentChat((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000);
  };

  // Handle ending current chat
  const handleEndChat = () => {
    if (currentChat.length > 1) {
      // Only save if there's actual conversation
      const newSession: ChatSession = {
        id: Date.now().toString(),
        messages: currentChat,
        startTime: currentChat[0].timestamp,
        endTime: new Date(),
        title: generateChatTitle(currentChat),
      };
      setChatHistory((prev) => [newSession, ...prev]);
    }
    setCurrentChat([
      {
        role: "assistant",
        content:
          "Hello! I'm your AI tutor. How can I help you understand the course material better?",
        timestamp: new Date(),
      },
    ]);
    setActiveChatId(null);
  };

  // Handle loading a chat from history
  const handleLoadChat = (session: ChatSession) => {
    setCurrentChat(session.messages);
    setActiveChatId(session.id);
    setShowHistory(false);
  };

  // Format timestamp for display
  const formatTime = (date: Date): string => {
    return new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      month: "short",
      day: "numeric",
    }).format(date);
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="visible"
      className="bg-white rounded-2xl shadow-xl h-full min-h-[300px] flex flex-col"
    >
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Bot className="h-6 w-6 text-indigo-600" />
            <h2 className="text-xl font-semibold text-gray-900">AI Tutor</h2>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="flex items-center space-x-2 px-3 py-1 text-sm text-gray-600 hover:bg-gray-50 rounded-lg"
            >
              <History className="h-4 w-4" />
              <span>History</span>
            </button>
            {currentChat.length > 1 && (
              <button
                onClick={handleEndChat}
                className="flex items-center space-x-2 px-3 py-1 text-sm text-indigo-600 hover:bg-indigo-50 rounded-lg"
              >
                {activeChatId ? (
                  <>
                    <Plus className="h-4 w-4" />
                    <span>New Chat</span>
                  </>
                ) : (
                  <>
                    <X className="h-4 w-4" />
                    <span>End Chat</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 overflow-hidden">
        {showHistory ? (
          // Chat History View
          <div className="h-full overflow-y-auto p-4 space-y-2">
            {chatHistory.length === 0 ? (
              <div className="text-center text-gray-500 mt-8">
                No chat history yet
              </div>
            ) : (
              chatHistory.map((session) => (
                <button
                  key={session.id}
                  onClick={() => handleLoadChat(session)}
                  className="w-full text-left p-4 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-gray-900">
                      {session.title}
                    </h3>
                    <span className="text-xs text-gray-500">
                      {formatTime(session.startTime)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 truncate">
                    {session.messages[session.messages.length - 1].content}
                  </p>
                </button>
              ))
            )}
          </div>
        ) : (
          // Current Chat View
          <div className="h-full flex flex-col">
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {currentChat.map((message, index) => (
                <div
                  key={index}
                  className={`flex items-start space-x-3 ${
                    message.role === "user"
                      ? "flex-row-reverse space-x-reverse"
                      : ""
                  }`}
                >
                  <div
                    className={`p-2 rounded-full ${
                      message.role === "user" ? "bg-indigo-100" : "bg-gray-100"
                    }`}
                  >
                    {message.role === "user" ? (
                      <User className="h-5 w-5 text-indigo-600" />
                    ) : (
                      <Bot className="h-5 w-5 text-gray-600" />
                    )}
                  </div>
                  <div
                    className={`flex-1 ${
                      message.role === "user" ? "text-right" : ""
                    }`}
                  >
                    <div
                      className={`inline-block p-4 rounded-2xl ${
                        message.role === "user"
                          ? "bg-indigo-600 text-white"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {message.content}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {formatTime(message.timestamp)}
                    </div>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex items-center space-x-2 text-gray-500">
                  <Bot className="h-5 w-5" />
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    />
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.4s" }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-6 border-t border-gray-100">
              <div className="flex items-center space-x-4">
                {/* <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-600">
                  <Lightbulb className="h-5 w-5" />
                </button> */}
                <div className="flex-1 relative ml-9">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSend()}
                    placeholder="Ask your question..."
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg  focus:border-indigo-500 outline-none "
                  />
                </div>
                <button
                  onClick={handleSend}
                  className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
