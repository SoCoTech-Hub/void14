import { getQuestionReferenceById, getQuestionReferences } from "@/lib/api/questionReferences/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  questionReferenceIdSchema,
  insertQuestionReferenceParams,
  updateQuestionReferenceParams,
} from "@/lib/db/schema/questionReferences";
import { createQuestionReference, deleteQuestionReference, updateQuestionReference } from "@/lib/api/questionReferences/mutations";

export const questionReferencesRouter = router({
  getQuestionReferences: publicProcedure.query(async () => {
    return getQuestionReferences();
  }),
  getQuestionReferenceById: publicProcedure.input(questionReferenceIdSchema).query(async ({ input }) => {
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
