import { getContextTempById, getContextTemp } from "../api/contextTemp/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  contextTempIdSchema,
  insertContextTempParams,
  updateContextTempParams,
} from "@soco/context-db/schema/contextTemp";
import { createContextTemp, deleteContextTemp, updateContextTemp } from "../api/contextTemp/mutations";

export const contextTempRouter =createTRPCRouter({
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
