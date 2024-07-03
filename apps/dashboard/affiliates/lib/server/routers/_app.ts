import { computersRouter } from "./computers";
import { router } from "@/lib/server/trpc";
import { affiliatesRouter } from "./affiliates";
import { affiliatesDetailsRouter } from "./affiliatesDetails";
import { affiliatesSettingsRouter } from "./affiliatesSettings";
import { affiliatesStatusesRouter } from "./affiliatesStatuses";
import { affiliatesTransactionsRouter } from "./affiliatesTransactions";

export const appRouter = router({
  computers: computersRouter,
  affiliates: affiliatesRouter,
  affiliatesDetails: affiliatesDetailsRouter,
  affiliatesSettings: affiliatesSettingsRouter,
  affiliatesStatuses: affiliatesStatusesRouter,
  affiliatesTransactions: affiliatesTransactionsRouter,
});

export type AppRouter = typeof appRouter;
