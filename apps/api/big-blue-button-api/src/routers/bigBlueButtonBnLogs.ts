import {
  bigBlueButtonBnLogIdSchema,
  insertBigBlueButtonBnLogParams,
  updateBigBlueButtonBnLogParams,
} from "@soco/big-blue-button-db/schema/bigBlueButtonBnLogs";

import {
  createBigBlueButtonBnLog,
  deleteBigBlueButtonBnLog,
  updateBigBlueButtonBnLog,
} from "../api/bigBlueButtonBnLogs/mutations";
import {
  getBigBlueButtonBnLogById,
  getBigBlueButtonBnLogs,
} from "../api/bigBlueButtonBnLogs/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const bigBlueButtonBnLogsRouter: ReturnType<typeof createTRPCRouter> =
  createTRPCRouter({
    getBigBlueButtonBnLogs: publicProcedure.query(async () => {
      return getBigBlueButtonBnLogs();
    }),
    getBigBlueButtonBnLogById: publicProcedure
      .input(bigBlueButtonBnLogIdSchema)
      .query(async ({ input }) => {
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
