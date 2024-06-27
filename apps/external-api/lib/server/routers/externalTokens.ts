import { getExternalTokenById, getExternalTokens } from "@/lib/api/externalTokens/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  externalTokenIdSchema,
  insertExternalTokenParams,
  updateExternalTokenParams,
} from "@/lib/db/schema/externalTokens";
import { createExternalToken, deleteExternalToken, updateExternalToken } from "@/lib/api/externalTokens/mutations";

export const externalTokensRouter = router({
  getExternalTokens: publicProcedure.query(async () => {
    return getExternalTokens();
  }),
  getExternalTokenById: publicProcedure.input(externalTokenIdSchema).query(async ({ input }) => {
    return getExternalTokenById(input.id);
  }),
  createExternalToken: publicProcedure
    .input(insertExternalTokenParams)
    .mutation(async ({ input }) => {
      return createExternalToken(input);
    }),
  updateExternalToken: publicProcedure
    .input(updateExternalTokenParams)
    .mutation(async ({ input }) => {
      return updateExternalToken(input.id, input);
    }),
  deleteExternalToken: publicProcedure
    .input(externalTokenIdSchema)
    .mutation(async ({ input }) => {
      return deleteExternalToken(input.id);
    }),
});
