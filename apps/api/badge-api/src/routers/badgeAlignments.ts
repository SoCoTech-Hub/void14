import { getBadgeAlignmentById, getBadgeAlignments } from "../api/badgeAlignments/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  badgeAlignmentIdSchema,
  insertBadgeAlignmentParams,
  updateBadgeAlignmentParams,
} from "@soco/badge-db/schema/badgeAlignments";
import { createBadgeAlignment, deleteBadgeAlignment, updateBadgeAlignment } from "../api/badgeAlignments/mutations";

export const badgeAlignmentsRouter =createTRPCRouter({
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
