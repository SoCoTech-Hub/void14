import {
  createLtiAccessToken,
  deleteLtiAccessToken,
  updateLtiAccessToken,
} from "../api/ltiAccessTokens/mutations";
import {
  getLtiAccessTokenById,
  getLtiAccessTokens,
} from "../api/ltiAccessTokens/queries";
import {
  insertLtiAccessTokenParams,
  ltiAccessTokenIdSchema,
  updateLtiAccessTokenParams,
} from "../db/schema/ltiAccessTokens";
import { publicProcedure, router } from "../server/trpc";

export const ltiAccessTokensRouter = router({
  getLtiAccessTokens: publicProcedure.query(async () => {
    return getLtiAccessTokens();
  }),
  getLtiAccessTokenById: publicProcedure
    .input(ltiAccessTokenIdSchema)
    .query(async ({ input }) => {
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
