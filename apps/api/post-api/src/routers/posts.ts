import {
  insertPostParams,
  postIdSchema,
  updatePostParams,
} from "@soco/post-db/schema/posts";

import { createPost, deletePost, updatePost } from "../api/posts/mutations";
import { getPostById, getPosts } from "../api/posts/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const postsRouter = createTRPCRouter({
  getPosts: publicProcedure.query(async () => {
    return getPosts();
  }),
  getPostById: publicProcedure.input(postIdSchema).query(async ({ input }) => {
    return getPostById(input.id);
  }),
  createPost: publicProcedure
    .input(insertPostParams)
    .mutation(async ({ input }) => {
      return createPost(input);
    }),
  updatePost: publicProcedure
    .input(updatePostParams)
    .mutation(async ({ input }) => {
      return updatePost(input.id, input);
    }),
  deletePost: publicProcedure
    .input(postIdSchema)
    .mutation(async ({ input }) => {
      return deletePost(input.id);
    }),
});
