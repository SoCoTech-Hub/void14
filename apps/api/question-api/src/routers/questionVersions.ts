import {
  insertQuestionVersionParams,
  questionVersionIdSchema,
  updateQuestionVersionParams,
} from "@soco/question-db/schema/questionVersions";

import {
  createQuestionVersion,
  deleteQuestionVersion,
  updateQuestionVersion,
} from "../api/questionVersions/mutations";
import {
  getQuestionVersionById,
  getQuestionVersions,
} from "../api/questionVersions/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const questionVersionsRouter: ReturnType<typeof createTRPCRouter> =
  createTRPCRouter({
    getQuestionVersions: publicProcedure.query(async () => {
      return getQuestionVersions();
    }),
    getQuestionVersionById: publicProcedure
      .input(questionVersionIdSchema)
      .query(async ({ input }) => {
        return getQuestionVersionById(input.id);
      }),
    createQuestionVersion: publicProcedure
      .input(insertQuestionVersionParams)
      .mutation(async ({ input }) => {
        return createQuestionVersion(input);
      }),
    updateQuestionVersion: publicProcedure
      .input(updateQuestionVersionParams)
      .mutation(async ({ input }) => {
        return updateQuestionVersion(input.id, input);
      }),
    deleteQuestionVersion: publicProcedure
      .input(questionVersionIdSchema)
      .mutation(async ({ input }) => {
        return deleteQuestionVersion(input.id);
      }),
  });
