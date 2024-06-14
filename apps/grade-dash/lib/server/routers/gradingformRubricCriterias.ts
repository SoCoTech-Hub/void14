import { getGradingformRubricCriteriaById, getGradingformRubricCriterias } from "@/lib/api/gradingformRubricCriterias/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  gradingformRubricCriteriaIdSchema,
  insertGradingformRubricCriteriaParams,
  updateGradingformRubricCriteriaParams,
} from "@/lib/db/schema/gradingformRubricCriterias";
import { createGradingformRubricCriteria, deleteGradingformRubricCriteria, updateGradingformRubricCriteria } from "@/lib/api/gradingformRubricCriterias/mutations";

export const gradingformRubricCriteriasRouter = router({
  getGradingformRubricCriterias: publicProcedure.query(async () => {
    return getGradingformRubricCriterias();
  }),
  getGradingformRubricCriteriaById: publicProcedure.input(gradingformRubricCriteriaIdSchema).query(async ({ input }) => {
    return getGradingformRubricCriteriaById(input.id);
  }),
  createGradingformRubricCriteria: publicProcedure
    .input(insertGradingformRubricCriteriaParams)
    .mutation(async ({ input }) => {
      return createGradingformRubricCriteria(input);
    }),
  updateGradingformRubricCriteria: publicProcedure
    .input(updateGradingformRubricCriteriaParams)
    .mutation(async ({ input }) => {
      return updateGradingformRubricCriteria(input.id, input);
    }),
  deleteGradingformRubricCriteria: publicProcedure
    .input(gradingformRubricCriteriaIdSchema)
    .mutation(async ({ input }) => {
      return deleteGradingformRubricCriteria(input.id);
    }),
});
