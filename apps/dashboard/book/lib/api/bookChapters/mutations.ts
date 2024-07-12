import { db } from "@/lib/db/index";
import {
  type BookChapterId,
  bookChapterIdSchema,
  bookChapters,
  insertBookChapterSchema,
  type NewBookChapterParams,
  type UpdateBookChapterParams,
  updateBookChapterSchema,
} from "@/lib/db/schema/bookChapters";
import { eq } from "drizzle-orm";

export const createBookChapter = async (bookChapter: NewBookChapterParams) => {
  const newBookChapter = insertBookChapterSchema.parse(bookChapter);
  try {
    const [b] = await db
      .insert(bookChapters)
      .values(newBookChapter)
      .returning();
    return { bookChapter: b };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateBookChapter = async (
  id: BookChapterId,
  bookChapter: UpdateBookChapterParams,
) => {
  const { id: bookChapterId } = bookChapterIdSchema.parse({ id });
  const newBookChapter = updateBookChapterSchema.parse(bookChapter);
  try {
    const [b] = await db
      .update(bookChapters)
      .set({ ...newBookChapter, updatedAt: new Date() })
      .where(eq(bookChapters.id, bookChapterId!))
      .returning();
    return { bookChapter: b };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteBookChapter = async (id: BookChapterId) => {
  const { id: bookChapterId } = bookChapterIdSchema.parse({ id });
  try {
    const [b] = await db
      .delete(bookChapters)
      .where(eq(bookChapters.id, bookChapterId!))
      .returning();
    return { bookChapter: b };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
