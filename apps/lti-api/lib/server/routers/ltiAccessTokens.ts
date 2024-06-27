import { getLtiAccessTokenById, getLtiAccessTokens } from "@/lib/api/ltiAccessTokens/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  ltiAccessTokenIdSchema,
  insertLtiAccessTokenParams,
  updateLtiAccessTokenParams,
} from "@/lib/db/schema/ltiAccessTokens";
import { createLtiAccessToken, deleteLtiAccessToken, updateLtiAccessToken } from "@/lib/api/ltiAccessTokens/mutations";

export const ltiAccessTokensRouter = router({
  getLtiAccessTokens: publicProcedure.query(async () => {
    return getLtiAccessTokens();
  }),
  getLtiAccessTokenById: publicProcedure.input(ltiAccessTokenIdSchema).query(async ({ input }) => {
    return getLtiAccessTokenById(input.id);
  }),
  createLtiAccessToken: publicProcedure
    .input(insertLtiAccessTokenParams)
    .mutation(async ({ input }) => {
      return createLtiAccessToken(input);
    }),
  updateLtiAccessToken: publicProcedure
    .input(updateLtiAccessTokenParams)
    .mutation(async ({ input }) => {
      return updateLtiAccessToken(input.id, input);
    }),
  deleteLtiAccessToken: publicProcedure
    .input(ltiAccessTokenIdSchema)
    .mutation(async ({ input }) => {
      return deleteLtiAccessToken(input.id);
    }),
});
