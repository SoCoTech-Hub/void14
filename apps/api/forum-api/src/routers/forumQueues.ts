import { getForumQueueById, getForumQueues } from "../api/forumQueues/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  forumQueueIdSchema,
  insertForumQueueParams,
  updateForumQueueParams,
} from "@soco/forum-db/schema/forumQueues";
import { createForumQueue, deleteForumQueue, updateForumQueue } from "../api/forumQueues/mutations";

export const forumQueuesRouter =createTRPCRouter({
  getForumQueues: publicProcedure.query(async () => {
    return getForumQueues();
  }),
  getForumQueueById: publicProcedure.input(forumQueueIdSchema).query(async ({ input }) => {
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
