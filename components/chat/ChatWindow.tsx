'use client';

import { useRef, useEffect } from 'react';
import type { Message } from '@/types/chat';
import ChatMessage from './ChatMessage';

const MOCK_MESSAGES: Message[] = [
  {
    id: 1,
    role: 'assistant',
    content: 'Xin chào! Tôi là Nexus AI. Hôm nay bạn muốn thiết kế dashboard như thế nào? Hãy mô tả yêu cầu của bạn nhé.',
    time: '14:20',
  },
  {
    id: 2,
    role: 'user',
    content: 'Tôi cần một dashboard cho ứng dụng analytics với các biểu đồ doanh thu, người dùng và các chỉ số KPI.',
    time: '14:21',
  },
  {
    id: 3,
    role: 'assistant',
    content: 'Tuyệt vời! Đây là cấu trúc dashboard analytics tôi đề xuất cho bạn:\n\n• Header với KPI cards (Revenue, Users, Conversion Rate, Churn)\n• Main chart: Revenue over time (Line chart)\n• Secondary charts: User demographics, Traffic sources\n• Recent activity table ở phía dưới\n\nTôi có thể tạo code cho bạn ngay bây giờ:',
    time: '14:21',
    code: {
      lang: 'tsx',
      content: `export default function Dashboard() {
  return (
    <div className="grid grid-cols-4 gap-4">
      <KPICard title="Revenue" value="$48,295" trend="+12%" />
      <KPICard title="Users" value="12,847" trend="+8%" />
      <KPICard title="Conversion" value="3.24%" trend="-0.5%" />
      <KPICard title="Churn" value="1.8%" trend="+0.2%" />
      <RevenueChart className="col-span-3" />
      <UserStats className="col-span-1" />
    </div>
  )
}`,
    },
  },
  {
    id: 4,
    role: 'user',
    content: 'Trông hay đấy! Bạn có thể thêm dark mode và responsive cho mobile không?',
    time: '14:23',
  },
  {
    id: 5,
    role: 'assistant',
    content: 'Tất nhiên! Tôi sẽ tích hợp dark mode bằng Tailwind CSS với class `dark:` và làm responsive với grid layout. Bạn muốn dùng system preference hay toggle thủ công?',
    time: '14:23',
  },
];

interface ChatWindowProps {
  messages: Message[];
  loading?: boolean;
}

export default function ChatWindow({ messages, loading }: ChatWindowProps) {

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  if (loading) return <p className="text-white/40 p-4">Đang tải...</p>;

  return (
    <div className="flex-1 overflow-y-auto px-4 py-6 space-y-5 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
      {messages.map((msg) => (
        <ChatMessage key={msg.id} message={msg} />
      ))}
      <div ref={bottomRef} />
    </div>
  );
}
