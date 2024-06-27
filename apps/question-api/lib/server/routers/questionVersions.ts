import { getQuestionVersionById, getQuestionVersions } from "@/lib/api/questionVersions/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  questionVersionIdSchema,
  insertQuestionVersionParams,
  updateQuestionVersionParams,
} from "@/lib/db/schema/questionVersions";
import { createQuestionVersion, deleteQuestionVersion, updateQuestionVersion } from "@/lib/api/questionVersions/mutations";

export const questionVersionsRouter = router({
  getQuestionVersions: publicProcedure.query(async () => {
    return getQuestionVersions();
  }),
  getQuestionVersionById: publicProcedure.input(questionVersionIdSchema).query(async ({ input }) => {
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
