import {
  insertLtiAccessTokenParams,
  ltiAccessTokenIdSchema,
  updateLtiAccessTokenParams,
} from "@soco/lti-db/schema/ltiAccessTokens";

import {
  createLtiAccessToken,
  deleteLtiAccessToken,
  updateLtiAccessToken,
} from "../api/ltiAccessTokens/mutations";
import {
  getLtiAccessTokenById,
  getLtiAccessTokens,
} from "../api/ltiAccessTokens/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const ltiAccessTokensRouter: ReturnType<typeof createTRPCRouter> =
  createTRPCRouter({
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
