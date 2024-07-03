import { computersRouter } from "./computers";
import { router } from "@/lib/server/trpc";
import { glossariesRouter } from "./glossaries";
import { glossaryAliasesRouter } from "./glossaryAliases";
import { glossaryCategoriesRouter } from "./glossaryCategories";
import { glossaryEntriesRouter } from "./glossaryEntries";
import { glossaryEntriesCategoriesRouter } from "./glossaryEntriesCategories";
import { glossaryFormatsRouter } from "./glossaryFormats";

export const appRouter = router({
  computers: computersRouter,
  glossaries: glossariesRouter,
  glossaryAliases: glossaryAliasesRouter,
  glossaryCategories: glossaryCategoriesRouter,
  glossaryEntries: glossaryEntriesRouter,
  glossaryEntriesCategories: glossaryEntriesCategoriesRouter,
  glossaryFormats: glossaryFormatsRouter,
});

export type AppRouter = typeof appRouter;
