import { getBadgeRelatedById, getBadgeRelateds } from "@/lib/api/badgeRelateds/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  badgeRelatedIdSchema,
  insertBadgeRelatedParams,
  updateBadgeRelatedParams,
} from "@/lib/db/schema/badgeRelateds";
import { createBadgeRelated, deleteBadgeRelated, updateBadgeRelated } from "@/lib/api/badgeRelateds/mutations";

export const badgeRelatedsRouter = router({
  getBadgeRelateds: publicProcedure.query(async () => {
    return getBadgeRelateds();
  }),
  getBadgeRelatedById: publicProcedure.input(badgeRelatedIdSchema).query(async ({ input }) => {
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
