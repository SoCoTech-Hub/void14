import {
  insertOauth2RefreshTokenParams,
  oauth2RefreshTokenIdSchema,
  updateOauth2RefreshTokenParams,
} from "@soco/oauth2-db/schema/oauth2RefreshTokens";

import {
  createOauth2RefreshToken,
  deleteOauth2RefreshToken,
  updateOauth2RefreshToken,
} from "../api/oauth2RefreshTokens/mutations";
import {
  getOauth2RefreshTokenById,
  getOauth2RefreshTokens,
} from "../api/oauth2RefreshTokens/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const oauth2RefreshTokensRouter: ReturnType<typeof createTRPCRouter> =
  createTRPCRouter({
    getOauth2RefreshTokens: publicProcedure.query(async () => {
      return getOauth2RefreshTokens();
    }),
    getOauth2RefreshTokenById: publicProcedure
      .input(oauth2RefreshTokenIdSchema)
      .query(async ({ input }) => {
        return getOauth2RefreshTokenById(input.id);
      }),
    createOauth2RefreshToken: publicProcedure
      .input(insertOauth2RefreshTokenParams)
      .mutation(async ({ input }) => {
        return createOauth2RefreshToken(input);
      }),
    updateOauth2RefreshToken: publicProcedure
      .input(updateOauth2RefreshTokenParams)
      .mutation(async ({ input }) => {
        return updateOauth2RefreshToken(input.id, input);
      }),
    deleteOauth2RefreshToken: publicProcedure
      .input(oauth2RefreshTokenIdSchema)
      .mutation(async ({ input }) => {
        return deleteOauth2RefreshToken(input.id);
      }),
  });
