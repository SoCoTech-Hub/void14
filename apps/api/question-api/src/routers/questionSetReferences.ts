import {
  insertQuestionSetReferenceParams,
  questionSetReferenceIdSchema,
  updateQuestionSetReferenceParams,
} from "@soco/question-db/schema/questionSetReferences";

import {
  createQuestionSetReference,
  deleteQuestionSetReference,
  updateQuestionSetReference,
} from "../api/questionSetReferences/mutations";
import {
  getQuestionSetReferenceById,
  getQuestionSetReferences,
} from "../api/questionSetReferences/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const questionSetReferencesRouter: ReturnType<typeof createTRPCRouter> =
  createTRPCRouter({
    getQuestionSetReferences: publicProcedure.query(async () => {
      return getQuestionSetReferences();
    }),
    getQuestionSetReferenceById: publicProcedure
      .input(questionSetReferenceIdSchema)
      .query(async ({ input }) => {
        return getQuestionSetReferenceById(input.id);
      }),
    createQuestionSetReference: publicProcedure
      .input(insertQuestionSetReferenceParams)
      .mutation(async ({ input }) => {
        return createQuestionSetReference(input);
      }),
    updateQuestionSetReference: publicProcedure
      .input(updateQuestionSetReferenceParams)
      .mutation(async ({ input }) => {
        return updateQuestionSetReference(input.id, input);
      }),
    deleteQuestionSetReference: publicProcedure
      .input(questionSetReferenceIdSchema)
      .mutation(async ({ input }) => {
        return deleteQuestionSetReference(input.id);
      }),
  });
