import { getLogstoreStandardLogById, getLogstoreStandardLogs } from "@/lib/api/logstoreStandardLogs/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  logstoreStandardLogIdSchema,
  insertLogstoreStandardLogParams,
  updateLogstoreStandardLogParams,
} from "@/lib/db/schema/logstoreStandardLogs";
import { createLogstoreStandardLog, deleteLogstoreStandardLog, updateLogstoreStandardLog } from "@/lib/api/logstoreStandardLogs/mutations";

export const logstoreStandardLogsRouter = router({
  getLogstoreStandardLogs: publicProcedure.query(async () => {
    return getLogstoreStandardLogs();
  }),
  getLogstoreStandardLogById: publicProcedure.input(logstoreStandardLogIdSchema).query(async ({ input }) => {
    return getLogstoreStandardLogById(input.id);
  }),
  createLogstoreStandardLog: publicProcedure
    .input(insertLogstoreStandardLogParams)
    .mutation(async ({ input }) => {
      return createLogstoreStandardLog(input);
    }),
  updateLogstoreStandardLog: publicProcedure
    .input(updateLogstoreStandardLogParams)
    .mutation(async ({ input }) => {
      return updateLogstoreStandardLog(input.id, input);
    }),
  deleteLogstoreStandardLog: publicProcedure
    .input(logstoreStandardLogIdSchema)
    .mutation(async ({ input }) => {
      return deleteLogstoreStandardLog(input.id);
    }),
});
