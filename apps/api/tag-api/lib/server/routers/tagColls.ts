import {
  createTagColl,
  deleteTagColl,
  updateTagColl,
} from "../api/tagColls/mutations";
import { getTagCollById, getTagColls } from "../api/tagColls/queries";
import {
  insertTagCollParams,
  tagCollIdSchema,
  updateTagCollParams,
} from "../db/schema/tagColls";
import { publicProcedure, router } from "../server/trpc";

export const tagCollsRouter = router({
  getTagColls: publicProcedure.query(async () => {
    return getTagColls();
  }),
  getTagCollById: publicProcedure
    .input(tagCollIdSchema)
    .query(async ({ input }) => {
      return getTagCollById(input.id);
    }),
  createTagColl: publicProcedure
    .input(insertTagCollParams)
    .mutation(async ({ input }) => {
      return createTagColl(input);
    }),
  updateTagColl: publicProcedure
    .input(updateTagCollParams)
    .mutation(async ({ input }) => {
      return updateTagColl(input.id, input);
    }),
  deleteTagColl: publicProcedure
    .input(tagCollIdSchema)
    .mutation(async ({ input }) => {
      return deleteTagColl(input.id);
    }),
});
