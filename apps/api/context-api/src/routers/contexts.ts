import {
  contextIdSchema,
  insertContextParams,
  updateContextParams,
} from "@soco/context-db/schema/contexts";

import {
  createContext,
  deleteContext,
  updateContext,
} from "../api/contexts/mutations";
import { getContextById, getContexts } from "../api/contexts/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const contextsRouter = createTRPCRouter({
  getContexts: publicProcedure.query(async () => {
    return getContexts();
  }),
  getContextById: publicProcedure
    .input(contextIdSchema)
    .query(async ({ input }) => {
      return getContextById(input.id);
    }),
  createContext: publicProcedure
    .input(insertContextParams)
    .mutation(async ({ input }) => {
      return createContext(input);
    }),
  updateContext: publicProcedure
    .input(updateContextParams)
    .mutation(async ({ input }) => {
      return updateContext(input.id, input);
    }),
  deleteContext: publicProcedure
    .input(contextIdSchema)
    .mutation(async ({ input }) => {
      return deleteContext(input.id);
    }),
});
