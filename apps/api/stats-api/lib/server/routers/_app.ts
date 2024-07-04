import { router } from "../server/trpc";
import { statsDailiesRouter } from "./statsDailies";
import { statsMonthliesRouter } from "./statsMonthlies";
import { statsUserDailiesRouter } from "./statsUserDailies";
import { statsUserMonthliesRouter } from "./statsUserMonthlies";
import { statsUserWeekliesRouter } from "./statsUserWeeklies";
import { statsWeekliesRouter } from "./statsWeeklies";

export const appRouter = router({
  statsDailies: statsDailiesRouter,
  statsMonthlies: statsMonthliesRouter,
  statsUserDailies: statsUserDailiesRouter,
  statsUserMonthlies: statsUserMonthliesRouter,
  statsUserWeeklies: statsUserWeekliesRouter,
  statsWeeklies: statsWeekliesRouter,
});

export type AppRouter = typeof appRouter;
