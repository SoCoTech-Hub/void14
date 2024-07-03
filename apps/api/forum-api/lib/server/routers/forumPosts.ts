import { getForumPostById, getForumPosts } from "@/lib/api/forumPosts/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  forumPostIdSchema,
  insertForumPostParams,
  updateForumPostParams,
} from "@/lib/db/schema/forumPosts";
import { createForumPost, deleteForumPost, updateForumPost } from "@/lib/api/forumPosts/mutations";

export const forumPostsRouter = router({
  getForumPosts: publicProcedure.query(async () => {
    return getForumPosts();
  }),
  getForumPostById: publicProcedure.input(forumPostIdSchema).query(async ({ input }) => {
    return getForumPostById(input.id);
  }),
  createForumPost: publicProcedure
    .input(insertForumPostParams)
    .mutation(async ({ input }) => {
      return createForumPost(input);
    }),
  updateForumPost: publicProcedure
    .input(updateForumPostParams)
    .mutation(async ({ input }) => {
      return updateForumPost(input.id, input);
    }),
  deleteForumPost: publicProcedure
    .input(forumPostIdSchema)
    .mutation(async ({ input }) => {
      return deleteForumPost(input.id);
    }),
});
