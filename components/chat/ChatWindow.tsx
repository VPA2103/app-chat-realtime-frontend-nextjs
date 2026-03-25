'use client';

import { useRef, useEffect } from 'react';
import type { Message } from '@/types/chat';
import ChatMessage from './ChatMessage';


interface ChatWindowProps {
  messages: Message[];
  loading?: boolean;
}

export default function ChatWindow({ messages, loading }: ChatWindowProps) {

  const bottomRef = useRef<HTMLDivElement>(null);
  console.log('messages:', messages);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  if (loading) return <p className="text-white/40 p-4">Đang tải...</p>;

  return (
    <div className="flex-1 overflow-y-auto px-4 py-6 space-y-5 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
      {messages.map((msg) => (
        <ChatMessage key={msg.id} message={msg} />
      ))}
      <div ref={bottomRef} />
    </div>
  );
}
