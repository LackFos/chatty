import WebSocket from 'ws';

class ContextRegistry {
  public contexts = new WeakMap<WebSocket, Record<string, any>>();

  public get(ws: WebSocket) {
    let context = this.contexts.get(ws);

    if (!context) {
      context = {};
      this.contexts.set(ws, {});
    }

    return context;
  }
}

export default new ContextRegistry();
