import { addressesRouter } from "./routers/addresses";
import { gendersRouter } from "./routers/genders";
import { nextOfKinsRouter } from "./routers/nextOfKins";
import { profilesRouter } from "./routers/profiles";
import { createTRPCRouter } from "./trpc";

export const appRouter: ReturnType<typeof createTRPCRouter> = createTRPCRouter({
  addresses: addressesRouter,
  genders: gendersRouter,
  nextOfKins: nextOfKinsRouter,
  profiles: profilesRouter,
});

export type AppRouter = typeof appRouter;
