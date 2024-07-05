import { eq } from "drizzle-orm";

import type { BookChapterId } from "../../db/schema/bookChapters";
import { db } from "../../db/index";
import {
  bookChapterIdSchema,
  bookChapters,
} from "../../db/schema/bookChapters";
import { books } from "../../db/schema/books";

export const getBookChapters = async () => {
  const rows = await db
    .select({ bookChapter: bookChapters, book: books })
    .from(bookChapters)
    .leftJoin(books, eq(bookChapters.bookId, books.id));
  const b = rows.map((r) => ({ ...r.bookChapter, book: r.book }));
  return { bookChapters: b };
};

export const getBookChapterById = async (id: BookChapterId) => {
  const { id: bookChapterId } = bookChapterIdSchema.parse({ id });
  const [row] = await db
    .select({ bookChapter: bookChapters, book: books })
    .from(bookChapters)
    .where(eq(bookChapters.id, bookChapterId))
    .leftJoin(books, eq(bookChapters.bookId, books.id));
  if (row === undefined) return {};
  const b = { ...row.bookChapter, book: row.book };
  return { bookChapter: b };
};
