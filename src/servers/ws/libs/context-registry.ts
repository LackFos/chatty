class contextRegistry<K extends object, T> {
  public contexts = new WeakMap<K, T>();
  private initialContext: T;

  constructor(initialContext: T) {
    this.initialContext = initialContext;
  }

  public get(key: K): T {
    let context = this.contexts.get(key);

    if (!context) {
      context = this.initialContext;
      this.contexts.set(key, this.initialContext);
    }

    return context;
  }

  public delete(key: K) {
    this.contexts.delete(key);
  }
}

export default contextRegistry;
