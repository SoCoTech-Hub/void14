import { router } from "../server/trpc";
import { computersRouter } from "./computers";
import { wikiLinksRouter } from "./wikiLinks";
import { wikiLocksRouter } from "./wikiLocks";
import { wikiPagesRouter } from "./wikiPages";
import { wikisRouter } from "./wikis";
import { wikiSubwikisRouter } from "./wikiSubwikis";
import { wikiSynonymsRouter } from "./wikiSynonyms";
import { wikiVersionsRouter } from "./wikiVersions";

export const appRouter = router({
  computers: computersRouter,
  wikis: wikisRouter,
  wikiPages: wikiPagesRouter,
  wikiLinks: wikiLinksRouter,
  wikiLocks: wikiLocksRouter,
  wikiSubwikis: wikiSubwikisRouter,
  wikiSynonyms: wikiSynonymsRouter,
  wikiVersions: wikiVersionsRouter,
});

export type AppRouter = typeof appRouter;
