import { getBlogCommentById, getBlogComments } from "@/lib/api/blogComments/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  blogCommentIdSchema,
  insertBlogCommentParams,
  updateBlogCommentParams,
} from "@/lib/db/schema/blogComments";
import { createBlogComment, deleteBlogComment, updateBlogComment } from "@/lib/api/blogComments/mutations";

export const blogCommentsRouter = router({
  getBlogComments: publicProcedure.query(async () => {
    return getBlogComments();
  }),
  getBlogCommentById: publicProcedure.input(blogCommentIdSchema).query(async ({ input }) => {
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
