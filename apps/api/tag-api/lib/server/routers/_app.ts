import { router } from "../server/trpc";
import { tagAreasRouter } from "./tagAreas";
import { tagCollsRouter } from "./tagColls";
import { tagCorrelationsRouter } from "./tagCorrelations";
import { tagInstancesRouter } from "./tagInstances";
import { tagsRouter } from "./tags";

export const appRouter = router({
  tags: tagsRouter,
  tagColls: tagCollsRouter,
  tagAreas: tagAreasRouter,
  tagCorrelations: tagCorrelationsRouter,
  tagInstances: tagInstancesRouter,
});

export type AppRouter = typeof appRouter;
