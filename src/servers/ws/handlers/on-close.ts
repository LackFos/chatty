import WebSocket from 'ws';

import UserModel from '@/models/user.model';
import { subscribeContext, userContext } from '@/servers/ws/server';

const onClose = async (ws: WebSocket) => {
  if (userContext.has(ws)) {
    const context = userContext.get(ws);

    if (context.user) {
      await UserModel.findByIdAndUpdate(context.user._id, { isOnline: false });

      const topic = `user.${context.user._id}.status`;
      subscribeContext.publish(topic, 'false');
      subscribeContext.unsubscribeAll(topic);
    }
  }

  userContext.delete(ws);
};

export default onClose;
