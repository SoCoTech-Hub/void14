import {
  gradingformRubricLevelIdSchema,
  insertGradingformRubricLevelParams,
  updateGradingformRubricLevelParams,
} from "@soco/grade-db/schema/gradingformRubricLevels";

import {
  createGradingformRubricLevel,
  deleteGradingformRubricLevel,
  updateGradingformRubricLevel,
} from "../api/gradingformRubricLevels/mutations";
import {
  getGradingformRubricLevelById,
  getGradingformRubricLevels,
} from "../api/gradingformRubricLevels/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const gradingformRubricLevelsRouter = createTRPCRouter({
  getGradingformRubricLevels: publicProcedure.query(async () => {
    return getGradingformRubricLevels();
  }),
  getGradingformRubricLevelById: publicProcedure
    .input(gradingformRubricLevelIdSchema)
    .query(async ({ input }) => {
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
