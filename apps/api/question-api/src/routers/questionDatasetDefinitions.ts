import {
  insertQuestionDatasetDefinitionParams,
  questionDatasetDefinitionIdSchema,
  updateQuestionDatasetDefinitionParams,
} from "@soco/question-db/schema/questionDatasetDefinitions";

import {
  createQuestionDatasetDefinition,
  deleteQuestionDatasetDefinition,
  updateQuestionDatasetDefinition,
} from "../api/questionDatasetDefinitions/mutations";
import {
  getQuestionDatasetDefinitionById,
  getQuestionDatasetDefinitions,
} from "../api/questionDatasetDefinitions/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const questionDatasetDefinitionsRouter: ReturnType<
  typeof createTRPCRouter
> = createTRPCRouter({
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
