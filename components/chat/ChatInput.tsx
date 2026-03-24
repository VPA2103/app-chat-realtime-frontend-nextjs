'use client';

import { useState } from 'react';

interface ChatInputProps {
  onSend?: (message: string) => void;
}

const SUGGESTIONS: string[] = ['Giải thích code', 'Tóm tắt văn bản', 'Viết unit test', 'Review PR'];

export default function ChatInput({ onSend }: ChatInputProps) {
  const [value, setValue] = useState<string>('');

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSend = (): void => {
    if (value.trim()) {
      onSend?.(value.trim());
      setValue('');
    }
  };

  return (
    <div className="px-4 pb-5 pt-3">
      {/* Quick Suggestions */}
      <div className="flex items-center gap-2 mb-3 overflow-x-auto pb-1 scrollbar-none">
        {SUGGESTIONS.map((s) => (
          <button
            key={s}
            onClick={() => setValue(s)}
            className="shrink-0 text-[11px] px-3 py-1.5 rounded-full border border-white/9 bg-white/4 text-white/40 hover:text-white/70 hover:border-white/20 hover:bg-white/8 transition-all"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Input Box */}
      <div className="relative flex items-end gap-2 bg-white/6 border border-white/10 rounded-2xl px-4 pt-3 pb-2.5 focus-within:border-violet-500/50 focus-within:bg-white/8 transition-all shadow-xl shadow-black/20">
        {/* Attach */}
        <button className="shrink-0 mb-1 w-7 h-7 rounded-lg flex items-center justify-center text-white/30 hover:text-violet-400 hover:bg-violet-500/10 transition-all">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
          </svg>
        </button>

        {/* Textarea */}
        <textarea
          value={value}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
          placeholder="Nhắn tin tới Nexus..."
          className="flex-1 bg-transparent resize-none text-sm text-white/80 placeholder-white/25 focus:outline-none leading-relaxed max-h-36 overflow-y-auto scrollbar-none"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            minHeight: '24px',
          }}
        />

        {/* Actions */}
        <div className="shrink-0 flex items-center gap-1.5 mb-0.5">
          <button className="w-7 h-7 rounded-lg flex items-center justify-center text-white/30 hover:text-violet-400 hover:bg-violet-500/10 transition-all">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
          </button>

          <button
            onClick={handleSend}
            disabled={!value.trim()}
            className={`
              w-8 h-8 rounded-xl flex items-center justify-center transition-all
              ${value.trim()
                ? 'bg-linear-to-br from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50 hover:scale-105 active:scale-95'
                : 'bg-white/6 text-white/20 cursor-not-allowed'
              }
            `}
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      <p className="text-center text-[10px] text-white/15 mt-2.5" style={{ fontFamily: "'DM Sans', sans-serif" }}>
        Nhấn Enter để gửi · Shift+Enter để xuống dòng
      </p>
    </div>
  );
}
