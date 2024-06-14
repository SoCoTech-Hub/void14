import { getForumDiscussionSubById, getForumDiscussionSubs } from "@/lib/api/forumDiscussionSubs/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  forumDiscussionSubIdSchema,
  insertForumDiscussionSubParams,
  updateForumDiscussionSubParams,
} from "@/lib/db/schema/forumDiscussionSubs";
import { createForumDiscussionSub, deleteForumDiscussionSub, updateForumDiscussionSub } from "@/lib/api/forumDiscussionSubs/mutations";

export const forumDiscussionSubsRouter = router({
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
