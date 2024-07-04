import { router } from "../server/trpc";
import { computersRouter } from "./computers";
import { massMailListsRouter } from "./massMailLists";
import { massMailListsRecipientsRouter } from "./massMailListsRecipients";
import { massMailMessagesRouter } from "./massMailMessages";
import { massMailRecipientsRouter } from "./massMailRecipients";

export const appRouter = router({
  computers: computersRouter,
  massMailLists: massMailListsRouter,
  massMailRecipients: massMailRecipientsRouter,
  massMailMessages: massMailMessagesRouter,
  massMailListsRecipients: massMailListsRecipientsRouter,
});

export type AppRouter = typeof appRouter;
