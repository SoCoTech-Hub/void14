import { getContentById, getContents } from "../api/contents/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  contentIdSchema,
  insertContentParams,
  updateContentParams,
} from "@soco/content-db/schema/contents";
import { createContent, deleteContent, updateContent } from "../api/contents/mutations";

export const contentsRouter =createTRPCRouter({
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
