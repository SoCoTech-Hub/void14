import { createTRPCRouter } from "./trpc";

import { massMailListsRouter } from './routers/massMailLists';
import { massMailListsRecipientsRouter } from './routers/massMailListsRecipients';
import { massMailMessagesRouter } from './routers/massMailMessages';
import { massMailRecipientsRouter } from './routers/massMailRecipients';

export const appRouter = createTRPCRouter({
  massMailLists: massMailListsRouter,
  massMailListsRecipients: massMailListsRecipientsRouter,
  massMailMessages: massMailMessagesRouter,
  massMailRecipients: massMailRecipientsRouter,
});

export type AppRouter = typeof appRouter;
