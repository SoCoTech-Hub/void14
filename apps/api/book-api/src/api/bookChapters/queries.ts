import { db } from "@soco/book-db/client";
import { eq } from "@soco/book-db";
import { type BookChapterId, bookChapterIdSchema, bookChapters } from "@soco/book-db/schema/bookChapters";
import { books } from "@soco/book-db/schema/books";

export const getBookChapters = async () => {
  const rows = await db.select({ bookChapter: bookChapters, book: books }).from(bookChapters).leftJoin(books, eq(bookChapters.bookId, books.id));
  const b = rows .map((r) => ({ ...r.bookChapter, book: r.book})); 
  return { bookChapters: b };
};

export const getBookChapterById = async (id: BookChapterId) => {
  const { id: bookChapterId } = bookChapterIdSchema.parse({ id });
  const [row] = await db.select({ bookChapter: bookChapters, book: books }).from(bookChapters).where(eq(bookChapters.id, bookChapterId)).leftJoin(books, eq(bookChapters.bookId, books.id));
  if (row === undefined) return {};
  const b =  { ...row.bookChapter, book: row.book } ;
  return { bookChapter: b };
};


