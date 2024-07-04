import {
  createQuestionVersion,
  deleteQuestionVersion,
  updateQuestionVersion,
} from "../api/questionVersions/mutations";
import {
  getQuestionVersionById,
  getQuestionVersions,
} from "../api/questionVersions/queries";
import {
  insertQuestionVersionParams,
  questionVersionIdSchema,
  updateQuestionVersionParams,
} from "../db/schema/questionVersions";
import { publicProcedure, router } from "../server/trpc";

export const questionVersionsRouter = router({
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
