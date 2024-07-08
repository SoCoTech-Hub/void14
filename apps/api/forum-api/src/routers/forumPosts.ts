import { getForumPostById, getForumPosts } from "../api/forumPosts/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  forumPostIdSchema,
  insertForumPostParams,
  updateForumPostParams,
} from "@soco/forum-db/schema/forumPosts";
import { createForumPost, deleteForumPost, updateForumPost } from "../api/forumPosts/mutations";

export const forumPostsRouter =createTRPCRouter({
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
