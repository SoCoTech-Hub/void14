import {
  createForumPost,
  deleteForumPost,
  updateForumPost,
} from "../api/forumPosts/mutations";
import { getForumPostById, getForumPosts } from "../api/forumPosts/queries";
import {
  forumPostIdSchema,
  insertForumPostParams,
  updateForumPostParams,
} from "../db/schema/forumPosts";
import { publicProcedure, router } from "../server/trpc";

export const forumPostsRouter = router({
  getForumPosts: publicProcedure.query(async () => {
    return getForumPosts();
  }),
  getForumPostById: publicProcedure
    .input(forumPostIdSchema)
    .query(async ({ input }) => {
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
