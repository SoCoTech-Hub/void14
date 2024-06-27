import { getForumDigestById, getForumDigests } from "@/lib/api/forumDigests/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  forumDigestIdSchema,
  insertForumDigestParams,
  updateForumDigestParams,
} from "@/lib/db/schema/forumDigests";
import { createForumDigest, deleteForumDigest, updateForumDigest } from "@/lib/api/forumDigests/mutations";

export const forumDigestsRouter = router({
  getForumDigests: publicProcedure.query(async () => {
    return getForumDigests();
  }),
  getForumDigestById: publicProcedure.input(forumDigestIdSchema).query(async ({ input }) => {
    return getForumDigestById(input.id);
  }),
  createForumDigest: publicProcedure
    .input(insertForumDigestParams)
    .mutation(async ({ input }) => {
      return createForumDigest(input);
    }),
  updateForumDigest: publicProcedure
    .input(updateForumDigestParams)
    .mutation(async ({ input }) => {
      return updateForumDigest(input.id, input);
    }),
  deleteForumDigest: publicProcedure
    .input(forumDigestIdSchema)
    .mutation(async ({ input }) => {
      return deleteForumDigest(input.id);
    }),
});
