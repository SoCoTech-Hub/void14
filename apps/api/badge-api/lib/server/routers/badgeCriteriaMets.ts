import { getBadgeCriteriaMetById, getBadgeCriteriaMets } from "@/lib/api/badgeCriteriaMets/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  badgeCriteriaMetIdSchema,
  insertBadgeCriteriaMetParams,
  updateBadgeCriteriaMetParams,
} from "@/lib/db/schema/badgeCriteriaMets";
import { createBadgeCriteriaMet, deleteBadgeCriteriaMet, updateBadgeCriteriaMet } from "@/lib/api/badgeCriteriaMets/mutations";

export const badgeCriteriaMetsRouter = router({
  getBadgeCriteriaMets: publicProcedure.query(async () => {
    return getBadgeCriteriaMets();
  }),
  getBadgeCriteriaMetById: publicProcedure.input(badgeCriteriaMetIdSchema).query(async ({ input }) => {
    return getBadgeCriteriaMetById(input.id);
  }),
  createBadgeCriteriaMet: publicProcedure
    .input(insertBadgeCriteriaMetParams)
    .mutation(async ({ input }) => {
      return createBadgeCriteriaMet(input);
    }),
  updateBadgeCriteriaMet: publicProcedure
    .input(updateBadgeCriteriaMetParams)
    .mutation(async ({ input }) => {
      return updateBadgeCriteriaMet(input.id, input);
    }),
  deleteBadgeCriteriaMet: publicProcedure
    .input(badgeCriteriaMetIdSchema)
    .mutation(async ({ input }) => {
      return deleteBadgeCriteriaMet(input.id);
    }),
});
