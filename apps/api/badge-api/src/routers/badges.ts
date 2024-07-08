import { getBadgeById, getBadges } from "../api/badges/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  badgeIdSchema,
  insertBadgeParams,
  updateBadgeParams,
} from "@soco/badge-db/schema/badges";
import { createBadge, deleteBadge, updateBadge } from "../api/badges/mutations";

export const badgesRouter =createTRPCRouter({
  getBadges: publicProcedure.query(async () => {
    return getBadges();
  }),
  getBadgeById: publicProcedure.input(badgeIdSchema).query(async ({ input }) => {
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
