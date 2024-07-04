import {
  createBackupLog,
  deleteBackupLog,
  updateBackupLog,
} from "../api/backupLogs/mutations";
import { getBackupLogById, getBackupLogs } from "../api/backupLogs/queries";
import {
  backupLogIdSchema,
  insertBackupLogParams,
  updateBackupLogParams,
} from "../db/schema/backupLogs";
import { publicProcedure, router } from "../server/trpc";

export const backupLogsRouter = router({
  getBackupLogs: publicProcedure.query(async () => {
    return getBackupLogs();
  }),
  getBackupLogById: publicProcedure
    .input(backupLogIdSchema)
    .query(async ({ input }) => {
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
