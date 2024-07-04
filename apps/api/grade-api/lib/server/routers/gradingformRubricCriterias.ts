import {
  createGradingformRubricCriteria,
  deleteGradingformRubricCriteria,
  updateGradingformRubricCriteria,
} from "../api/gradingformRubricCriterias/mutations";
import {
  getGradingformRubricCriteriaById,
  getGradingformRubricCriterias,
} from "../api/gradingformRubricCriterias/queries";
import {
  gradingformRubricCriteriaIdSchema,
  insertGradingformRubricCriteriaParams,
  updateGradingformRubricCriteriaParams,
} from "../db/schema/gradingformRubricCriterias";
import { publicProcedure, router } from "../server/trpc";

export const gradingformRubricCriteriasRouter = router({
  getGradingformRubricCriterias: publicProcedure.query(async () => {
    return getGradingformRubricCriterias();
  }),
  getGradingformRubricCriteriaById: publicProcedure
    .input(gradingformRubricCriteriaIdSchema)
    .query(async ({ input }) => {
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
