import { User } from "./types";
import { Card, CardContent } from "@/components/ui/card";
import { LogIn, Clock, Shield } from "lucide-react";
import { formatDistanceToNow, format } from "date-fns";
import { vi } from "date-fns/locale";

interface ActivityStatsProps {
  user: User;
}

export function ActivityStats({ user }: ActivityStatsProps) {
  const lastLoginDate = new Date(user.last_login_at);
  const createdDate = new Date(user.created_at);

  const stats = [
    {
      icon: LogIn,
      label: "Lần đăng nhập",
      value: `${user.login_count} lần`,
      sub: `Lần cuối: ${formatDistanceToNow(lastLoginDate, { addSuffix: true, locale: vi })}`,
      color: "text-indigo-500",
      bg: "bg-indigo-50",
    },
    {
      icon: Clock,
      label: "Thành viên từ",
      value: format(createdDate, "dd/MM/yyyy"),
      sub: `${formatDistanceToNow(createdDate, { addSuffix: true, locale: vi })}`,
      color: "text-violet-500",
      bg: "bg-violet-50",
    },
    {
      icon: Shield,
      label: "IP đăng nhập cuối",
      value: user.last_login_ip === "::1" ? "Localhost" : user.last_login_ip,
      sub: format(lastLoginDate, "HH:mm - dd/MM/yyyy"),
      color: "text-slate-500",
      bg: "bg-slate-50",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      {stats.map(({ icon: Icon, label, value, sub, color, bg }) => (
        <Card key={label} className="border-0 shadow-sm bg-white">
          <CardContent className="p-4 flex items-start gap-3">
            <div className={`p-2 rounded-lg ${bg} shrink-0`}>
              <Icon className={`h-4 w-4 ${color}`} />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-slate-400 mb-0.5">{label}</p>
              <p className="text-sm font-semibold text-slate-800 truncate">{value}</p>
              <p className="text-xs text-slate-400 truncate">{sub}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
