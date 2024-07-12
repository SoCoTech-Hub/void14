import {
  forumReadIdSchema,
  insertForumReadParams,
  updateForumReadParams,
} from "@soco/forum-db/schema/forumReads";

import {
  createForumRead,
  deleteForumRead,
  updateForumRead,
} from "../api/forumReads/mutations";
import { getForumReadById, getForumReads } from "../api/forumReads/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const forumReadsRouter = createTRPCRouter({
  getForumReads: publicProcedure.query(async () => {
    return getForumReads();
  }),
  getForumReadById: publicProcedure
    .input(forumReadIdSchema)
    .query(async ({ input }) => {
      return getForumReadById(input.id);
    }),
  createForumRead: publicProcedure
    .input(insertForumReadParams)
    .mutation(async ({ input }) => {
      return createForumRead(input);
    }),
  updateForumRead: publicProcedure
    .input(updateForumReadParams)
    .mutation(async ({ input }) => {
      return updateForumRead(input.id, input);
    }),
  deleteForumRead: publicProcedure
    .input(forumReadIdSchema)
    .mutation(async ({ input }) => {
      return deleteForumRead(input.id);
    }),
});
