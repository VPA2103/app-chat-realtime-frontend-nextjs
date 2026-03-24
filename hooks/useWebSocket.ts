"use client";

import { useEffect, useRef } from "react";
import WSClient from "@/lib/ws";

export function useWebSocket(url: string, onMessage: (data: any) => void) {
  const wsRef = useRef<WSClient | null>(null);

  useEffect(() => {
    const ws = new WSClient(url);
    wsRef.current = ws;

    ws.connect();
    ws.subscribe(onMessage);

    return () => {
      ws.unsubscribe(onMessage);
    };
  }, [url]);

  const send = (data: any) => {
    wsRef.current?.send(data);
  };

  return { send };
}