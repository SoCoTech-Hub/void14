import { getBadgeManualAwardById, getBadgeManualAwards } from "@/lib/api/badgeManualAwards/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  badgeManualAwardIdSchema,
  insertBadgeManualAwardParams,
  updateBadgeManualAwardParams,
} from "@/lib/db/schema/badgeManualAwards";
import { createBadgeManualAward, deleteBadgeManualAward, updateBadgeManualAward } from "@/lib/api/badgeManualAwards/mutations";

export const badgeManualAwardsRouter = router({
  getBadgeManualAwards: publicProcedure.query(async () => {
    return getBadgeManualAwards();
  }),
  getBadgeManualAwardById: publicProcedure.input(badgeManualAwardIdSchema).query(async ({ input }) => {
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
