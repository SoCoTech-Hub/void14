import {
  gradingDefinitionIdSchema,
  insertGradingDefinitionParams,
  updateGradingDefinitionParams,
} from "@soco/grade-db/schema/gradingDefinitions";

import {
  createGradingDefinition,
  deleteGradingDefinition,
  updateGradingDefinition,
} from "../api/gradingDefinitions/mutations";
import {
  getGradingDefinitionById,
  getGradingDefinitions,
} from "../api/gradingDefinitions/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const gradingDefinitionsRouter: ReturnType<typeof createTRPCRouter> =
  createTRPCRouter({
    getGradingDefinitions: publicProcedure.query(async () => {
      return getGradingDefinitions();
    }),
    getGradingDefinitionById: publicProcedure
      .input(gradingDefinitionIdSchema)
      .query(async ({ input }) => {
        return getGradingDefinitionById(input.id);
      }),
    createGradingDefinition: publicProcedure
      .input(insertGradingDefinitionParams)
      .mutation(async ({ input }) => {
        return createGradingDefinition(input);
      }),
    updateGradingDefinition: publicProcedure
      .input(updateGradingDefinitionParams)
      .mutation(async ({ input }) => {
        return updateGradingDefinition(input.id, input);
      }),
    deleteGradingDefinition: publicProcedure
      .input(gradingDefinitionIdSchema)
      .mutation(async ({ input }) => {
        return deleteGradingDefinition(input.id);
      }),
  });
