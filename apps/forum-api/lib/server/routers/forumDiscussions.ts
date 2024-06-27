import { getForumDiscussionById, getForumDiscussions } from "@/lib/api/forumDiscussions/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  forumDiscussionIdSchema,
  insertForumDiscussionParams,
  updateForumDiscussionParams,
} from "@/lib/db/schema/forumDiscussions";
import { createForumDiscussion, deleteForumDiscussion, updateForumDiscussion } from "@/lib/api/forumDiscussions/mutations";

export const forumDiscussionsRouter = router({
  getForumDiscussions: publicProcedure.query(async () => {
    return getForumDiscussions();
  }),
  getForumDiscussionById: publicProcedure.input(forumDiscussionIdSchema).query(async ({ input }) => {
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
