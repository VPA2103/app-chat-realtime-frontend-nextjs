"use client";

import { useState, useEffect } from "react";
import type { Message } from "@/types/chat";
import { getChatHistory, sendMessage } from "@/api/chat";
import { useWebSocket } from "./useWebSocket";

export function useChat(token: string, targetUserID: number) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  // 1. Load history (REST)
  useEffect(() => {
    setLoading(true);
    getChatHistory(token, targetUserID)
      .then((data) => setMessages(data))
      .finally(() => setLoading(false));
  }, [token, targetUserID]);

  // 2. Realtime receive (WS)
  const { send: wsSend } = useWebSocket(
    `ws://localhost:8080/ws?token=${token}`,
    (data) => {
      // filter đúng room (rất quan trọng)
      if (
        data.sender_id === targetUserID ||
        data.target_user_id === targetUserID
      ) {
        setMessages((prev) => [...prev, data]);
      }
    },
  );

  // 3. Send message (WS thay vì REST)
  const handleSend = (content: string) => {
    const optimisticMsg: Message = {
      id: Date.now(),
      role: "user",
      content,
      time: new Date().toLocaleTimeString(),
    };

    // optimistic UI
    setMessages((prev) => [...prev, optimisticMsg]);

    wsSend({
      target_user_id: targetUserID,
      content,
    });
  };

  return { messages, loading, send: handleSend };
}
