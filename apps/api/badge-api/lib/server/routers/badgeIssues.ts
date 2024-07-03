import { getBadgeIssueById, getBadgeIssues } from "@/lib/api/badgeIssues/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  badgeIssueIdSchema,
  insertBadgeIssueParams,
  updateBadgeIssueParams,
} from "@/lib/db/schema/badgeIssues";
import { createBadgeIssue, deleteBadgeIssue, updateBadgeIssue } from "@/lib/api/badgeIssues/mutations";

export const badgeIssuesRouter = router({
  getBadgeIssues: publicProcedure.query(async () => {
    return getBadgeIssues();
  }),
  getBadgeIssueById: publicProcedure.input(badgeIssueIdSchema).query(async ({ input }) => {
    return getBadgeIssueById(input.id);
  }),
  createBadgeIssue: publicProcedure
    .input(insertBadgeIssueParams)
    .mutation(async ({ input }) => {
      return createBadgeIssue(input);
    }),
  updateBadgeIssue: publicProcedure
    .input(updateBadgeIssueParams)
    .mutation(async ({ input }) => {
      return updateBadgeIssue(input.id, input);
    }),
  deleteBadgeIssue: publicProcedure
    .input(badgeIssueIdSchema)
    .mutation(async ({ input }) => {
      return deleteBadgeIssue(input.id);
    }),
});
