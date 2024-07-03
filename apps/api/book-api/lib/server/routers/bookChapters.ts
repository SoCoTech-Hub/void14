import { getBookChapterById, getBookChapters } from "@/lib/api/bookChapters/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  bookChapterIdSchema,
  insertBookChapterParams,
  updateBookChapterParams,
} from "@/lib/db/schema/bookChapters";
import { createBookChapter, deleteBookChapter, updateBookChapter } from "@/lib/api/bookChapters/mutations";

export const bookChaptersRouter = router({
  getBookChapters: publicProcedure.query(async () => {
    return getBookChapters();
  }),
  getBookChapterById: publicProcedure.input(bookChapterIdSchema).query(async ({ input }) => {
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
