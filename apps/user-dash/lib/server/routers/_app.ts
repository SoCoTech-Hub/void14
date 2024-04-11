import { computersRouter } from "./computers";
import { router } from "@/lib/server/trpc";
import { usersRouter } from "./users";

export const appRouter = router({
  computers: computersRouter,
  users: usersRouter,
});

export type AppRouter = typeof appRouter;
