"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { UserAvatar } from "@/components/profile/UserAvatar";
import { ActivityStats } from "@/components/profile/ActivityStats";
import { ProfileInfo } from "@/components/profile/ProfileInfo";
import { Button } from "@/components/ui/button";
import { Settings, LogOut } from "lucide-react";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 rounded-full border-2 border-indigo-400 border-t-transparent animate-spin" />
          <p className="text-sm text-slate-400">Đang tải...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top bar */}
      <header className="bg-white border-b border-slate-100 px-4 sm:px-6 py-3 flex items-center justify-between">
        <span className="text-sm font-semibold text-slate-700 tracking-tight">
          Hồ sơ cá nhân
        </span>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" className="text-slate-500 hover:text-slate-700 gap-1.5">
            <Settings className="h-4 w-4" />
            <span className="hidden sm:inline text-xs">Cài đặt</span>
          </Button>
          <Button
            onClick={() => {
              logout();
              router.push("/login");
            }}
            variant="ghost"
            size="sm"
            className="text-slate-500 hover:text-red-500 gap-1.5"
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline text-xs">Đăng xuất</span>
          </Button>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-2xl mx-auto px-4 py-8 space-y-5">
        {/* Avatar card */}
        <div className="bg-white rounded-2xl shadow-sm border-0 p-6">
          <UserAvatar user={user} />
        </div>

        {/* Activity stats */}
        <ActivityStats user={user} />

        {/* Profile info */}
        <ProfileInfo user={user} />
      </main>
    </div>
  );
}
