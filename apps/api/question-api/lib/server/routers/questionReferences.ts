import {
  createQuestionReference,
  deleteQuestionReference,
  updateQuestionReference,
} from "../api/questionReferences/mutations";
import {
  getQuestionReferenceById,
  getQuestionReferences,
} from "../api/questionReferences/queries";
import {
  insertQuestionReferenceParams,
  questionReferenceIdSchema,
  updateQuestionReferenceParams,
} from "../db/schema/questionReferences";
import { publicProcedure, router } from "../server/trpc";

export const questionReferencesRouter = router({
  getQuestionReferences: publicProcedure.query(async () => {
    return getQuestionReferences();
  }),
  getQuestionReferenceById: publicProcedure
    .input(questionReferenceIdSchema)
    .query(async ({ input }) => {
      return getQuestionReferenceById(input.id);
    }),
  createQuestionReference: publicProcedure
    .input(insertQuestionReferenceParams)
    .mutation(async ({ input }) => {
      return createQuestionReference(input);
    }),
  updateQuestionReference: publicProcedure
    .input(updateQuestionReferenceParams)
    .mutation(async ({ input }) => {
      return updateQuestionReference(input.id, input);
    }),
  deleteQuestionReference: publicProcedure
    .input(questionReferenceIdSchema)
    .mutation(async ({ input }) => {
      return deleteQuestionReference(input.id);
    }),
});