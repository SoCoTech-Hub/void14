import { getAssignFeedbackCommentById, getAssignFeedbackComments } from "../api/assignFeedbackComments/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  assignFeedbackCommentIdSchema,
  insertAssignFeedbackCommentParams,
  updateAssignFeedbackCommentParams,
} from "@soco/assignment-db/schema/assignFeedbackComments";
import { createAssignFeedbackComment, deleteAssignFeedbackComment, updateAssignFeedbackComment } from "../api/assignFeedbackComments/mutations";

export const assignFeedbackCommentsRouter =createTRPCRouter({
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
