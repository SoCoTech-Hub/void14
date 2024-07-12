import {
  gradingformGuideCriterionIdSchema,
  insertGradingformGuideCriterionParams,
  updateGradingformGuideCriterionParams,
} from "@soco/grade-db/schema/gradingformGuideCriteria";

import {
  createGradingformGuideCriterion,
  deleteGradingformGuideCriterion,
  updateGradingformGuideCriterion,
} from "../api/gradingformGuideCriteria/mutations";
import {
  getGradingformGuideCriteria,
  getGradingformGuideCriterionById,
} from "../api/gradingformGuideCriteria/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const gradingformGuideCriteriaRouter: ReturnType<
  typeof createTRPCRouter
> = createTRPCRouter({
  getGradingformGuideCriteria: publicProcedure.query(async () => {
    return getGradingformGuideCriteria();
  }),
  getGradingformGuideCriterionById: publicProcedure
    .input(gradingformGuideCriterionIdSchema)
    .query(async ({ input }) => {
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
