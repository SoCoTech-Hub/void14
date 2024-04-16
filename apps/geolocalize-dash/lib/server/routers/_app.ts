import { computersRouter } from "./computers";
import { router } from "@/lib/server/trpc";
import { countriesRouter } from "./countries";
import { provincesRouter } from "./provinces";
import { districtsRouter } from "./districts";

export const appRouter = router({
  computers: computersRouter,
  countries: countriesRouter,
  provinces: provincesRouter,
  districts: districtsRouter,
});

export type AppRouter = typeof appRouter;
