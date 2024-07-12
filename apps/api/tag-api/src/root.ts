import { tagAreasRouter } from "./routers/tagAreas";
import { tagCollsRouter } from "./routers/tagColls";
import { tagCorrelationsRouter } from "./routers/tagCorrelations";
import { tagInstancesRouter } from "./routers/tagInstances";
import { tagsRouter } from "./routers/tags";
import { createTRPCRouter } from "./trpc";

export const appRouter: ReturnType<typeof createTRPCRouter> = createTRPCRouter({
  tagAreas: tagAreasRouter,
  tagColls: tagCollsRouter,
  tagCorrelations: tagCorrelationsRouter,
  tagInstances: tagInstancesRouter,
  tags: tagsRouter,
});

export type AppRouter = typeof appRouter;
