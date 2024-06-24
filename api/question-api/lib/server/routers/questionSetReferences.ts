import { getQuestionSetReferenceById, getQuestionSetReferences } from "@/lib/api/questionSetReferences/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  questionSetReferenceIdSchema,
  insertQuestionSetReferenceParams,
  updateQuestionSetReferenceParams,
} from "@/lib/db/schema/questionSetReferences";
import { createQuestionSetReference, deleteQuestionSetReference, updateQuestionSetReference } from "@/lib/api/questionSetReferences/mutations";

export const questionSetReferencesRouter = router({
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
