import { getGradingDefinitionById, getGradingDefinitions } from "@/lib/api/gradingDefinitions/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  gradingDefinitionIdSchema,
  insertGradingDefinitionParams,
  updateGradingDefinitionParams,
} from "@/lib/db/schema/gradingDefinitions";
import { createGradingDefinition, deleteGradingDefinition, updateGradingDefinition } from "@/lib/api/gradingDefinitions/mutations";

export const gradingDefinitionsRouter = router({
  getGradingDefinitions: publicProcedure.query(async () => {
    return getGradingDefinitions();
  }),
  getGradingDefinitionById: publicProcedure.input(gradingDefinitionIdSchema).query(async ({ input }) => {
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
