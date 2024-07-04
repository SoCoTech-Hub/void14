import { createForum, deleteForum, updateForum } from "../api/forums/mutations";
import { getForumById, getForums } from "../api/forums/queries";
import {
  forumIdSchema,
  insertForumParams,
  updateForumParams,
} from "../db/schema/forums";
import { publicProcedure, router } from "../server/trpc";

export const forumsRouter = router({
  getForums: publicProcedure.query(async () => {
    return getForums();
  }),
  getForumById: publicProcedure
    .input(forumIdSchema)
    .query(async ({ input }) => {
      return getForumById(input.id);
    }),
  createForum: publicProcedure
    .input(insertForumParams)
    .mutation(async ({ input }) => {
      return createForum(input);
    }),
  updateForum: publicProcedure
    .input(updateForumParams)
    .mutation(async ({ input }) => {
      return updateForum(input.id, input);
    }),
  deleteForum: publicProcedure
    .input(forumIdSchema)
    .mutation(async ({ input }) => {
      return deleteForum(input.id);
    }),
});