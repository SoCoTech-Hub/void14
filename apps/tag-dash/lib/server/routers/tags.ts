import { getTagById, getTags } from "@/lib/api/tags/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  tagIdSchema,
  insertTagParams,
  updateTagParams,
} from "@/lib/db/schema/tags";
import { createTag, deleteTag, updateTag } from "@/lib/api/tags/mutations";

export const tagsRouter = router({
  getTags: publicProcedure.query(async () => {
    return getTags();
  }),
  getTagById: publicProcedure.input(tagIdSchema).query(async ({ input }) => {
    return getTagById(input.id);
  }),
  createTag: publicProcedure
    .input(insertTagParams)
    .mutation(async ({ input }) => {
      return createTag(input);
    }),
  updateTag: publicProcedure
    .input(updateTagParams)
    .mutation(async ({ input }) => {
      return updateTag(input.id, input);
    }),
  deleteTag: publicProcedure
    .input(tagIdSchema)
    .mutation(async ({ input }) => {
      return deleteTag(input.id);
    }),
});
