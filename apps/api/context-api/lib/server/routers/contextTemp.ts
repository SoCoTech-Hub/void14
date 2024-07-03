import { getContextTempById, getContextTemp } from "@/lib/api/contextTemp/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  contextTempIdSchema,
  insertContextTempParams,
  updateContextTempParams,
} from "@/lib/db/schema/contextTemp";
import { createContextTemp, deleteContextTemp, updateContextTemp } from "@/lib/api/contextTemp/mutations";

export const contextTempRouter = router({
  getContextTemp: publicProcedure.query(async () => {
    return getContextTemp();
  }),
  getContextTempById: publicProcedure.input(contextTempIdSchema).query(async ({ input }) => {
    return getContextTempById(input.id);
  }),
  createContextTemp: publicProcedure
    .input(insertContextTempParams)
    .mutation(async ({ input }) => {
      return createContextTemp(input);
    }),
  updateContextTemp: publicProcedure
    .input(updateContextTempParams)
    .mutation(async ({ input }) => {
      return updateContextTemp(input.id, input);
    }),
  deleteContextTemp: publicProcedure
    .input(contextTempIdSchema)
    .mutation(async ({ input }) => {
      return deleteContextTemp(input.id);
    }),
});
