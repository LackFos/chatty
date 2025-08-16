import WebSocket from 'ws';

import { UserInterface } from '@/models/user.model';

export interface UserContext {
  user: UserInterface | null;
}

export type SubscribeContext = Record<string, WebSocket[] | null>;
