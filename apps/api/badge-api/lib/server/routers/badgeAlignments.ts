import { getBadgeAlignmentById, getBadgeAlignments } from "@/lib/api/badgeAlignments/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  badgeAlignmentIdSchema,
  insertBadgeAlignmentParams,
  updateBadgeAlignmentParams,
} from "@/lib/db/schema/badgeAlignments";
import { createBadgeAlignment, deleteBadgeAlignment, updateBadgeAlignment } from "@/lib/api/badgeAlignments/mutations";

export const badgeAlignmentsRouter = router({
  getBadgeAlignments: publicProcedure.query(async () => {
    return getBadgeAlignments();
  }),
  getBadgeAlignmentById: publicProcedure.input(badgeAlignmentIdSchema).query(async ({ input }) => {
    return getBadgeAlignmentById(input.id);
  }),
  createBadgeAlignment: publicProcedure
    .input(insertBadgeAlignmentParams)
    .mutation(async ({ input }) => {
      return createBadgeAlignment(input);
    }),
  updateBadgeAlignment: publicProcedure
    .input(updateBadgeAlignmentParams)
    .mutation(async ({ input }) => {
      return updateBadgeAlignment(input.id, input);
    }),
  deleteBadgeAlignment: publicProcedure
    .input(badgeAlignmentIdSchema)
    .mutation(async ({ input }) => {
      return deleteBadgeAlignment(input.id);
    }),
});
