'use client';

import { useState } from 'react';
import ChatSidebar from './ChatSidebar';
import ChatHeader from './ChatHeader';
import ChatWindow from './ChatWindow';
import ChatInput from './ChatInput';
import { useChat } from '@/hooks/useChat';


interface ChatLayoutProps {
  token: string;
  targetUserID: number;
}

export default function ChatLayout({ token, targetUserID }: ChatLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { messages, loading, send } = useChat(token, targetUserID);

  const handleSend = (msg: string): void => {
    // Xử lý gửi tin nhắn (static demo)
    console.log('Gửi:', msg);
  };

  return (
    <div
      className="flex h-screen bg-[#12121a] overflow-hidden"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* Ambient background glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 right-10 w-80 h-80 bg-violet-700/8 rounded-full blur-3xl" />
      </div>

      {/* Sidebar */}
      <ChatSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col min-w-0 relative">
        <ChatHeader onMenuToggle={() => setSidebarOpen(true)} />
        <ChatWindow messages={messages} loading={loading} />
        <ChatInput onSend={send} />
      </main>
    </div>
  );
}
