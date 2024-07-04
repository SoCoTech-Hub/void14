import {
  createGradingformRubricFilling,
  deleteGradingformRubricFilling,
  updateGradingformRubricFilling,
} from "../api/gradingformRubricFillings/mutations";
import {
  getGradingformRubricFillingById,
  getGradingformRubricFillings,
} from "../api/gradingformRubricFillings/queries";
import {
  gradingformRubricFillingIdSchema,
  insertGradingformRubricFillingParams,
  updateGradingformRubricFillingParams,
} from "../db/schema/gradingformRubricFillings";
import { publicProcedure, router } from "../server/trpc";

export const gradingformRubricFillingsRouter = router({
  getGradingformRubricFillings: publicProcedure.query(async () => {
    return getGradingformRubricFillings();
  }),
  getGradingformRubricFillingById: publicProcedure
    .input(gradingformRubricFillingIdSchema)
    .query(async ({ input }) => {
      return getGradingformRubricFillingById(input.id);
    }),
  createGradingformRubricFilling: publicProcedure
    .input(insertGradingformRubricFillingParams)
    .mutation(async ({ input }) => {
      return createGradingformRubricFilling(input);
    }),
  updateGradingformRubricFilling: publicProcedure
    .input(updateGradingformRubricFillingParams)
    .mutation(async ({ input }) => {
      return updateGradingformRubricFilling(input.id, input);
    }),
  deleteGradingformRubricFilling: publicProcedure
    .input(gradingformRubricFillingIdSchema)
    .mutation(async ({ input }) => {
      return deleteGradingformRubricFilling(input.id);
    }),
});
