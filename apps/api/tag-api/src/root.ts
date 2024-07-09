import { createTRPCRouter } from "./trpc";

import { tagAreasRouter } from './routers/tagAreas';
import { tagCollsRouter } from './routers/tagColls';
import { tagCorrelationsRouter } from './routers/tagCorrelations';
import { tagInstancesRouter } from './routers/tagInstances';
import { tagsRouter } from './routers/tags';

export const appRouter = createTRPCRouter({
  tagAreas: tagAreasRouter,
  tagColls: tagCollsRouter,
  tagCorrelations: tagCorrelationsRouter,
  tagInstances: tagInstancesRouter,
  tags: tagsRouter,
});

export type AppRouter = typeof appRouter;