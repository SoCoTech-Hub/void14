import {
  createBadgeCriteriaMet,
  deleteBadgeCriteriaMet,
  updateBadgeCriteriaMet,
} from "../api/badgeCriteriaMets/mutations";
import {
  getBadgeCriteriaMetById,
  getBadgeCriteriaMets,
} from "../api/badgeCriteriaMets/queries";
import {
  badgeCriteriaMetIdSchema,
  insertBadgeCriteriaMetParams,
  updateBadgeCriteriaMetParams,
} from "../db/schema/badgeCriteriaMets";
import { publicProcedure, router } from "../server/trpc";

export const badgeCriteriaMetsRouter = router({
  getBadgeCriteriaMets: publicProcedure.query(async () => {
    return getBadgeCriteriaMets();
  }),
  getBadgeCriteriaMetById: publicProcedure
    .input(badgeCriteriaMetIdSchema)
    .query(async ({ input }) => {
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
