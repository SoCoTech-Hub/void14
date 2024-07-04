import {
  createBadgeBackpackOauth2,
  deleteBadgeBackpackOauth2,
  updateBadgeBackpackOauth2,
} from "../api/badgeBackpackOauth2s/mutations";
import {
  getBadgeBackpackOauth2ById,
  getBadgeBackpackOauth2s,
} from "../api/badgeBackpackOauth2s/queries";
import {
  badgeBackpackOauth2IdSchema,
  insertBadgeBackpackOauth2Params,
  updateBadgeBackpackOauth2Params,
} from "../db/schema/badgeBackpackOauth2s";
import { publicProcedure, router } from "../server/trpc";

export const badgeBackpackOauth2sRouter = router({
  getBadgeBackpackOauth2s: publicProcedure.query(async () => {
    return getBadgeBackpackOauth2s();
  }),
  getBadgeBackpackOauth2ById: publicProcedure
    .input(badgeBackpackOauth2IdSchema)
    .query(async ({ input }) => {
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
