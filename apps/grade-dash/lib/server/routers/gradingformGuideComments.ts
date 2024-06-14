import { getGradingformGuideCommentById, getGradingformGuideComments } from "@/lib/api/gradingformGuideComments/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  gradingformGuideCommentIdSchema,
  insertGradingformGuideCommentParams,
  updateGradingformGuideCommentParams,
} from "@/lib/db/schema/gradingformGuideComments";
import { createGradingformGuideComment, deleteGradingformGuideComment, updateGradingformGuideComment } from "@/lib/api/gradingformGuideComments/mutations";

export const gradingformGuideCommentsRouter = router({
  getGradingformGuideComments: publicProcedure.query(async () => {
    return getGradingformGuideComments();
  }),
  getGradingformGuideCommentById: publicProcedure.input(gradingformGuideCommentIdSchema).query(async ({ input }) => {
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
