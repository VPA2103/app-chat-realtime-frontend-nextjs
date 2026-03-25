"use client";

import { useEffect, useRef } from "react";
import WSClient, { getWSClient } from "@/lib/ws";

export function useWebSocket(url: string, onMessage: (data: any) => void) {
  const wsRef = useRef<WSClient | null>(null);
  const onMessageRef = useRef(onMessage);

  // luôn giữ ref mới nhất
  useEffect(() => {
    onMessageRef.current = onMessage;
  }, [onMessage]);

  useEffect(() => {
    const ws = getWSClient(url);
    wsRef.current = ws;

    // wrap stable handler
    const stableHandler = (data: any) => onMessageRef.current(data);

    ws.connect();
    ws.subscribe(stableHandler);

    return () => {
      ws.unsubscribe(stableHandler);
      ws.disconnect();
    };
  }, [url]); // url thay đổi mới reconnect

  const send = (data: any) => {
    wsRef.current?.send(data);
  };

  return { send };
}