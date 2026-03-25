type MessageHandler = (data: any) => void;


const wsInstances = new Map<string, WSClient>();

export function getWSClient(url: string): WSClient {
  if (!wsInstances.has(url)) {
    wsInstances.set(url, new WSClient(url));
  }
  return wsInstances.get(url)!;
}
class WSClient {
  private ws: WebSocket | null = null;
  private url: string;
  private listeners: MessageHandler[] = [];
  private shouldReconnect = true;

  constructor(url: string) {
    this.url = url;
  }

  connect() {
    if (
      this.ws &&
      (this.ws.readyState === WebSocket.OPEN ||
        this.ws.readyState === WebSocket.CONNECTING)
    ) {
      return;
    }

    this.shouldReconnect = true;
    this.ws = new WebSocket(this.url);

    // ✅ Fix bug 1: wire onmessage
    this.ws.onmessage = (event) => {
      console.log("🔥 RAW onmessage fired:", event.data);
      try {
        const data = JSON.parse(event.data);
        this.listeners.forEach((cb) => cb(data));
      } catch (e) {
        console.error("WS parse error:", e);
      }
    };

    this.ws.onopen = () => {
      console.log("🟢 WS connected:", this.url);
      this.send({ type: "ping" });
    };

    this.ws.onerror = (e) => {
      console.error(
        "🔴 WS error, readyState:",
        this.ws?.readyState ?? "ws is null",
      );
    };

    this.ws.onclose = () => {
      this.ws = null;
      if (this.shouldReconnect) {
        console.log("🟡 WS reconnecting in 2s...");
        setTimeout(() => this.connect(), 2000);
      }
    };
  }

  disconnect() {
    this.shouldReconnect = false;
    this.ws?.close();
    this.ws = null;
  }

  send(data: any) {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(data));
    } else {
      console.warn("⚠️ WS not open, cannot send");
    }
  }

  subscribe(cb: MessageHandler) {
    this.listeners.push(cb);
  }

  unsubscribe(cb: MessageHandler) {
    this.listeners = this.listeners.filter((l) => l !== cb);
  }
}

export default WSClient;
