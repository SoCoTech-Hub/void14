import { bigBlueButtonBnLogsRouter } from './routers/bigBlueButtonBnLogs';
import { bigBlueButtonBnRecordingsRouter } from './routers/bigBlueButtonBnRecordings';
import { bigBlueButtonBnsRouter } from './routers/bigBlueButtonBns';
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  bigBlueButtonBnLogs: bigBlueButtonBnLogsRouter,
  bigBlueButtonBnRecordings: bigBlueButtonBnRecordingsRouter,
  bigBlueButtonBns: bigBlueButtonBnsRouter,
});

export type AppRouter = typeof appRouter;
