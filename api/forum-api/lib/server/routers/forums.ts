import { getForumById, getForums } from "@/lib/api/forums/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  forumIdSchema,
  insertForumParams,
  updateForumParams,
} from "@/lib/db/schema/forums";
import { createForum, deleteForum, updateForum } from "@/lib/api/forums/mutations";

export const forumsRouter = router({
  getForums: publicProcedure.query(async () => {
    return getForums();
  }),
  getForumById: publicProcedure.input(forumIdSchema).query(async ({ input }) => {
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
