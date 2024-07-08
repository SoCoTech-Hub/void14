import { getCommentById, getComments } from "../api/comments/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  commentIdSchema,
  insertCommentParams,
  updateCommentParams,
} from "@soco/comment-db/schema/comments";
import { createComment, deleteComment, updateComment } from "../api/comments/mutations";

export const commentsRouter =createTRPCRouter({
  getComments: publicProcedure.query(async () => {
    return getComments();
  }),
  getCommentById: publicProcedure.input(commentIdSchema).query(async ({ input }) => {
    return getCommentById(input.id);
  }),
  createComment: publicProcedure
    .input(insertCommentParams)
    .mutation(async ({ input }) => {
      return createComment(input);
    }),
  updateComment: publicProcedure
    .input(updateCommentParams)
    .mutation(async ({ input }) => {
      return updateComment(input.id, input);
    }),
  deleteComment: publicProcedure
    .input(commentIdSchema)
    .mutation(async ({ input }) => {
      return deleteComment(input.id);
    }),
});
