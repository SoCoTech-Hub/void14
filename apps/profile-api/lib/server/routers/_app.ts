import { computersRouter } from "./computers";
import { router } from "@/lib/server/trpc";
import { profilesRouter } from "./profiles";
import { gendersRouter } from "./genders";
import { nextOfKinsRouter } from "./nextOfKins";
import { addressesRouter } from "./addresses";

export const appRouter = router({
  computers: computersRouter,
  profiles: profilesRouter,
  genders: gendersRouter,
  nextOfKins: nextOfKinsRouter,
  addresses: addressesRouter,
});

export type AppRouter = typeof appRouter;
