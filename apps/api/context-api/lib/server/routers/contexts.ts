import {
  createContext,
  deleteContext,
  updateContext,
} from "../api/contexts/mutations";
import { getContextById, getContexts } from "../api/contexts/queries";
import {
  contextIdSchema,
  insertContextParams,
  updateContextParams,
} from "../db/schema/contexts";
import { publicProcedure, router } from "../server/trpc";

export const contextsRouter = router({
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
