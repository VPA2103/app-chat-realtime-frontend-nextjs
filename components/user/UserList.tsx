'use client'

import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Skeleton } from "@/components/ui/skeleton"
import { Search, Users, WifiOff } from "lucide-react"
import { UserCard, type User } from "./UserCard"

interface UserListProps {
  selectedUserId?: number | null
  onSelectUser: (user: User) => void
  token: string
}

interface UsersResponse {
  message: string
  users: User[]
}

function UserCardSkeleton() {
  return (
    <div className="flex items-center gap-3 px-4 py-3">
      <Skeleton className="h-11 w-11 rounded-full shrink-0" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-3.5 w-32" />
        <Skeleton className="h-3 w-48" />
      </div>
    </div>
  )
}

export function UserList({ selectedUserId, onSelectUser, token }: UserListProps) {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState("")
  

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true)
        setError(null)
        const res = await fetch("http://localhost:8080/api/user/all", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        if (!res.ok) throw new Error(`Lỗi ${res.status}: ${res.statusText}`)
        const data: UsersResponse = await res.json()
        // const data = await res.json()
        // console.log(data)
        // setUsers(data)
        setUsers(data.users)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Không thể tải danh sách")
      } finally {
        setLoading(false)
      }
    }
    if (token) fetchUsers()
  }, [token])

  const filtered = users.filter(
    (u) =>
      (u.user_name || "").toLowerCase().includes(search.toLowerCase()) ||
      (u.email || "").toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="flex flex-col h-full">
      {/* Search bar */}
      <div className="px-4 pb-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Tìm kiếm người dùng..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-9 bg-slate-100 dark:bg-slate-800 border-0 focus-visible:ring-1 focus-visible:ring-indigo-400 text-sm rounded-lg"
          />
        </div>
      </div>

      {/* Section label */}
      {!loading && !error && filtered.length > 0 && (
        <div className="px-4 pb-1">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-400">
            {search ? `Kết quả (${filtered.length})` : `Tất cả · ${users.length}`}
          </p>
        </div>
      )}

      {/* List */}
      <ScrollArea className="flex-1">
        <div className="px-2 pb-4 space-y-0.5">
          {loading &&
            Array.from({ length: 6 }).map((_, i) => <UserCardSkeleton key={i} />)}

          {error && (
            <div className="flex flex-col items-center justify-center py-12 gap-3 text-center px-4">
              <div className="h-10 w-10 rounded-full bg-red-50 dark:bg-red-950/30 flex items-center justify-center">
                <WifiOff className="h-5 w-5 text-red-400" />
              </div>
              <p className="text-sm text-red-500 font-medium">Không thể kết nối</p>
              <p className="text-xs text-slate-400">{error}</p>
            </div>
          )}

          {!loading && !error && filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 gap-3 text-center px-4">
              <div className="h-10 w-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                <Users className="h-5 w-5 text-slate-400" />
              </div>
              <p className="text-sm text-slate-500 font-medium">
                {search ? "Không tìm thấy người dùng" : "Chưa có người dùng"}
              </p>
            </div>
          )}

          {!loading &&
            !error &&
            filtered.map((user) => (
              <UserCard
                key={user.id}
                user={user}
                isSelected={selectedUserId === user.id}
                onClick={onSelectUser}
              />
            ))}
        </div>
      </ScrollArea>
    </div>
  )
}
