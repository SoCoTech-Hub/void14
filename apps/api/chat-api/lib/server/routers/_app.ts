import { router } from "../server/trpc";
import { chatMessagesRouter } from "./chatMessages";
import { chatMessagesCurrentsRouter } from "./chatMessagesCurrents";
import { chatsRouter } from "./chats";
import { chatUsersRouter } from "./chatUsers";
import { computersRouter } from "./computers";

export const appRouter = router({
  computers: computersRouter,
  chats: chatsRouter,
  chatMessages: chatMessagesRouter,
  chatMessagesCurrents: chatMessagesCurrentsRouter,
  chatUsers: chatUsersRouter,
});

export type AppRouter = typeof appRouter;
