'use client';

import { useState } from 'react';
import type { Conversation } from '@/types/chat';

interface ChatSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const conversations: Conversation[] = [
  { id: 1, title: 'Thiết kế UI dashboard', time: '2 phút trước', active: true, unread: 0 },
  { id: 2, title: 'Hỏi về Next.js 15', time: '1 giờ trước', active: false, unread: 2 },
  { id: 3, title: 'Debug React hooks', time: 'Hôm qua', active: false, unread: 0 },
  { id: 4, title: 'Tối ưu Tailwind CSS', time: 'Hôm qua', active: false, unread: 0 },
  { id: 5, title: 'API integration guide', time: '2 ngày trước', active: false, unread: 0 },
  { id: 6, title: 'Deploy lên Vercel', time: '3 ngày trước', active: false, unread: 0 },
];

export default function ChatSidebar({ isOpen, onClose }: ChatSidebarProps) {
  const [search, setSearch] = useState<string>('');

  const filtered = conversations.filter((c) =>
    c.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      {/* Overlay mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-20 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed lg:relative inset-y-0 left-0 z-30 lg:z-auto
          w-72 flex flex-col
          bg-[#0f0f13] border-r border-white/6
          transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Header */}
        <div className="px-5 pt-6 pb-4">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-linear-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/30">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <span className="text-white font-semibold tracking-tight" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Nexus Chat
              </span>
            </div>
            <button
              onClick={onClose}
              className="lg:hidden w-7 h-7 rounded-md flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* New Chat Button */}
          <button className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-white/[0.07] hover:bg-white/11 border border-white/8 text-white/70 hover:text-white text-sm transition-all group">
            <svg className="w-4 h-4 text-violet-400 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span style={{ fontFamily: "'DM Sans', sans-serif" }}>Cuộc trò chuyện mới</span>
          </button>

          {/* Search */}
          <div className="relative mt-3">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
              placeholder="Tìm kiếm..."
              className="w-full bg-white/5 border border-white/[0.07] rounded-lg pl-8 pr-3 py-2 text-xs text-white/60 placeholder-white/25 focus:outline-none focus:border-violet-500/50 focus:bg-white/[0.07] transition-all"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            />
          </div>
        </div>

        {/* Conversation List */}
        <div className="flex-1 overflow-y-auto px-3 pb-4 space-y-0.5 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
          <p className="text-[10px] font-semibold text-white/25 uppercase tracking-widest px-2 mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Gần đây
          </p>
          {filtered.map((conv) => (
            <button
              key={conv.id}
              className={`
                w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all group
                ${conv.active
                  ? 'bg-violet-500/15 border border-violet-500/20 text-white'
                  : 'text-white/50 hover:bg-white/6 hover:text-white/80 border border-transparent'
                }
              `}
            >
              <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${conv.active ? 'bg-violet-400' : 'bg-white/20 group-hover:bg-white/40'}`} />
              <div className="flex-1 min-w-0">
                <p className="text-sm truncate font-medium" style={{ fontFamily: "'DM Sans', sans-serif" }}>{conv.title}</p>
                <p className="text-[10px] text-white/30 mt-0.5" style={{ fontFamily: "'DM Sans', sans-serif" }}>{conv.time}</p>
              </div>
              {conv.unread > 0 && (
                <span className="shrink-0 w-4 h-4 rounded-full bg-violet-500 text-white text-[9px] flex items-center justify-center font-bold">
                  {conv.unread}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* User Profile */}
        <div className="px-4 py-4 border-t border-white/6">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-8 h-8 rounded-full bg-linear-to-br from-violet-400 to-pink-500 flex items-center justify-center text-white text-sm font-bold shadow-lg">
                T
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#0f0f13]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-xs font-semibold truncate" style={{ fontFamily: "'DM Sans', sans-serif" }}>Nguyễn Văn Tâm</p>
              <p className="text-white/30 text-[10px]" style={{ fontFamily: "'DM Sans', sans-serif" }}>Pro Plan</p>
            </div>
            <button className="w-7 h-7 rounded-lg flex items-center justify-center text-white/30 hover:text-white hover:bg-white/10 transition-all">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
