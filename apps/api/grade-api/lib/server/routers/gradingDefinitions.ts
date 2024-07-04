import {
  createGradingDefinition,
  deleteGradingDefinition,
  updateGradingDefinition,
} from "../api/gradingDefinitions/mutations";
import {
  getGradingDefinitionById,
  getGradingDefinitions,
} from "../api/gradingDefinitions/queries";
import {
  gradingDefinitionIdSchema,
  insertGradingDefinitionParams,
  updateGradingDefinitionParams,
} from "../db/schema/gradingDefinitions";
import { publicProcedure, router } from "../server/trpc";

export const gradingDefinitionsRouter = router({
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
