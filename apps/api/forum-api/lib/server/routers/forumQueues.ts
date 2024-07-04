import {
  createForumQueue,
  deleteForumQueue,
  updateForumQueue,
} from "../api/forumQueues/mutations";
import { getForumQueueById, getForumQueues } from "../api/forumQueues/queries";
import {
  forumQueueIdSchema,
  insertForumQueueParams,
  updateForumQueueParams,
} from "../db/schema/forumQueues";
import { publicProcedure, router } from "../server/trpc";

export const forumQueuesRouter = router({
  getForumQueues: publicProcedure.query(async () => {
    return getForumQueues();
  }),
  getForumQueueById: publicProcedure
    .input(forumQueueIdSchema)
    .query(async ({ input }) => {
      return getForumQueueById(input.id);
    }),
  createForumQueue: publicProcedure
    .input(insertForumQueueParams)
    .mutation(async ({ input }) => {
      return createForumQueue(input);
    }),
  updateForumQueue: publicProcedure
    .input(updateForumQueueParams)
    .mutation(async ({ input }) => {
      return updateForumQueue(input.id, input);
    }),
  deleteForumQueue: publicProcedure
    .input(forumQueueIdSchema)
    .mutation(async ({ input }) => {
      return deleteForumQueue(input.id);
    }),
});
