import {
  createLogstoreStandardLog,
  deleteLogstoreStandardLog,
  updateLogstoreStandardLog,
} from "../api/logstoreStandardLogs/mutations";
import {
  getLogstoreStandardLogById,
  getLogstoreStandardLogs,
} from "../api/logstoreStandardLogs/queries";
import {
  insertLogstoreStandardLogParams,
  logstoreStandardLogIdSchema,
  updateLogstoreStandardLogParams,
} from "../db/schema/logstoreStandardLogs";
import { publicProcedure, router } from "../server/trpc";

export const logstoreStandardLogsRouter = router({
  getLogstoreStandardLogs: publicProcedure.query(async () => {
    return getLogstoreStandardLogs();
  }),
  getLogstoreStandardLogById: publicProcedure
    .input(logstoreStandardLogIdSchema)
    .query(async ({ input }) => {
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
