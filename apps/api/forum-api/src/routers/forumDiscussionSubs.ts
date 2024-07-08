import { getForumDiscussionSubById, getForumDiscussionSubs } from "../api/forumDiscussionSubs/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  forumDiscussionSubIdSchema,
  insertForumDiscussionSubParams,
  updateForumDiscussionSubParams,
} from "@soco/forum-db/schema/forumDiscussionSubs";
import { createForumDiscussionSub, deleteForumDiscussionSub, updateForumDiscussionSub } from "../api/forumDiscussionSubs/mutations";

export const forumDiscussionSubsRouter =createTRPCRouter({
  getForumDiscussionSubs: publicProcedure.query(async () => {
    return getForumDiscussionSubs();
  }),
  getForumDiscussionSubById: publicProcedure.input(forumDiscussionSubIdSchema).query(async ({ input }) => {
    return getForumDiscussionSubById(input.id);
  }),
  createForumDiscussionSub: publicProcedure
    .input(insertForumDiscussionSubParams)
    .mutation(async ({ input }) => {
      return createForumDiscussionSub(input);
    }),
  updateForumDiscussionSub: publicProcedure
    .input(updateForumDiscussionSubParams)
    .mutation(async ({ input }) => {
      return updateForumDiscussionSub(input.id, input);
    }),
  deleteForumDiscussionSub: publicProcedure
    .input(forumDiscussionSubIdSchema)
    .mutation(async ({ input }) => {
      return deleteForumDiscussionSub(input.id);
    }),
});
