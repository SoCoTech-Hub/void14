import { bursariesRouter } from "./routers/bursaries";
import { bursaryCategoriesRouter } from "./routers/bursaryCategories";
import { bursaryCategoriesBursariesRouter } from "./routers/bursaryCategoriesBursaries";
import { bursaryResponsesRouter } from "./routers/bursaryResponses";
import { createTRPCRouter } from "./trpc";

export const appRouter: ReturnType<typeof createTRPCRouter> = createTRPCRouter({
  bursaries: bursariesRouter,
  bursaryCategories: bursaryCategoriesRouter,
  bursaryCategoriesBursaries: bursaryCategoriesBursariesRouter,
  bursaryResponses: bursaryResponsesRouter,
});

export type AppRouter = typeof appRouter;
