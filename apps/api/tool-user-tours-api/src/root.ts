import { toolUserToursStepsRouter } from "./routers/toolUserToursSteps";
import { toolUserToursToursRouter } from "./routers/toolUserToursTours";
import { createTRPCRouter } from "./trpc";

export const appRouter: ReturnType<typeof createTRPCRouter> = createTRPCRouter({
  toolUserToursSteps: toolUserToursStepsRouter,
  toolUserToursTours: toolUserToursToursRouter,
});

export type AppRouter = typeof appRouter;
