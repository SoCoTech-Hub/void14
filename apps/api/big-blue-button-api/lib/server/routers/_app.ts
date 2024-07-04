import { router } from "../server/trpc";
import { bigBlueButtonBnLogsRouter } from "./bigBlueButtonBnLogs";
import { bigBlueButtonBnRecordingsRouter } from "./bigBlueButtonBnRecordings";
import { bigBlueButtonBnsRouter } from "./bigBlueButtonBns";
import { computersRouter } from "./computers";

export const appRouter = router({
  computers: computersRouter,
  bigBlueButtonBns: bigBlueButtonBnsRouter,
  bigBlueButtonBnLogs: bigBlueButtonBnLogsRouter,
  bigBlueButtonBnRecordings: bigBlueButtonBnRecordingsRouter,
});

export type AppRouter = typeof appRouter;
