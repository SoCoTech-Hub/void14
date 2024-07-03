import { getBadgeCriteriaById, getBadgeCriterias } from "@/lib/api/badgeCriterias/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  badgeCriteriaIdSchema,
  insertBadgeCriteriaParams,
  updateBadgeCriteriaParams,
} from "@/lib/db/schema/badgeCriterias";
import { createBadgeCriteria, deleteBadgeCriteria, updateBadgeCriteria } from "@/lib/api/badgeCriterias/mutations";

export const badgeCriteriasRouter = router({
  getBadgeCriterias: publicProcedure.query(async () => {
    return getBadgeCriterias();
  }),
  getBadgeCriteriaById: publicProcedure.input(badgeCriteriaIdSchema).query(async ({ input }) => {
    return getBadgeCriteriaById(input.id);
  }),
  createBadgeCriteria: publicProcedure
    .input(insertBadgeCriteriaParams)
    .mutation(async ({ input }) => {
      return createBadgeCriteria(input);
    }),
  updateBadgeCriteria: publicProcedure
    .input(updateBadgeCriteriaParams)
    .mutation(async ({ input }) => {
      return updateBadgeCriteria(input.id, input);
    }),
  deleteBadgeCriteria: publicProcedure
    .input(badgeCriteriaIdSchema)
    .mutation(async ({ input }) => {
      return deleteBadgeCriteria(input.id);
    }),
});
