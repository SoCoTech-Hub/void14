import { getForumReadById, getForumReads } from "@/lib/api/forumReads/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  forumReadIdSchema,
  insertForumReadParams,
  updateForumReadParams,
} from "@/lib/db/schema/forumReads";
import { createForumRead, deleteForumRead, updateForumRead } from "@/lib/api/forumReads/mutations";

export const forumReadsRouter = router({
  getForumReads: publicProcedure.query(async () => {
    return getForumReads();
  }),
  getForumReadById: publicProcedure.input(forumReadIdSchema).query(async ({ input }) => {
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
