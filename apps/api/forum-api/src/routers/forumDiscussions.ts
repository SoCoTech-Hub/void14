import {
  forumDiscussionIdSchema,
  insertForumDiscussionParams,
  updateForumDiscussionParams,
} from "@soco/forum-db/schema/forumDiscussions";

import {
  createForumDiscussion,
  deleteForumDiscussion,
  updateForumDiscussion,
} from "../api/forumDiscussions/mutations";
import {
  getForumDiscussionById,
  getForumDiscussions,
} from "../api/forumDiscussions/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const forumDiscussionsRouter = createTRPCRouter({
  getForumDiscussions: publicProcedure.query(async () => {
    return getForumDiscussions();
  }),
  getForumDiscussionById: publicProcedure
    .input(forumDiscussionIdSchema)
    .query(async ({ input }) => {
      return getForumDiscussionById(input.id);
    }),
  createForumDiscussion: publicProcedure
    .input(insertForumDiscussionParams)
    .mutation(async ({ input }) => {
      return createForumDiscussion(input);
    }),
  updateForumDiscussion: publicProcedure
    .input(updateForumDiscussionParams)
    .mutation(async ({ input }) => {
      return updateForumDiscussion(input.id, input);
    }),
  deleteForumDiscussion: publicProcedure
    .input(forumDiscussionIdSchema)
    .mutation(async ({ input }) => {
      return deleteForumDiscussion(input.id);
    }),
});
