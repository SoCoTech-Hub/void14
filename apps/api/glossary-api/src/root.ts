import { glossariesRouter } from './routers/glossaries';
import { glossaryAliasesRouter } from './routers/glossaryAliases';
import { glossaryCategoriesRouter } from './routers/glossaryCategories';
import { glossaryEntriesRouter } from './routers/glossaryEntries';
import { glossaryEntriesCategoriesRouter } from './routers/glossaryEntriesCategories';
import { glossaryFormatsRouter } from './routers/glossaryFormats';
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  glossaries: glossariesRouter,
  glossaryAliases: glossaryAliasesRouter,
  glossaryCategories: glossaryCategoriesRouter,
  glossaryEntries: glossaryEntriesRouter,
  glossaryEntriesCategories: glossaryEntriesCategoriesRouter,
  glossaryFormats: glossaryFormatsRouter,
});

export type AppRouter = typeof appRouter;
