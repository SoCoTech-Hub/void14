import { getBackupLogById, getBackupLogs } from "@/lib/api/backupLogs/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  backupLogIdSchema,
  insertBackupLogParams,
  updateBackupLogParams,
} from "@/lib/db/schema/backupLogs";
import { createBackupLog, deleteBackupLog, updateBackupLog } from "@/lib/api/backupLogs/mutations";

export const backupLogsRouter = router({
  getBackupLogs: publicProcedure.query(async () => {
    return getBackupLogs();
  }),
  getBackupLogById: publicProcedure.input(backupLogIdSchema).query(async ({ input }) => {
    return getBackupLogById(input.id);
  }),
  createBackupLog: publicProcedure
    .input(insertBackupLogParams)
    .mutation(async ({ input }) => {
      return createBackupLog(input);
    }),
  updateBackupLog: publicProcedure
    .input(updateBackupLogParams)
    .mutation(async ({ input }) => {
      return updateBackupLog(input.id, input);
    }),
  deleteBackupLog: publicProcedure
    .input(backupLogIdSchema)
    .mutation(async ({ input }) => {
      return deleteBackupLog(input.id);
    }),
});
