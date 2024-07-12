import {
  assignFeedbackCommentIdSchema,
  insertAssignFeedbackCommentParams,
  updateAssignFeedbackCommentParams,
} from "@soco/assignment-db/schema/assignFeedbackComments";

import {
  createAssignFeedbackComment,
  deleteAssignFeedbackComment,
  updateAssignFeedbackComment,
} from "../api/assignFeedbackComments/mutations";
import {
  getAssignFeedbackCommentById,
  getAssignFeedbackComments,
} from "../api/assignFeedbackComments/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const assignFeedbackCommentsRouter: ReturnType<typeof createTRPCRouter> =
  createTRPCRouter({
    getAssignFeedbackComments: publicProcedure.query(async () => {
      return getAssignFeedbackComments();
    }),
    getAssignFeedbackCommentById: publicProcedure
      .input(assignFeedbackCommentIdSchema)
      .query(async ({ input }) => {
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
