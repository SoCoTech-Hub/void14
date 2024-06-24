import { computersRouter } from "./computers";
import { router } from "@/lib/server/trpc";
import { bigBlueButtonBnsRouter } from "./bigBlueButtonBns";
import { bigBlueButtonBnLogsRouter } from "./bigBlueButtonBnLogs";
import { bigBlueButtonBnRecordingsRouter } from "./bigBlueButtonBnRecordings";

export const appRouter = router({
  computers: computersRouter,
  bigBlueButtonBns: bigBlueButtonBnsRouter,
  bigBlueButtonBnLogs: bigBlueButtonBnLogsRouter,
  bigBlueButtonBnRecordings: bigBlueButtonBnRecordingsRouter,
});

export type AppRouter = typeof appRouter;
