import { createBadge, deleteBadge, updateBadge } from "../api/badges/mutations";
import { getBadgeById, getBadges } from "../api/badges/queries";
import {
  badgeIdSchema,
  insertBadgeParams,
  updateBadgeParams,
} from "../db/schema/badges";
import { publicProcedure, router } from "../server/trpc";

export const badgesRouter = router({
  getBadges: publicProcedure.query(async () => {
    return getBadges();
  }),
  getBadgeById: publicProcedure
    .input(badgeIdSchema)
    .query(async ({ input }) => {
      return getBadgeById(input.id);
    }),
  createBadge: publicProcedure
    .input(insertBadgeParams)
    .mutation(async ({ input }) => {
      return createBadge(input);
    }),
  updateBadge: publicProcedure
    .input(updateBadgeParams)
    .mutation(async ({ input }) => {
      return updateBadge(input.id, input);
    }),
  deleteBadge: publicProcedure
    .input(badgeIdSchema)
    .mutation(async ({ input }) => {
      return deleteBadge(input.id);
    }),
});
