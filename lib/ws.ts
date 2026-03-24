type MessageHandler = (data: any) => void;

class WSClient {
  private ws: WebSocket | null = null;
  private url: string;
  private listeners: MessageHandler[] = [];

  constructor(url: string) {
    this.url = url;
  }

  private shouldReconnect = true;

  connect() {
    if (this.ws) return;

    this.shouldReconnect = true;
    this.ws = new WebSocket(this.url);

    this.ws.onclose = () => {
      this.ws = null;

      if (this.shouldReconnect) {
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
