import { createTRPCRouter } from "./trpc";

import { addressesRouter } from './routers/addresses';
import { gendersRouter } from './routers/genders';
import { nextOfKinsRouter } from './routers/nextOfKins';
import { profilesRouter } from './routers/profiles';

export const appRouter = createTRPCRouter({
  addresses: addressesRouter,
  genders: gendersRouter,
  nextOfKins: nextOfKinsRouter,
  profiles: profilesRouter,
});

export type AppRouter = typeof appRouter;
