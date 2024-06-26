import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { type BookId, bookIdSchema, books } from "@/lib/db/schema/books";

export const getBooks = async () => {
  const rows = await db.select().from(books);
  const b = rows
  return { books: b };
};

export const getBookById = async (id: BookId) => {
  const { id: bookId } = bookIdSchema.parse({ id });
  const [row] = await db.select().from(books).where(eq(books.id, bookId));
  if (row === undefined) return {};
  const b = row;
  return { book: b };
};


