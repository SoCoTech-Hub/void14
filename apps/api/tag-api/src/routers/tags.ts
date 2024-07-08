import { getTagById, getTags } from "../api/tags/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  tagIdSchema,
  insertTagParams,
  updateTagParams,
} from "@soco/tag-db/schema/tags";
import { createTag, deleteTag, updateTag } from "../api/tags/mutations";

export const tagsRouter =createTRPCRouter({
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
