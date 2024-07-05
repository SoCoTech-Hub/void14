import { eq } from "drizzle-orm";

import { db } from "../../db/index";
import {
  BookId,
  bookIdSchema,
  books,
  insertBookSchema,
  NewBookParams,
  UpdateBookParams,
  updateBookSchema,
} from "../../db/schema/books";

export const createBook = async (book: NewBookParams) => {
  const newBook = insertBookSchema.parse(book);
  try {
    const [b] = await db.insert(books).values(newBook).returning();
    return { book: b };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateBook = async (id: BookId, book: UpdateBookParams) => {
  const { id: bookId } = bookIdSchema.parse({ id });
  const newBook = updateBookSchema.parse(book);
  try {
    const [b] = await db
      .update(books)
      .set({ ...newBook, updatedAt: new Date() })
      .where(eq(books.id, bookId!))
      .returning();
    return { book: b };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteBook = async (id: BookId) => {
  const { id: bookId } = bookIdSchema.parse({ id });
  try {
    const [b] = await db.delete(books).where(eq(books.id, bookId!)).returning();
    return { book: b };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
