import { getGradingformGuideCriterionById, getGradingformGuideCriteria } from "@/lib/api/gradingformGuideCriteria/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  gradingformGuideCriterionIdSchema,
  insertGradingformGuideCriterionParams,
  updateGradingformGuideCriterionParams,
} from "@/lib/db/schema/gradingformGuideCriteria";
import { createGradingformGuideCriterion, deleteGradingformGuideCriterion, updateGradingformGuideCriterion } from "@/lib/api/gradingformGuideCriteria/mutations";

export const gradingformGuideCriteriaRouter = router({
  getGradingformGuideCriteria: publicProcedure.query(async () => {
    return getGradingformGuideCriteria();
  }),
  getGradingformGuideCriterionById: publicProcedure.input(gradingformGuideCriterionIdSchema).query(async ({ input }) => {
    return getGradingformGuideCriterionById(input.id);
  }),
  createGradingformGuideCriterion: publicProcedure
    .input(insertGradingformGuideCriterionParams)
    .mutation(async ({ input }) => {
      return createGradingformGuideCriterion(input);
    }),
  updateGradingformGuideCriterion: publicProcedure
    .input(updateGradingformGuideCriterionParams)
    .mutation(async ({ input }) => {
      return updateGradingformGuideCriterion(input.id, input);
    }),
  deleteGradingformGuideCriterion: publicProcedure
    .input(gradingformGuideCriterionIdSchema)
    .mutation(async ({ input }) => {
      return deleteGradingformGuideCriterion(input.id);
    }),
});
