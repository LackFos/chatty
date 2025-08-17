import WebSocket from 'ws';

type Topic = string;
type Subscribers = Set<WebSocket>;

class SubscribeContext {
  public contexts = new Map<Topic, Subscribers>();

  public subscribe(topic: Topic, subscriber: WebSocket): void {
    const exisitingSubscribers = this.contexts.get(topic);

    if (!exisitingSubscribers) {
      this.contexts.set(topic, new Set([subscriber]));
      return;
    }

    exisitingSubscribers.add(subscriber);
  }

  public unsubscribe(topic: Topic, subscriber: WebSocket): void {
    const subscribers = this.contexts.get(topic);

    if (subscribers) {
      subscribers.delete(subscriber);
    }
  }

  public unsubscribeAll(topic: Topic): void {
    this.contexts.delete(topic);
  }

  public publish(topic: Topic, message: string): void {
    const subscribers = this.contexts.get(topic);

    if (subscribers) {
      subscribers.forEach((subscriber) => {
        subscriber.send(message);
      });
    }
  }
}

export default SubscribeContext;
