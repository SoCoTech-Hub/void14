import {
  contextTempIdSchema,
  insertContextTempParams,
  updateContextTempParams,
} from "@soco/context-db/schema/contextTemp";

import {
  createContextTemp,
  deleteContextTemp,
  updateContextTemp,
} from "../api/contextTemp/mutations";
import { getContextTemp, getContextTempById } from "../api/contextTemp/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const contextTempRouter = createTRPCRouter({
  getContextTemp: publicProcedure.query(async () => {
    return getContextTemp();
  }),
  getContextTempById: publicProcedure
    .input(contextTempIdSchema)
    .query(async ({ input }) => {
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
