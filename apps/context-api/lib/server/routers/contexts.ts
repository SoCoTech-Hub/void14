import { getContextById, getContexts } from "@/lib/api/contexts/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  contextIdSchema,
  insertContextParams,
  updateContextParams,
} from "@/lib/db/schema/contexts";
import { createContext, deleteContext, updateContext } from "@/lib/api/contexts/mutations";

export const contextsRouter = router({
  getContexts: publicProcedure.query(async () => {
    return getContexts();
  }),
  getContextById: publicProcedure.input(contextIdSchema).query(async ({ input }) => {
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
