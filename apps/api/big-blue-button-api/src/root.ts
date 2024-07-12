import { bigBlueButtonBnLogsRouter } from "./routers/bigBlueButtonBnLogs";
import { bigBlueButtonBnRecordingsRouter } from "./routers/bigBlueButtonBnRecordings";
import { bigBlueButtonBnsRouter } from "./routers/bigBlueButtonBns";
import { createTRPCRouter } from "./trpc";

export const appRouter: ReturnType<typeof createTRPCRouter> = createTRPCRouter({
  bigBlueButtonBnLogs: bigBlueButtonBnLogsRouter,
  bigBlueButtonBnRecordings: bigBlueButtonBnRecordingsRouter,
  bigBlueButtonBns: bigBlueButtonBnsRouter,
});

export type AppRouter = typeof appRouter;
