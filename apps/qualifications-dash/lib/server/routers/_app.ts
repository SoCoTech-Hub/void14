import { computersRouter } from "./computers";
import { router } from "@/lib/server/trpc";
import { qualificationsRouter } from "./qualifications";
import { qualificationsResponsesRouter } from "./qualificationsResponses";

export const appRouter = router({
  computers: computersRouter,
  qualifications: qualificationsRouter,
  qualificationsResponses: qualificationsResponsesRouter,
});

export type AppRouter = typeof appRouter;
