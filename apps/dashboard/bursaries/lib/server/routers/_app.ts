import { computersRouter } from "./computers";
import { router } from "@/lib/server/trpc";
import { bursaryCategoriesRouter } from "./bursaryCategories";
import { bursariesRouter } from "./bursaries";
import { bursaryCategoriesBursariesRouter } from "./bursaryCategoriesBursaries";
import { bursaryResponsesRouter } from "./bursaryResponses";

export const appRouter = router({
  computers: computersRouter,
  bursaryCategories: bursaryCategoriesRouter,
  bursaries: bursariesRouter,
  bursaryCategoriesBursaries: bursaryCategoriesBursariesRouter,
  bursaryResponses: bursaryResponsesRouter,
});

export type AppRouter = typeof appRouter;
