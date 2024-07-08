import { getLogstoreStandardLogById, getLogstoreStandardLogs } from "../api/logstoreStandardLogs/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  logstoreStandardLogIdSchema,
  insertLogstoreStandardLogParams,
  updateLogstoreStandardLogParams,
} from "@soco/log-db/schema/logstoreStandardLogs";
import { createLogstoreStandardLog, deleteLogstoreStandardLog, updateLogstoreStandardLog } from "../api/logstoreStandardLogs/mutations";

export const logstoreStandardLogsRouter =createTRPCRouter({
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
