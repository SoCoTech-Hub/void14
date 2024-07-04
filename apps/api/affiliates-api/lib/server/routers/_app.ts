import { router } from "../server/trpc";
import { affiliatesRouter } from "./affiliates";
import { affiliatesDetailsRouter } from "./affiliatesDetails";
import { affiliatesSettingsRouter } from "./affiliatesSettings";
import { affiliatesStatusesRouter } from "./affiliatesStatuses";
import { affiliatesTransactionsRouter } from "./affiliatesTransactions";
import { computersRouter } from "./computers";

export const appRouter = router({
  computers: computersRouter,
  affiliates: affiliatesRouter,
  affiliatesDetails: affiliatesDetailsRouter,
  affiliatesSettings: affiliatesSettingsRouter,
  affiliatesStatuses: affiliatesStatusesRouter,
  affiliatesTransactions: affiliatesTransactionsRouter,
});

export type AppRouter = typeof appRouter;
