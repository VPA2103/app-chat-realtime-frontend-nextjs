'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export interface User {
  id: number
  user_name: string
  email?: string
  avatar?: string
  isOnline?: boolean
  lastMessage?: string
  lastSeen?: string
  unreadCount?: number
}

interface UserCardProps {
  user: User
  isSelected: boolean
  onClick: (user: User) => void
  isSelf?: boolean
}

export function UserCard({ user, isSelected, onClick, isSelf }: UserCardProps) {
  const initials = user.user_name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)

  return (
    <button
      onClick={() => onClick(user)}
      className={cn(
        "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-left group",
        "hover:bg-slate-100 dark:hover:bg-slate-800/60",
        isSelected
          ? "bg-indigo-50 dark:bg-indigo-950/40 ring-1 ring-indigo-200 dark:ring-indigo-800"
          : "bg-transparent"
      )}
    >
      {/* Avatar + online dot */}
      <div className="relative shrink-0">
        <Avatar className="h-11 w-11 border-2 border-white dark:border-slate-900 shadow-sm">
          {user.avatar && <AvatarImage src={user.avatar} alt={user.user_name} />}
          <AvatarFallback
            className={cn(
              "text-sm font-semibold",
              isSelected
                ? "bg-indigo-500 text-white"
                : "bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-600 text-slate-700 dark:text-slate-200"
            )}
          >
            {initials}
          </AvatarFallback>
        </Avatar>
        {user.isOnline && (
          <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-400 ring-2 ring-white dark:ring-slate-900" />
        )}
        {isSelf && (
          <span className="text-[10px] text-indigo-400 font-medium">Bạn</span>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <p
            className={cn(
              "text-sm font-semibold truncate",
              isSelected
                ? "text-indigo-700 dark:text-indigo-300"
                : "text-slate-800 dark:text-slate-100"
            )}
          >
            {user.user_name}
          </p>
          {isSelf && (
            <span className="text-[10px] text-indigo-400 font-medium">Bạn</span>
          )}
          {user.lastSeen && (
            <span className="text-[10px] text-slate-400 shrink-0">{user.lastSeen}</span>
          )}
        </div>
        <div className="flex items-center justify-between gap-2 mt-0.5">
          <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
            {user.lastMessage ?? user.email ?? "Bắt đầu cuộc trò chuyện..."}
          </p>
          {user.unreadCount && user.unreadCount > 0 ? (
            <Badge className="h-4 min-w-4 px-1 text-[10px] bg-indigo-500 hover:bg-indigo-500 shrink-0">
              {user.unreadCount > 99 ? "99+" : user.unreadCount}
            </Badge>
          ) : null}
        </div>
      </div>

    </button>
  )
}
