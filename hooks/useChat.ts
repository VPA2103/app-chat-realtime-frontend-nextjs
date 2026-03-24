'use client';

import { useState, useEffect } from "react";
import type { Message } from "@/types/chat";
import { getChatHistory, sendMessage } from "@/api/chat";

export function useChat(token: string, targetUserID: number) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getChatHistory(token, targetUserID)
      .then((data) => setMessages(data))
      .finally(() => setLoading(false));
  }, [token, targetUserID]);

  const handleSend = async (content: string) => {
    try {
      const newMsg = await sendMessage(token, targetUserID, content);
      setMessages((prev) => [...prev, newMsg]);
    } catch (err) {
      console.error(err);
    }
  };

  return { messages, loading, send: handleSend };
}