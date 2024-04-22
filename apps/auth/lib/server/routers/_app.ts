import { computersRouter } from "./computers";
import { router } from "@/lib/server/trpc";
import { authLtiLinkedLoginsRouter } from "./authLtiLinkedLogins";
import { authOauth2LinkedLoginsRouter } from "./authOauth2LinkedLogins";

export const appRouter = router({
  computers: computersRouter,
  authLtiLinkedLogins: authLtiLinkedLoginsRouter,
  authOauth2LinkedLogins: authOauth2LinkedLoginsRouter,
});

export type AppRouter = typeof appRouter;
