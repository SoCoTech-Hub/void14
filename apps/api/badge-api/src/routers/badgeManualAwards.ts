import {
  badgeManualAwardIdSchema,
  insertBadgeManualAwardParams,
  updateBadgeManualAwardParams,
} from "@soco/badge-db/schema/badgeManualAwards";

import {
  createBadgeManualAward,
  deleteBadgeManualAward,
  updateBadgeManualAward,
} from "../api/badgeManualAwards/mutations";
import {
  getBadgeManualAwardById,
  getBadgeManualAwards,
} from "../api/badgeManualAwards/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const badgeManualAwardsRouter: ReturnType<typeof createTRPCRouter> =
  createTRPCRouter({
    getBadgeManualAwards: publicProcedure.query(async () => {
      return getBadgeManualAwards();
    }),
    getBadgeManualAwardById: publicProcedure
      .input(badgeManualAwardIdSchema)
      .query(async ({ input }) => {
        return getBadgeManualAwardById(input.id);
      }),
    createBadgeManualAward: publicProcedure
      .input(insertBadgeManualAwardParams)
      .mutation(async ({ input }) => {
        return createBadgeManualAward(input);
      }),
    updateBadgeManualAward: publicProcedure
      .input(updateBadgeManualAwardParams)
      .mutation(async ({ input }) => {
        return updateBadgeManualAward(input.id, input);
      }),
    deleteBadgeManualAward: publicProcedure
      .input(badgeManualAwardIdSchema)
      .mutation(async ({ input }) => {
        return deleteBadgeManualAward(input.id);
      }),
  });
