import { createTRPCRouter } from "./trpc";

import { faqCategoriesRouter } from './routers/faqCategories';
import { faqFaqsCategoriesRouter } from './routers/faqFaqsCategories';
import { faqsRouter } from './routers/faqs';

export const appRouter = createTRPCRouter({
  faqCategories: faqCategoriesRouter,
  faqFaqsCategories: faqFaqsCategoriesRouter,
  faqs: faqsRouter,
});

export type AppRouter = typeof appRouter;
