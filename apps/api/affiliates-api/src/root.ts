import { affiliatesRouter } from "./routers/affiliates";
import { affiliatesDetailsRouter } from "./routers/affiliatesDetails";
import { affiliatesSettingsRouter } from "./routers/affiliatesSettings";
import { affiliatesStatusesRouter } from "./routers/affiliatesStatuses";
import { affiliatesTransactionsRouter } from "./routers/affiliatesTransactions";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  affiliates: affiliatesRouter,
  affiliatesDetails: affiliatesDetailsRouter,
  affiliatesSettings: affiliatesSettingsRouter,
  affiliatesStatuses: affiliatesStatusesRouter,
  affiliatesTransactions: affiliatesTransactionsRouter,
});

export type AppRouter = typeof appRouter;
