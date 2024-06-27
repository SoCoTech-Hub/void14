import { getConfigLogById, getConfigLogs } from "@/lib/api/configLogs/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  configLogIdSchema,
  insertConfigLogParams,
  updateConfigLogParams,
} from "@/lib/db/schema/configLogs";
import { createConfigLog, deleteConfigLog, updateConfigLog } from "@/lib/api/configLogs/mutations";

export const configLogsRouter = router({
  getConfigLogs: publicProcedure.query(async () => {
    return getConfigLogs();
  }),
  getConfigLogById: publicProcedure.input(configLogIdSchema).query(async ({ input }) => {
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
