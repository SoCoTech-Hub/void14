import {
  createQuestionDatasetDefinition,
  deleteQuestionDatasetDefinition,
  updateQuestionDatasetDefinition,
} from "../api/questionDatasetDefinitions/mutations";
import {
  getQuestionDatasetDefinitionById,
  getQuestionDatasetDefinitions,
} from "../api/questionDatasetDefinitions/queries";
import {
  insertQuestionDatasetDefinitionParams,
  questionDatasetDefinitionIdSchema,
  updateQuestionDatasetDefinitionParams,
} from "../db/schema/questionDatasetDefinitions";
import { publicProcedure, router } from "../server/trpc";

export const questionDatasetDefinitionsRouter = router({
  getQuestionDatasetDefinitions: publicProcedure.query(async () => {
    return getQuestionDatasetDefinitions();
  }),
  getQuestionDatasetDefinitionById: publicProcedure
    .input(questionDatasetDefinitionIdSchema)
    .query(async ({ input }) => {
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
