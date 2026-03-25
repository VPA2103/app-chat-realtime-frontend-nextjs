"use client";

import { useState, useEffect } from "react";
import type { Message } from "@/types/chat";
import { getChatHistory } from "@/api/chat";
import { useWebSocket } from "./useWebSocket";

export function useChat(token: string, targetUserID: number) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getChatHistory(token, targetUserID)
      .then((data) => setMessages(data))
      .finally(() => setLoading(false));
  }, [token, targetUserID]);

  const protocol = window.location.protocol === "https:" ? "wss" : "ws";
  const wsUrl = `${protocol}://localhost:8080/ws?token=${token}&target_user_id=${targetUserID}`;

  const { send: wsSend } = useWebSocket(wsUrl, (data) => {
    console.log("📨 WS received raw:", data);

    if (data.type !== "chat") return; // ← "chat" không phải "message"

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        role: data.sender_id === targetUserID ? "assistant" : "user", // ← đổi lại role
        content: data.content,
        time: new Date(data.timestamp * 1000).toLocaleTimeString(),
      },
    ]);
  });

  const handleSend = (content: string) => {
    // optimistic UI
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        role: "user",
        content,
        time: new Date().toLocaleTimeString(),
      },
    ]);

    wsSend({
      type: "chat", // ← "chat" không phải "message"
      target_user_id: targetUserID,
      content,
    });
  };

  return { messages, loading, send: handleSend };
}