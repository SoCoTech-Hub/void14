import {
  badgeIssueIdSchema,
  insertBadgeIssueParams,
  updateBadgeIssueParams,
} from "@soco/badge-db/schema/badgeIssues";

import {
  createBadgeIssue,
  deleteBadgeIssue,
  updateBadgeIssue,
} from "../api/badgeIssues/mutations";
import { getBadgeIssueById, getBadgeIssues } from "../api/badgeIssues/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const badgeIssuesRouter = createTRPCRouter({
  getBadgeIssues: publicProcedure.query(async () => {
    return getBadgeIssues();
  }),
  getBadgeIssueById: publicProcedure
    .input(badgeIssueIdSchema)
    .query(async ({ input }) => {
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
