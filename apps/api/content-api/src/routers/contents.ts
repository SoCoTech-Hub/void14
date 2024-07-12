import {
  contentIdSchema,
  insertContentParams,
  updateContentParams,
} from "@soco/content-db/schema/contents";

import {
  createContent,
  deleteContent,
  updateContent,
} from "../api/contents/mutations";
import { getContentById, getContents } from "../api/contents/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const contentsRouter: ReturnType<typeof createTRPCRouter> =
  createTRPCRouter({
    getContents: publicProcedure.query(async () => {
      return getContents();
    }),
    getContentById: publicProcedure
      .input(contentIdSchema)
      .query(async ({ input }) => {
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
