import { statsDailiesRouter } from './routers/statsDailies';
import { statsMonthliesRouter } from './routers/statsMonthlies';
import { statsUserDailiesRouter } from './routers/statsUserDailies';
import { statsUserMonthliesRouter } from './routers/statsUserMonthlies';
import { statsUserWeekliesRouter } from './routers/statsUserWeeklies';
import { statsWeekliesRouter } from './routers/statsWeeklies';
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  statsDailies: statsDailiesRouter,
  statsMonthlies: statsMonthliesRouter,
  statsUserDailies: statsUserDailiesRouter,
  statsUserMonthlies: statsUserMonthliesRouter,
  statsUserWeeklies: statsUserWeekliesRouter,
  statsWeeklies: statsWeekliesRouter,
});

export type AppRouter = typeof appRouter;
