import { getTagCollById, getTagColls } from "@/lib/api/tagColls/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  tagCollIdSchema,
  insertTagCollParams,
  updateTagCollParams,
} from "@/lib/db/schema/tagColls";
import { createTagColl, deleteTagColl, updateTagColl } from "@/lib/api/tagColls/mutations";

export const tagCollsRouter = router({
  getTagColls: publicProcedure.query(async () => {
    return getTagColls();
  }),
  getTagCollById: publicProcedure.input(tagCollIdSchema).query(async ({ input }) => {
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
