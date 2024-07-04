import { router } from "../server/trpc";
import { addressesRouter } from "./addresses";
import { computersRouter } from "./computers";
import { gendersRouter } from "./genders";
import { nextOfKinsRouter } from "./nextOfKins";
import { profilesRouter } from "./profiles";

export const appRouter = router({
  computers: computersRouter,
  profiles: profilesRouter,
  genders: gendersRouter,
  nextOfKins: nextOfKinsRouter,
  addresses: addressesRouter,
});

export type AppRouter = typeof appRouter;
