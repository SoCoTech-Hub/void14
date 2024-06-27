import { getQuestionDatasetDefinitionById, getQuestionDatasetDefinitions } from "@/lib/api/questionDatasetDefinitions/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  questionDatasetDefinitionIdSchema,
  insertQuestionDatasetDefinitionParams,
  updateQuestionDatasetDefinitionParams,
} from "@/lib/db/schema/questionDatasetDefinitions";
import { createQuestionDatasetDefinition, deleteQuestionDatasetDefinition, updateQuestionDatasetDefinition } from "@/lib/api/questionDatasetDefinitions/mutations";

export const questionDatasetDefinitionsRouter = router({
  getQuestionDatasetDefinitions: publicProcedure.query(async () => {
    return getQuestionDatasetDefinitions();
  }),
  getQuestionDatasetDefinitionById: publicProcedure.input(questionDatasetDefinitionIdSchema).query(async ({ input }) => {
    return getQuestionDatasetDefinitionById(input.id);
  }),
  createQuestionDatasetDefinition: publicProcedure
    .input(insertQuestionDatasetDefinitionParams)
    .mutation(async ({ input }) => {
      return createQuestionDatasetDefinition(input);
    }),
  updateQuestionDatasetDefinition: publicProcedure
    .input(updateQuestionDatasetDefinitionParams)
    .mutation(async ({ input }) => {
      return updateQuestionDatasetDefinition(input.id, input);
    }),
  deleteQuestionDatasetDefinition: publicProcedure
    .input(questionDatasetDefinitionIdSchema)
    .mutation(async ({ input }) => {
      return deleteQuestionDatasetDefinition(input.id);
    }),
});
