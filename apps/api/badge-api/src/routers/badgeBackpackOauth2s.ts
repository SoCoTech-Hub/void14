import { getBadgeBackpackOauth2ById, getBadgeBackpackOauth2s } from "../api/badgeBackpackOauth2s/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  badgeBackpackOauth2IdSchema,
  insertBadgeBackpackOauth2Params,
  updateBadgeBackpackOauth2Params,
} from "@soco/badge-db/schema/badgeBackpackOauth2s";
import { createBadgeBackpackOauth2, deleteBadgeBackpackOauth2, updateBadgeBackpackOauth2 } from "../api/badgeBackpackOauth2s/mutations";

export const badgeBackpackOauth2sRouter =createTRPCRouter({
  getBadgeBackpackOauth2s: publicProcedure.query(async () => {
    return getBadgeBackpackOauth2s();
  }),
  getBadgeBackpackOauth2ById: publicProcedure.input(badgeBackpackOauth2IdSchema).query(async ({ input }) => {
    return getBadgeBackpackOauth2ById(input.id);
  }),
  createBadgeBackpackOauth2: publicProcedure
    .input(insertBadgeBackpackOauth2Params)
    .mutation(async ({ input }) => {
      return createBadgeBackpackOauth2(input);
    }),
  updateBadgeBackpackOauth2: publicProcedure
    .input(updateBadgeBackpackOauth2Params)
    .mutation(async ({ input }) => {
      return updateBadgeBackpackOauth2(input.id, input);
    }),
  deleteBadgeBackpackOauth2: publicProcedure
    .input(badgeBackpackOauth2IdSchema)
    .mutation(async ({ input }) => {
      return deleteBadgeBackpackOauth2(input.id);
    }),
});
