import { getQuestionCalculatedById, getQuestionCalculateds } from "@/lib/api/questionCalculateds/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  questionCalculatedIdSchema,
  insertQuestionCalculatedParams,
  updateQuestionCalculatedParams,
} from "@/lib/db/schema/questionCalculateds";
import { createQuestionCalculated, deleteQuestionCalculated, updateQuestionCalculated } from "@/lib/api/questionCalculateds/mutations";

export const questionCalculatedsRouter = router({
  getQuestionCalculateds: publicProcedure.query(async () => {
    return getQuestionCalculateds();
  }),
  getQuestionCalculatedById: publicProcedure.input(questionCalculatedIdSchema).query(async ({ input }) => {
    return getQuestionCalculatedById(input.id);
  }),
  createQuestionCalculated: publicProcedure
    .input(insertQuestionCalculatedParams)
    .mutation(async ({ input }) => {
      return createQuestionCalculated(input);
    }),
  updateQuestionCalculated: publicProcedure
    .input(updateQuestionCalculatedParams)
    .mutation(async ({ input }) => {
      return updateQuestionCalculated(input.id, input);
    }),
  deleteQuestionCalculated: publicProcedure
    .input(questionCalculatedIdSchema)
    .mutation(async ({ input }) => {
      return deleteQuestionCalculated(input.id);
    }),
});
