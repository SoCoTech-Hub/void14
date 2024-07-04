import {
  createQuestionSetReference,
  deleteQuestionSetReference,
  updateQuestionSetReference,
} from "../api/questionSetReferences/mutations";
import {
  getQuestionSetReferenceById,
  getQuestionSetReferences,
} from "../api/questionSetReferences/queries";
import {
  insertQuestionSetReferenceParams,
  questionSetReferenceIdSchema,
  updateQuestionSetReferenceParams,
} from "../db/schema/questionSetReferences";
import { publicProcedure, router } from "../server/trpc";

export const questionSetReferencesRouter = router({
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
