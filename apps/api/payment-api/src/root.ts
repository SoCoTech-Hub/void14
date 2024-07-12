import { paygwPaypalsRouter } from "./routers/paygwPaypals";
import { paymentAccountsRouter } from "./routers/paymentAccounts";
import { paymentGatewaysRouter } from "./routers/paymentGateways";
import { paymentsRouter } from "./routers/payments";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  paygwPaypals: paygwPaypalsRouter,
  paymentAccounts: paymentAccountsRouter,
  paymentGateways: paymentGatewaysRouter,
  payments: paymentsRouter,
});

export type AppRouter = typeof appRouter;
