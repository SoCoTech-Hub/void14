import { getForumDigestById, getForumDigests } from "../api/forumDigests/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  forumDigestIdSchema,
  insertForumDigestParams,
  updateForumDigestParams,
} from "@soco/forum-db/schema/forumDigests";
import { createForumDigest, deleteForumDigest, updateForumDigest } from "../api/forumDigests/mutations";

export const forumDigestsRouter =createTRPCRouter({
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
