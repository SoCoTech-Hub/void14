import { computersRouter } from './computers'
import { router } from '../server/trpc'
import { faqsRouter } from './faqs'
import { faqCategoriesRouter } from './faqCategories'
import { faqFaqsCategoriesRouter } from './faqFaqsCategories'
import { fileConversionsRouter } from "./fileConversions";
import { filesRouter } from "./files";
import { filesReferencesRouter } from "./filesReferences";
import { foldersRouter } from "./folders";
import { infectedFilesRouter } from "./infectedFiles";

export const appRouter = router({
	computers: computersRouter,
	faqs: faqsRouter,
	faqCategories: faqCategoriesRouter,
	faqFaqsCategories: faqFaqsCategoriesRouter
})

export type AppRouter = typeof appRouter
  fileConversions: fileConversionsRouter,
  files: filesRouter,
  filesReferences: filesReferencesRouter,
  folders: foldersRouter,
  infectedFiles: infectedFilesRouter,
