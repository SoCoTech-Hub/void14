import {
  createGradingformGuideComment,
  deleteGradingformGuideComment,
  updateGradingformGuideComment,
} from "../api/gradingformGuideComments/mutations";
import {
  getGradingformGuideCommentById,
  getGradingformGuideComments,
} from "../api/gradingformGuideComments/queries";
import {
  gradingformGuideCommentIdSchema,
  insertGradingformGuideCommentParams,
  updateGradingformGuideCommentParams,
} from "../db/schema/gradingformGuideComments";
import { publicProcedure, router } from "../server/trpc";

export const gradingformGuideCommentsRouter = router({
  getGradingformGuideComments: publicProcedure.query(async () => {
    return getGradingformGuideComments();
  }),
  getGradingformGuideCommentById: publicProcedure
    .input(gradingformGuideCommentIdSchema)
    .query(async ({ input }) => {
      return getGradingformGuideCommentById(input.id);
    }),
  createGradingformGuideComment: publicProcedure
    .input(insertGradingformGuideCommentParams)
    .mutation(async ({ input }) => {
      return createGradingformGuideComment(input);
    }),
  updateGradingformGuideComment: publicProcedure
    .input(updateGradingformGuideCommentParams)
    .mutation(async ({ input }) => {
      return updateGradingformGuideComment(input.id, input);
    }),
  deleteGradingformGuideComment: publicProcedure
    .input(gradingformGuideCommentIdSchema)
    .mutation(async ({ input }) => {
      return deleteGradingformGuideComment(input.id);
    }),
});
