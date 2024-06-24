import { getGradingformRubricFillingById, getGradingformRubricFillings } from "@/lib/api/gradingformRubricFillings/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  gradingformRubricFillingIdSchema,
  insertGradingformRubricFillingParams,
  updateGradingformRubricFillingParams,
} from "@/lib/db/schema/gradingformRubricFillings";
import { createGradingformRubricFilling, deleteGradingformRubricFilling, updateGradingformRubricFilling } from "@/lib/api/gradingformRubricFillings/mutations";

export const gradingformRubricFillingsRouter = router({
  getGradingformRubricFillings: publicProcedure.query(async () => {
    return getGradingformRubricFillings();
  }),
  getGradingformRubricFillingById: publicProcedure.input(gradingformRubricFillingIdSchema).query(async ({ input }) => {
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
