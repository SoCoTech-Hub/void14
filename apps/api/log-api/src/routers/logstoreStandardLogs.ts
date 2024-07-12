import {
  insertLogstoreStandardLogParams,
  logstoreStandardLogIdSchema,
  updateLogstoreStandardLogParams,
} from "@soco/log-db/schema/logstoreStandardLogs";

import {
  createLogstoreStandardLog,
  deleteLogstoreStandardLog,
  updateLogstoreStandardLog,
} from "../api/logstoreStandardLogs/mutations";
import {
  getLogstoreStandardLogById,
  getLogstoreStandardLogs,
} from "../api/logstoreStandardLogs/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const logstoreStandardLogsRouter = createTRPCRouter({
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
