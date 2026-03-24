'use client'
import { ChatLayout } from "@/components/chat";
import { useState } from "react";


export default function ChatPage() {

    const [token, setToken] = useState<string | null>(null);
    const [selectedUser, setSelectedUser] = useState<{ id: number } | null>(null);
  
    // TODO: load token từ context/auth
    // TODO: set selectedUser khi người dùng chọn chat
  
    if (!token || !selectedUser) return <p>Chọn người chat để bắt đầu</p>;
    return <ChatLayout token={token} targetUserID={selectedUser?.id ?? 0} />;
}