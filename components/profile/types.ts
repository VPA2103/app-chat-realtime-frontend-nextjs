export interface User {
  id: number;
  email: string;
  user_name: string;
  role: string;
  login_count: number;
  last_login_at: string;
  last_login_ip: string;
  status: "online" | "offline" | "away";
  last_seen: string | null;
  avatar_url: string;
  created_at: string;
  updated_at: string;
}
