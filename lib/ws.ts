type MessageHandler = (data: any) => void;

class WSClient {
  private ws: WebSocket | null = null;
  private url: string;
  private listeners: MessageHandler[] = [];

  constructor(url: string) {
    this.url = url;
  }

  connect() {
    if (this.ws) return;

    this.ws = new WebSocket(this.url);

    this.ws.onopen = () => {
      console.log("WS connected");
    };

    this.ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      this.listeners.forEach((cb) => cb(data));
    };

    this.ws.onclose = () => {
      console.log("WS disconnected");
      this.ws = null;

      // auto reconnect (optional)
      setTimeout(() => this.connect(), 2000);
    };

    this.ws.onerror = (err) => {
      console.error("WS error", err);
    };
  }

  send(data: any) {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(data));
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