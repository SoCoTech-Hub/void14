import {
  createBlogComment,
  deleteBlogComment,
  updateBlogComment,
} from "../api/blogComments/mutations";
import {
  getBlogCommentById,
  getBlogComments,
} from "../api/blogComments/queries";
import {
  blogCommentIdSchema,
  insertBlogCommentParams,
  updateBlogCommentParams,
} from "../db/schema/blogComments";
import { publicProcedure, router } from "../server/trpc";

export const blogCommentsRouter = router({
  getBlogComments: publicProcedure.query(async () => {
    return getBlogComments();
  }),
  getBlogCommentById: publicProcedure
    .input(blogCommentIdSchema)
    .query(async ({ input }) => {
      return getBlogCommentById(input.id);
    }),
  createBlogComment: publicProcedure
    .input(insertBlogCommentParams)
    .mutation(async ({ input }) => {
      return createBlogComment(input);
    }),
  updateBlogComment: publicProcedure
    .input(updateBlogCommentParams)
    .mutation(async ({ input }) => {
      return updateBlogComment(input.id, input);
    }),
  deleteBlogComment: publicProcedure
    .input(blogCommentIdSchema)
    .mutation(async ({ input }) => {
      return deleteBlogComment(input.id);
    }),
});
