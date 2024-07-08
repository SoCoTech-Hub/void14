import { getQuestionSetReferenceById, getQuestionSetReferences } from "../api/questionSetReferences/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  questionSetReferenceIdSchema,
  insertQuestionSetReferenceParams,
  updateQuestionSetReferenceParams,
} from "@soco/question-db/schema/questionSetReferences";
import { createQuestionSetReference, deleteQuestionSetReference, updateQuestionSetReference } from "../api/questionSetReferences/mutations";

export const questionSetReferencesRouter =createTRPCRouter({
  getQuestionSetReferences: publicProcedure.query(async () => {
    return getQuestionSetReferences();
  }),
  getQuestionSetReferenceById: publicProcedure.input(questionSetReferenceIdSchema).query(async ({ input }) => {
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
