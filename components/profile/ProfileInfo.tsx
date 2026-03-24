import { User } from "./types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Mail, User as UserIcon, CalendarDays } from "lucide-react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";

interface ProfileInfoProps {
  user: User;
}

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 py-2.5">
      <div className="flex items-center gap-2 w-36 shrink-0">
        <Icon className="h-3.5 w-3.5 text-slate-400" />
        <span className="text-xs text-slate-400 font-medium">{label}</span>
      </div>
      <span className="text-sm text-slate-700 font-medium">{value}</span>
    </div>
  );
}

export function ProfileInfo({ user }: ProfileInfoProps) {
  const rows = [
    {
      icon: Mail,
      label: "Email",
      value: user.email,
    },
    {
      icon: UserIcon,
      label: "Tên người dùng",
      value: user.user_name || "Chưa cập nhật",
    },
    {
      icon: CalendarDays,
      label: "Ngày tạo",
      value: format(new Date(user.created_at), "dd MMMM yyyy, HH:mm", { locale: vi }),
    },
    {
      icon: CalendarDays,
      label: "Cập nhật lần cuối",
      value: format(new Date(user.updated_at), "dd MMMM yyyy, HH:mm", { locale: vi }),
    },
  ];

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="pb-2 pt-4 px-4">
        <CardTitle className="text-sm font-semibold text-slate-600 uppercase tracking-wide">
          Thông tin tài khoản
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4 pb-4">
        {rows.map((row, i) => (
          <div key={row.label}>
            <InfoRow {...row} />
            {i < rows.length - 1 && <Separator className="opacity-40" />}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
