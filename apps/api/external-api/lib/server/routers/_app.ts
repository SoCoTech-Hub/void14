import { router } from "../server/trpc";
import { computersRouter } from "./computers";
import { faqCategoriesRouter } from "./faqCategories";
import { faqFaqsCategoriesRouter } from "./faqFaqsCategories";
import { faqsRouter } from "./faqs";

export const appRouter = router({
  computers: computersRouter,
  faqs: faqsRouter,
  faqCategories: faqCategoriesRouter,
  faqFaqsCategories: faqFaqsCategoriesRouter,
});

export type AppRouter = typeof appRouter;
