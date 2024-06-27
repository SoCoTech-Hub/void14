import { getContentById, getContents } from "@/lib/api/contents/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  contentIdSchema,
  insertContentParams,
  updateContentParams,
} from "@/lib/db/schema/contents";
import { createContent, deleteContent, updateContent } from "@/lib/api/contents/mutations";

export const contentsRouter = router({
  getContents: publicProcedure.query(async () => {
    return getContents();
  }),
  getContentById: publicProcedure.input(contentIdSchema).query(async ({ input }) => {
    return getContentById(input.id);
  }),
  createContent: publicProcedure
    .input(insertContentParams)
    .mutation(async ({ input }) => {
      return createContent(input);
    }),
  updateContent: publicProcedure
    .input(updateContentParams)
    .mutation(async ({ input }) => {
      return updateContent(input.id, input);
    }),
  deleteContent: publicProcedure
    .input(contentIdSchema)
    .mutation(async ({ input }) => {
      return deleteContent(input.id);
    }),
});
