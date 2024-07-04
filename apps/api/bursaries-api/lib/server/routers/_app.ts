import { router } from "../server/trpc";
import { bursariesRouter } from "./bursaries";
import { bursaryCategoriesRouter } from "./bursaryCategories";
import { bursaryCategoriesBursariesRouter } from "./bursaryCategoriesBursaries";
import { bursaryResponsesRouter } from "./bursaryResponses";
import { computersRouter } from "./computers";

export const appRouter = router({
  computers: computersRouter,
  bursaryCategories: bursaryCategoriesRouter,
  bursaries: bursariesRouter,
  bursaryCategoriesBursaries: bursaryCategoriesBursariesRouter,
  bursaryResponses: bursaryResponsesRouter,
});

export type AppRouter = typeof appRouter;
