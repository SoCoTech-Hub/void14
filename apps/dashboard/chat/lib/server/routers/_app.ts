import { computersRouter } from "./computers";
import { router } from "@/lib/server/trpc";
import { chatsRouter } from "./chats";
import { chatMessagesRouter } from "./chatMessages";
import { chatMessagesCurrentsRouter } from "./chatMessagesCurrents";
import { chatUsersRouter } from "./chatUsers";

export const appRouter = router({
  computers: computersRouter,
  chats: chatsRouter,
  chatMessages: chatMessagesRouter,
  chatMessagesCurrents: chatMessagesCurrentsRouter,
  chatUsers: chatUsersRouter,
});

export type AppRouter = typeof appRouter;
