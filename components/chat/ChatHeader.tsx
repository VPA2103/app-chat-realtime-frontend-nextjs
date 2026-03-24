'use client';

interface ChatHeaderProps {
  onMenuToggle: () => void;
}

export default function ChatHeader({ onMenuToggle }: ChatHeaderProps) {
  return (
    <header className="flex items-center justify-between px-5 py-3.5 border-b border-white/6 bg-[#12121a]/80 backdrop-blur-xl">
      {/* Left: Menu + Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuToggle}
          className="lg:hidden w-8 h-8 rounded-lg flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all"
        >
          <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-white font-semibold text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Thiết kế UI dashboard
            </h1>
            <div className="hidden sm:flex items-center gap-1 px-2 py-0.5 rounded-full bg-violet-500/10 border border-violet-500/20">
              <div className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
              <span className="text-[10px] text-violet-400 font-medium" style={{ fontFamily: "'DM Sans', sans-serif" }}>Đang hoạt động</span>
            </div>
          </div>
          <p className="text-white/30 text-[11px]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Nexus AI · GPT-4o
          </p>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-1.5">
        <button className="hidden sm:flex w-8 h-8 rounded-lg items-center justify-center text-white/30 hover:text-white/70 hover:bg-white/10 transition-all">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>

        <button className="hidden sm:flex w-8 h-8 rounded-lg items-center justify-center text-white/30 hover:text-white/70 hover:bg-white/10 transition-all">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
        </button>

        <button className="w-8 h-8 rounded-lg flex items-center justify-center text-white/30 hover:text-white/70 hover:bg-white/10 transition-all">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
          </svg>
        </button>
      </div>
    </header>
  );
}
