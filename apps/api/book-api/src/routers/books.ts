import {
  bookIdSchema,
  insertBookParams,
  updateBookParams,
} from "@soco/book-db/schema/books";

import { createBook, deleteBook, updateBook } from "../api/books/mutations";
import { getBookById, getBooks } from "../api/books/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const booksRouter = createTRPCRouter({
  getBooks: publicProcedure.query(async () => {
    return getBooks();
  }),
  getBookById: publicProcedure.input(bookIdSchema).query(async ({ input }) => {
    return getBookById(input.id);
  }),
  createBook: publicProcedure
    .input(insertBookParams)
    .mutation(async ({ input }) => {
      return createBook(input);
    }),
  updateBook: publicProcedure
    .input(updateBookParams)
    .mutation(async ({ input }) => {
      return updateBook(input.id, input);
    }),
  deleteBook: publicProcedure
    .input(bookIdSchema)
    .mutation(async ({ input }) => {
      return deleteBook(input.id);
    }),
});
