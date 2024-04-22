import { getAssignFeedbackCommentById, getAssignFeedbackComments } from "@/lib/api/assignFeedbackComments/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  assignFeedbackCommentIdSchema,
  insertAssignFeedbackCommentParams,
  updateAssignFeedbackCommentParams,
} from "@/lib/db/schema/assignFeedbackComments";
import { createAssignFeedbackComment, deleteAssignFeedbackComment, updateAssignFeedbackComment } from "@/lib/api/assignFeedbackComments/mutations";

export const assignFeedbackCommentsRouter = router({
  getAssignFeedbackComments: publicProcedure.query(async () => {
    return getAssignFeedbackComments();
  }),
  getAssignFeedbackCommentById: publicProcedure.input(assignFeedbackCommentIdSchema).query(async ({ input }) => {
    return getAssignFeedbackCommentById(input.id);
  }),
  createAssignFeedbackComment: publicProcedure
    .input(insertAssignFeedbackCommentParams)
    .mutation(async ({ input }) => {
      return createAssignFeedbackComment(input);
    }),
  updateAssignFeedbackComment: publicProcedure
    .input(updateAssignFeedbackCommentParams)
    .mutation(async ({ input }) => {
      return updateAssignFeedbackComment(input.id, input);
    }),
  deleteAssignFeedbackComment: publicProcedure
    .input(assignFeedbackCommentIdSchema)
    .mutation(async ({ input }) => {
      return deleteAssignFeedbackComment(input.id);
    }),
});
