import { wikiLinksRouter } from './routers/wikiLinks';
import { wikiLocksRouter } from './routers/wikiLocks';
import { wikiPagesRouter } from './routers/wikiPages';
import { wikisRouter } from './routers/wikis';
import { wikiSubwikisRouter } from './routers/wikiSubwikis';
import { wikiSynonymsRouter } from './routers/wikiSynonyms';
import { wikiVersionsRouter } from './routers/wikiVersions';
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  wikiLinks: wikiLinksRouter,
  wikiLocks: wikiLocksRouter,
  wikiPages: wikiPagesRouter,
  wikis: wikisRouter,
  wikiSubwikis: wikiSubwikisRouter,
  wikiSynonyms: wikiSynonymsRouter,
  wikiVersions: wikiVersionsRouter,
});

export type AppRouter = typeof appRouter;
