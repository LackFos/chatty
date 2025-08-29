import WebSocket from 'ws';

class UserContext<K extends WebSocket, T> {
  public contexts = new WeakMap<K, T>();
  private initialContext: T;

  constructor(initialContext: T) {
    this.initialContext = initialContext;
  }

  public get(key: K): T {
    let context = this.contexts.get(key);

    if (!context) {
      context = { ...this.initialContext };
      this.contexts.set(key, context);
    }

    return context;
  }

  public has(key: K): boolean {
    return this.contexts.has(key);
  }

  public delete(key: K): void {
    this.contexts.delete(key);
  }
}

export default UserContext;
