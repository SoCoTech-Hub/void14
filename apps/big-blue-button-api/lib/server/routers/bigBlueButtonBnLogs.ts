import { getBigBlueButtonBnLogById, getBigBlueButtonBnLogs } from "@/lib/api/bigBlueButtonBnLogs/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  bigBlueButtonBnLogIdSchema,
  insertBigBlueButtonBnLogParams,
  updateBigBlueButtonBnLogParams,
} from "@/lib/db/schema/bigBlueButtonBnLogs";
import { createBigBlueButtonBnLog, deleteBigBlueButtonBnLog, updateBigBlueButtonBnLog } from "@/lib/api/bigBlueButtonBnLogs/mutations";

export const bigBlueButtonBnLogsRouter = router({
  getBigBlueButtonBnLogs: publicProcedure.query(async () => {
    return getBigBlueButtonBnLogs();
  }),
  getBigBlueButtonBnLogById: publicProcedure.input(bigBlueButtonBnLogIdSchema).query(async ({ input }) => {
    return getBigBlueButtonBnLogById(input.id);
  }),
  createBigBlueButtonBnLog: publicProcedure
    .input(insertBigBlueButtonBnLogParams)
    .mutation(async ({ input }) => {
      return createBigBlueButtonBnLog(input);
    }),
  updateBigBlueButtonBnLog: publicProcedure
    .input(updateBigBlueButtonBnLogParams)
    .mutation(async ({ input }) => {
      return updateBigBlueButtonBnLog(input.id, input);
    }),
  deleteBigBlueButtonBnLog: publicProcedure
    .input(bigBlueButtonBnLogIdSchema)
    .mutation(async ({ input }) => {
      return deleteBigBlueButtonBnLog(input.id);
    }),
});
