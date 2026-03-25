'use client'

import { useEffect, useState } from "react"
import { ChatLayout } from "@/components/chat"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { MessageCircle, ChevronLeft, Wifi } from "lucide-react"
import { cn } from "@/lib/utils"
import { UserList } from "@/components/user/UserList"
import { User } from "@/components/user/UserCard"
import { useAuthContext } from "@/context/AuthProvider"
import { useRouter } from "next/navigation"
import AvatarComponent from "@/components/profile/AvatarComponent"
import { useAuth } from "@/hooks/useAuth"

// ─── Replace with your actual auth hook ──────────────────────────────────────
const MOCK_TOKEN = "your-jwt-token-here"
// ─────────────────────────────────────────────────────────────────────────────

export default function ChatPage() {
    const { user, loading } = useAuthContext();
    const {logout} = useAuth()
    const router = useRouter();

    const [selectedUser, setSelectedUser] = useState<User | null>(null)
    const [sidebarOpen, setSidebarOpen] = useState(true)

    useEffect(() => {
        if (!loading && !user) {
            router.replace(`/login?callbackUrl=/chat`);
        }
    }, [loading, user]);

    if (loading) return null;
    if (!user) return null;

    const token = localStorage.getItem("token")!;

    const handleSelectUser = (user: User) => {
        setSelectedUser(user)

        // Auto-close sidebar on mobile after selecting
        if (window.innerWidth < 768) setSidebarOpen(false)
    }

    return (
        <div className="flex h-screen bg-slate-50 dark:bg-slate-950 font-sans overflow-hidden">
            {/* ── Sidebar ─────────────────────────────────────────────────────── */}
            <aside
                className={cn(
                    "flex flex-col bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800",
                    "transition-all duration-300 ease-in-out shrink-0",
                    // Desktop: always visible; Mobile: toggled
                    sidebarOpen ? "w-80" : "w-0 overflow-hidden",
                    "md:w-80 md:overflow-visible"
                )}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-4 pt-5 pb-4 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-2.5">
                        <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-sm">
                            <MessageCircle className="h-4 w-4 text-white" />
                        </div>
                        <div>
                            <h1 className="text-sm font-bold text-slate-800 dark:text-slate-100 leading-none">
                                Messages
                            </h1>
                            <div className="flex items-center gap-1 mt-0.5">
                                <Wifi className="h-2.5 w-2.5 text-emerald-400" />
                                <span className="text-[10px] text-emerald-500 font-medium">Đang kết nối</span>
                            </div>
                        </div>
                    </div>

                    {/* Mobile close button */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 md:hidden"
                        onClick={() => setSidebarOpen(false)}
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                </div>

                {/* User list */}
                <div className="flex-1 overflow-hidden pt-3">
                    <UserList
                        token={token}
                        selectedUserId={selectedUser?.id}
                        onSelectUser={handleSelectUser}
                    />
                </div>
                <div className=" ml-14 mb-6">

                    <AvatarComponent data={user} onLogout={logout}/>
                </div>

            </aside>

            {/* ── Main area ───────────────────────────────────────────────────── */}
            <main className="flex-1 flex flex-col min-w-0">
                {selectedUser ? (
                    <>
                        {/* Chat topbar */}
                        <div className="flex items-center gap-3 px-4 py-3 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shrink-0 shadow-sm">
                            {/* Mobile toggle */}
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 md:hidden shrink-0"
                                onClick={() => setSidebarOpen(true)}
                            >
                                <ChevronLeft className="h-4 w-4" />
                            </Button>

                            <div className="relative shrink-0">
                                <Avatar className="h-9 w-9 border-2 border-white dark:border-slate-900 shadow-sm">
                                    {selectedUser.avatar && (
                                        <AvatarImage src={selectedUser.avatar} alt={selectedUser.user_name} />
                                    )}
                                    <AvatarFallback className="text-xs font-semibold bg-indigo-500 text-white">
                                        {selectedUser.user_name
                                            .split(" ")
                                            .map((w) => w[0])
                                            .join("")
                                            .toUpperCase()
                                            .slice(0, 2)}
                                    </AvatarFallback>
                                </Avatar>
                                {selectedUser.isOnline && (
                                    <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-400 ring-2 ring-white dark:ring-slate-900" />
                                )}
                            </div>

                            <div className="min-w-0">
                                <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 truncate leading-none">
                                    {selectedUser.user_name}
                                </p>
                                <p className="text-xs text-slate-400 mt-0.5">
                                    {selectedUser.isOnline ? (
                                        <span className="text-emerald-500">Đang hoạt động</span>
                                    ) : (
                                        selectedUser.lastSeen ?? "Offline"
                                    )}
                                </p>
                            </div>
                        </div>

                        {/* Chat body */}
                        <div className="flex-1 overflow-hidden">
                            <ChatLayout token={token} targetUserID={selectedUser.id} />
                        </div>
                    </>
                ) : (
                    /* Empty state */
                    <EmptyState onOpen={() => setSidebarOpen(true)} />
                )}
            </main>
        </div>
    )
}

function EmptyState({ onOpen }: { onOpen: () => void }) {
    return (
        <div className="flex-1 flex flex-col items-center justify-center gap-5 p-8 text-center">
            {/* Decorative blob */}
            <div className="relative">
                <div className="h-24 w-24 rounded-3xl bg-gradient-to-br from-indigo-400 to-violet-500 flex items-center justify-center shadow-xl shadow-indigo-200 dark:shadow-indigo-950">
                    <MessageCircle className="h-12 w-12 text-white" strokeWidth={1.5} />
                </div>
                <div className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-emerald-400 border-2 border-white dark:border-slate-950 shadow-sm" />
            </div>

            <div className="space-y-1.5 max-w-xs">
                <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">
                    Chọn người để nhắn tin
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    Chọn một người dùng từ danh sách bên trái để bắt đầu cuộc trò chuyện.
                </p>
            </div>

            {/* Mobile: show sidebar button */}
            <Button
                onClick={onOpen}
                className="md:hidden bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl px-6"
            >
                Xem danh sách
            </Button>
        </div>
    )
}
