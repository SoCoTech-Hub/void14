import { getGradingformRubricLevelById, getGradingformRubricLevels } from "@/lib/api/gradingformRubricLevels/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  gradingformRubricLevelIdSchema,
  insertGradingformRubricLevelParams,
  updateGradingformRubricLevelParams,
} from "@/lib/db/schema/gradingformRubricLevels";
import { createGradingformRubricLevel, deleteGradingformRubricLevel, updateGradingformRubricLevel } from "@/lib/api/gradingformRubricLevels/mutations";

export const gradingformRubricLevelsRouter = router({
  getGradingformRubricLevels: publicProcedure.query(async () => {
    return getGradingformRubricLevels();
  }),
  getGradingformRubricLevelById: publicProcedure.input(gradingformRubricLevelIdSchema).query(async ({ input }) => {
    return getGradingformRubricLevelById(input.id);
  }),
  createGradingformRubricLevel: publicProcedure
    .input(insertGradingformRubricLevelParams)
    .mutation(async ({ input }) => {
      return createGradingformRubricLevel(input);
    }),
  updateGradingformRubricLevel: publicProcedure
    .input(updateGradingformRubricLevelParams)
    .mutation(async ({ input }) => {
      return updateGradingformRubricLevel(input.id, input);
    }),
  deleteGradingformRubricLevel: publicProcedure
    .input(gradingformRubricLevelIdSchema)
    .mutation(async ({ input }) => {
      return deleteGradingformRubricLevel(input.id);
    }),
});
