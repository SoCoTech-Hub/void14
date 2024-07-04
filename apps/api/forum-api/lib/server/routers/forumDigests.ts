import {
  createForumDigest,
  deleteForumDigest,
  updateForumDigest,
} from "../api/forumDigests/mutations";
import {
  getForumDigestById,
  getForumDigests,
} from "../api/forumDigests/queries";
import {
  forumDigestIdSchema,
  insertForumDigestParams,
  updateForumDigestParams,
} from "../db/schema/forumDigests";
import { publicProcedure, router } from "../server/trpc";

export const forumDigestsRouter = router({
  getForumDigests: publicProcedure.query(async () => {
    return getForumDigests();
  }),
  getForumDigestById: publicProcedure
    .input(forumDigestIdSchema)
    .query(async ({ input }) => {
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
