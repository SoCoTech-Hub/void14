import { toolUserToursStepsRouter } from "./routers/toolUserToursSteps";
import { toolUserToursToursRouter } from "./routers/toolUserToursTours";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  toolUserToursSteps: toolUserToursStepsRouter,
  toolUserToursTours: toolUserToursToursRouter,
});

export type AppRouter = typeof appRouter;
