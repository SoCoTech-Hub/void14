import {
  createBadgeRelated,
  deleteBadgeRelated,
  updateBadgeRelated,
} from "../api/badgeRelateds/mutations";
import {
  getBadgeRelatedById,
  getBadgeRelateds,
} from "../api/badgeRelateds/queries";
import {
  badgeRelatedIdSchema,
  insertBadgeRelatedParams,
  updateBadgeRelatedParams,
} from "../db/schema/badgeRelateds";
import { publicProcedure, router } from "../server/trpc";

export const badgeRelatedsRouter = router({
  getBadgeRelateds: publicProcedure.query(async () => {
    return getBadgeRelateds();
  }),
  getBadgeRelatedById: publicProcedure
    .input(badgeRelatedIdSchema)
    .query(async ({ input }) => {
      return getBadgeRelatedById(input.id);
    }),
  createBadgeRelated: publicProcedure
    .input(insertBadgeRelatedParams)
    .mutation(async ({ input }) => {
      return createBadgeRelated(input);
    }),
  updateBadgeRelated: publicProcedure
    .input(updateBadgeRelatedParams)
    .mutation(async ({ input }) => {
      return updateBadgeRelated(input.id, input);
    }),
  deleteBadgeRelated: publicProcedure
    .input(badgeRelatedIdSchema)
    .mutation(async ({ input }) => {
      return deleteBadgeRelated(input.id);
    }),
});
