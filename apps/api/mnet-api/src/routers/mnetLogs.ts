import {
  insertMnetLogParams,
  mnetLogIdSchema,
  updateMnetLogParams,
} from "@soco/mnet-db/schema/mnetLogs";

import {
  createMnetLog,
  deleteMnetLog,
  updateMnetLog,
} from "../api/mnetLogs/mutations";
import { getMnetLogById, getMnetLogs } from "../api/mnetLogs/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const mnetLogsRouter = createTRPCRouter({
  getMnetLogs: publicProcedure.query(async () => {
    return getMnetLogs();
  }),
  getMnetLogById: publicProcedure
    .input(mnetLogIdSchema)
    .query(async ({ input }) => {
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
