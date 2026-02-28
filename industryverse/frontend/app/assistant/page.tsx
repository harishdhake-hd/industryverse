'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Bot, Send, Sparkles, User, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isStreaming?: boolean;
}

const suggestions = [
  'What does a Product Manager do on a typical day?',
  'How do Investment Bankers build financial models?',
  'Explain the software engineering feature delivery cycle',
  'What skills do I need to become a Strategy Consultant?',
  'Walk me through a real FP&A forecasting process',
];

function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === 'user';
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
    >
      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
        isUser ? 'bg-indigo-600' : 'bg-gradient-to-br from-purple-600 to-indigo-600'
      }`}>
        {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
      </div>
      <div className={`max-w-[75%] ${isUser ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
        <div className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
          isUser
            ? 'bg-indigo-600 text-white rounded-tr-sm'
            : 'glass text-white/80 rounded-tl-sm'
        }`}>
          {message.content}
          {message.isStreaming && <span className="typing-cursor ml-0.5" />}
        </div>
        <span className="text-xs text-white/20 px-1">
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </motion.div>
  );
}

export default function AssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: `Hello! I'm IndustryVerse AI — your corporate learning assistant. I can help you understand professional roles, explain industry workflows, break down simulation projects, and guide your career exploration. What would you like to learn today?`,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [context, setContext] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (text?: string) => {
    const messageText = text || input.trim();
    if (!messageText || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: messageText,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Create assistant message placeholder
    const assistantId = (Date.now() + 1).toString();
    setMessages(prev => [...prev, {
      id: assistantId,
      role: 'assistant',
      content: '',
      timestamp: new Date(),
      isStreaming: true,
    }]);

    // Simulate streaming (replace with actual API call)
    const response = await simulateStream(messageText);
    let accumulated = '';

    for (const chunk of response) {
      accumulated += chunk;
      setMessages(prev => prev.map(m =>
        m.id === assistantId ? { ...m, content: accumulated } : m
      ));
      await new Promise(r => setTimeout(r, 20));
    }

    setMessages(prev => prev.map(m =>
      m.id === assistantId ? { ...m, isStreaming: false } : m
    ));
    setIsLoading(false);
  };

  const simulateStream = async (question: string): Promise<string[]> => {
    // This simulates the streaming response. In production, connect to /api/assistant/chat
    const responses: Record<string, string> = {
      default: `That's a great question about corporate careers. In a professional setting, this involves structured processes, cross-functional collaboration, and clear deliverables.

Let me break this down for you:

**The Core Framework**
Most corporate roles operate within a structured framework that balances strategic thinking with tactical execution. Professionals are expected to understand both their immediate responsibilities and how their work connects to broader business objectives.

**Day-to-Day Reality**
The actual work often differs from job descriptions. You'll spend significant time in meetings (yes, many meetings), writing documentation, managing stakeholders, and communicating decisions upward and downward.

**Key Skill: Communication**
Regardless of domain — technology, finance, or business — the highest-leverage skill is clear, structured communication. Learning to write a one-pager, run an effective meeting, or deliver difficult feedback separates good professionals from great ones.

Would you like me to dive deeper into any specific aspect of this role?`,
    };

    const text = responses.default;
    return text.split('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    setMessages([{
      id: 'welcome',
      role: 'assistant',
      content: `Chat cleared! How can I help you explore the corporate world?`,
      timestamp: new Date(),
    }]);
  };

  return (
    <div className="h-screen bg-[#080812] text-white flex">
      {/* Left sidebar */}
      <div className="w-64 glass border-r border-white/5 flex flex-col">
        <div className="p-4 border-b border-white/5">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <span className="font-bold">IndustryVerse</span>
          </Link>
        </div>

        <div className="p-4 flex-1 overflow-y-auto">
          <div className="mb-3">
            <p className="text-xs text-white/30 uppercase tracking-wider mb-2">Context</p>
            <select
              value={context}
              onChange={(e) => setContext(e.target.value)}
              className="w-full text-xs bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white/70 focus:outline-none focus:border-indigo-500/50"
            >
              <option value="">General</option>
              <option value="Software Engineer">Software Engineer</option>
              <option value="Product Manager">Product Manager</option>
              <option value="Investment Banker">Investment Banker</option>
              <option value="Strategy Consultant">Strategy Consultant</option>
              <option value="FP&A Analyst">FP&A Analyst</option>
            </select>
          </div>

          <div>
            <p className="text-xs text-white/30 uppercase tracking-wider mb-2">Quick Questions</p>
            <div className="space-y-1">
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => sendMessage(s)}
                  className="w-full text-left text-xs text-white/50 hover:text-white hover:bg-white/5 rounded-lg px-2 py-1.5 transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-white/5">
          <button
            onClick={clearChat}
            className="flex items-center gap-2 text-xs text-white/30 hover:text-white/60 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" /> Clear chat
          </button>
        </div>
      </div>

      {/* Chat area */}
      <div className="flex-1 flex flex-col">
        {/* Chat header */}
        <div className="h-14 glass border-b border-white/5 flex items-center px-6 gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <div className="font-medium text-sm">IndustryVerse AI</div>
            <div className="text-xs text-emerald-400 flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Online
            </div>
          </div>
          {context && (
            <span className="ml-auto text-xs text-indigo-400 bg-indigo-400/10 px-2 py-0.5 rounded-full">
              Context: {context}
            </span>
          )}
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-white/5 glass">
          <div className="flex gap-3 items-end max-w-4xl mx-auto">
            <div className="flex-1 glass rounded-xl border border-white/10 focus-within:border-indigo-500/40 transition-colors">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask anything about corporate roles, workflows, projects..."
                rows={1}
                className="w-full bg-transparent px-4 py-3 text-sm resize-none focus:outline-none placeholder:text-white/25 max-h-32"
                style={{ fieldSizing: 'content' } as any}
              />
            </div>
            <button
              onClick={() => sendMessage()}
              disabled={!input.trim() || isLoading}
              className="w-10 h-10 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-30 disabled:cursor-not-allowed rounded-xl flex items-center justify-center transition-colors shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          <p className="text-xs text-white/20 text-center mt-2">Press Enter to send, Shift+Enter for new line</p>
        </div>
      </div>
    </div>
  );
}
