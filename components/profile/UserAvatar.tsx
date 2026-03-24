import { User } from "./types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface UserAvatarProps {
  user: User;
}

const statusConfig = {
  online: { label: "Trực tuyến", className: "bg-emerald-500" },
  offline: { label: "Ngoại tuyến", className: "bg-slate-400" },
  away: { label: "Vắng mặt", className: "bg-amber-400" },
};

export function UserAvatar({ user }: UserAvatarProps) {
  const initials = user.user_name
    ? user.user_name.slice(0, 2).toUpperCase()
    : user.email.slice(0, 2).toUpperCase();

  const status = statusConfig[user.status] ?? statusConfig.offline;

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative">
        <Avatar className="h-24 w-24 ring-4 ring-white shadow-lg">
          <AvatarImage src={user.avatar_url || undefined} alt={user.user_name || user.email} />
          <AvatarFallback className="bg-gradient-to-br from-indigo-400 to-violet-500 text-white text-2xl font-semibold">
            {initials}
          </AvatarFallback>
        </Avatar>
        <span
          className={`absolute bottom-1 right-1 h-4 w-4 rounded-full border-2 border-white ${status.className}`}
        />
      </div>

      <div className="text-center">
        <h2 className="text-xl font-semibold text-slate-800 leading-tight">
          {user.user_name || "Chưa đặt tên"}
        </h2>
        <p className="text-sm text-slate-500 mt-0.5">{user.email}</p>
      </div>

      <div className="flex gap-2">
        <Badge variant="secondary" className="capitalize text-xs">
          {user.role === "user" ? "Người dùng" : user.role}
        </Badge>
        <Badge
          variant="outline"
          className={`text-xs border-0 text-white ${status.className}`}
        >
          {status.label}
        </Badge>
      </div>
    </div>
  );
}
