import { h5pactivitiesRouter } from "./routers/h5pactivities";
import { h5pactivityAttemptsRouter } from "./routers/h5pactivityAttempts";
import { h5pactivityAttemptsResultsRouter } from "./routers/h5pactivityAttemptsResults";
import { h5pContentsLibrariesRouter } from "./routers/h5pContentsLibraries";
import { h5pLibrariesRouter } from "./routers/h5pLibraries";
import { h5pLibrariesCachedassetsRouter } from "./routers/h5pLibrariesCachedassets";
import { h5pLibraryDependenciesRouter } from "./routers/h5pLibraryDependencies";
import { h5psRouter } from "./routers/h5ps";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  h5pactivities: h5pactivitiesRouter,
  h5pactivityAttempts: h5pactivityAttemptsRouter,
  h5pactivityAttemptsResults: h5pactivityAttemptsResultsRouter,
  h5pContentsLibraries: h5pContentsLibrariesRouter,
  h5pLibraries: h5pLibrariesRouter,
  h5pLibrariesCachedassets: h5pLibrariesCachedassetsRouter,
  h5pLibraryDependencies: h5pLibraryDependenciesRouter,
  h5ps: h5psRouter,
});

export type AppRouter = typeof appRouter;
