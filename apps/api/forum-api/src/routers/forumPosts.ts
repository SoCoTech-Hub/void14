import {
  forumPostIdSchema,
  insertForumPostParams,
  updateForumPostParams,
} from "@soco/forum-db/schema/forumPosts";

import {
  createForumPost,
  deleteForumPost,
  updateForumPost,
} from "../api/forumPosts/mutations";
import { getForumPostById, getForumPosts } from "../api/forumPosts/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const forumPostsRouter: ReturnType<typeof createTRPCRouter> =
  createTRPCRouter({
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
