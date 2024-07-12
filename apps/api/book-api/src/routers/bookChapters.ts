import {
  bookChapterIdSchema,
  insertBookChapterParams,
  updateBookChapterParams,
} from "@soco/book-db/schema/bookChapters";

import {
  createBookChapter,
  deleteBookChapter,
  updateBookChapter,
} from "../api/bookChapters/mutations";
import {
  getBookChapterById,
  getBookChapters,
} from "../api/bookChapters/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const bookChaptersRouter: ReturnType<typeof createTRPCRouter> =
  createTRPCRouter({
    getBookChapters: publicProcedure.query(async () => {
      return getBookChapters();
    }),
    getBookChapterById: publicProcedure
      .input(bookChapterIdSchema)
      .query(async ({ input }) => {
        return getBookChapterById(input.id);
      }),
    createBookChapter: publicProcedure
      .input(insertBookChapterParams)
      .mutation(async ({ input }) => {
        return createBookChapter(input);
      }),
    updateBookChapter: publicProcedure
      .input(updateBookChapterParams)
      .mutation(async ({ input }) => {
        return updateBookChapter(input.id, input);
      }),
    deleteBookChapter: publicProcedure
      .input(bookChapterIdSchema)
      .mutation(async ({ input }) => {
        return deleteBookChapter(input.id);
      }),
  });
