import { router } from "../server/trpc";
import { qualificationsRouter } from "./qualifications";
import { qualificationsResponsesRouter } from "./qualificationsResponses";

export const appRouter = router({
  qualifications: qualificationsRouter,
  qualificationsResponses: qualificationsResponsesRouter,
});

export type AppRouter = typeof appRouter;
