import { createTRPCRouter } from "./trpc";

import { bursariesRouter } from './routers/bursaries';
import { bursaryCategoriesRouter } from './routers/bursaryCategories';
import { bursaryCategoriesBursariesRouter } from './routers/bursaryCategoriesBursaries';
import { bursaryResponsesRouter } from './routers/bursaryResponses';

export const appRouter = createTRPCRouter({
  bursaries: bursariesRouter,
  bursaryCategories: bursaryCategoriesRouter,
  bursaryCategoriesBursaries: bursaryCategoriesBursariesRouter,
  bursaryResponses: bursaryResponsesRouter,
});

export type AppRouter = typeof appRouter;
