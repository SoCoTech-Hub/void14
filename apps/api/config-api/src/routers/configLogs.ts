import {
  configLogIdSchema,
  insertConfigLogParams,
  updateConfigLogParams,
} from "@soco/config-db/schema/configLogs";

import {
  createConfigLog,
  deleteConfigLog,
  updateConfigLog,
} from "../api/configLogs/mutations";
import { getConfigLogById, getConfigLogs } from "../api/configLogs/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const configLogsRouter: ReturnType<typeof createTRPCRouter> =
  createTRPCRouter({
    getConfigLogs: publicProcedure.query(async () => {
      return getConfigLogs();
    }),
    getConfigLogById: publicProcedure
      .input(configLogIdSchema)
      .query(async ({ input }) => {
        return getConfigLogById(input.id);
      }),
    createConfigLog: publicProcedure
      .input(insertConfigLogParams)
      .mutation(async ({ input }) => {
        return createConfigLog(input);
      }),
    updateConfigLog: publicProcedure
      .input(updateConfigLogParams)
      .mutation(async ({ input }) => {
        return updateConfigLog(input.id, input);
      }),
    deleteConfigLog: publicProcedure
      .input(configLogIdSchema)
      .mutation(async ({ input }) => {
        return deleteConfigLog(input.id);
      }),
  });
