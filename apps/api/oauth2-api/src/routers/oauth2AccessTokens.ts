import { getOauth2AccessTokenById, getOauth2AccessTokens } from "../api/oauth2AccessTokens/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  oauth2AccessTokenIdSchema,
  insertOauth2AccessTokenParams,
  updateOauth2AccessTokenParams,
} from "@soco/oauth2-db/schema/oauth2AccessTokens";
import { createOauth2AccessToken, deleteOauth2AccessToken, updateOauth2AccessToken } from "../api/oauth2AccessTokens/mutations";

export const oauth2AccessTokensRouter =createTRPCRouter({
  getOauth2AccessTokens: publicProcedure.query(async () => {
    return getOauth2AccessTokens();
  }),
  getOauth2AccessTokenById: publicProcedure.input(oauth2AccessTokenIdSchema).query(async ({ input }) => {
    return getOauth2AccessTokenById(input.id);
  }),
  createOauth2AccessToken: publicProcedure
    .input(insertOauth2AccessTokenParams)
    .mutation(async ({ input }) => {
      return createOauth2AccessToken(input);
    }),
  updateOauth2AccessToken: publicProcedure
    .input(updateOauth2AccessTokenParams)
    .mutation(async ({ input }) => {
      return updateOauth2AccessToken(input.id, input);
    }),
  deleteOauth2AccessToken: publicProcedure
    .input(oauth2AccessTokenIdSchema)
    .mutation(async ({ input }) => {
      return deleteOauth2AccessToken(input.id);
    }),
});
