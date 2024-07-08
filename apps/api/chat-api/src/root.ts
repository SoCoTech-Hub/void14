import { createTRPCRouter } from "./trpc";

import { chatMessagesRouter } from './routers/chatMessages';
import { chatMessagesCurrentsRouter } from './routers/chatMessagesCurrents';
import { chatsRouter } from './routers/chats';
import { chatUsersRouter } from './routers/chatUsers';

export const appRouter = createTRPCRouter({
  chatMessages: chatMessagesRouter,
  chatMessagesCurrents: chatMessagesCurrentsRouter,
  chats: chatsRouter,
  chatUsers: chatUsersRouter,
});

export type AppRouter = typeof appRouter;
