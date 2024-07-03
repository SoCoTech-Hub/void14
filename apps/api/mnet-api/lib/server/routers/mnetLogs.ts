import { getMnetLogById, getMnetLogs } from "@/lib/api/mnetLogs/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  mnetLogIdSchema,
  insertMnetLogParams,
  updateMnetLogParams,
} from "@/lib/db/schema/mnetLogs";
import { createMnetLog, deleteMnetLog, updateMnetLog } from "@/lib/api/mnetLogs/mutations";

export const mnetLogsRouter = router({
  getMnetLogs: publicProcedure.query(async () => {
    return getMnetLogs();
  }),
  getMnetLogById: publicProcedure.input(mnetLogIdSchema).query(async ({ input }) => {
    return getMnetLogById(input.id);
  }),
  createMnetLog: publicProcedure
    .input(insertMnetLogParams)
    .mutation(async ({ input }) => {
      return createMnetLog(input);
    }),
  updateMnetLog: publicProcedure
    .input(updateMnetLogParams)
    .mutation(async ({ input }) => {
      return updateMnetLog(input.id, input);
    }),
  deleteMnetLog: publicProcedure
    .input(mnetLogIdSchema)
    .mutation(async ({ input }) => {
      return deleteMnetLog(input.id);
    }),
});
