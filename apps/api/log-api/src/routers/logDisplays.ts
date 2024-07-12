import {
  insertLogDisplayParams,
  logDisplayIdSchema,
  updateLogDisplayParams,
} from "@soco/log-db/schema/logDisplays";

import {
  createLogDisplay,
  deleteLogDisplay,
  updateLogDisplay,
} from "../api/logDisplays/mutations";
import { getLogDisplayById, getLogDisplays } from "../api/logDisplays/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const logDisplaysRouter = createTRPCRouter({
  getLogDisplays: publicProcedure.query(async () => {
    return getLogDisplays();
  }),
  getLogDisplayById: publicProcedure
    .input(logDisplayIdSchema)
    .query(async ({ input }) => {
      return getLogDisplayById(input.id);
    }),
  createLogDisplay: publicProcedure
    .input(insertLogDisplayParams)
    .mutation(async ({ input }) => {
      return createLogDisplay(input);
    }),
  updateLogDisplay: publicProcedure
    .input(updateLogDisplayParams)
    .mutation(async ({ input }) => {
      return updateLogDisplay(input.id, input);
    }),
  deleteLogDisplay: publicProcedure
    .input(logDisplayIdSchema)
    .mutation(async ({ input }) => {
      return deleteLogDisplay(input.id);
    }),
});
