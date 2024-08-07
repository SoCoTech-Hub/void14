import type {
  NewPageParams,
  PageId,
  UpdatePageParams,
} from "@soco/page-db/schema/pages";
import { eq } from "@soco/page-db";
import { db } from "@soco/page-db/client";
import {
  insertPageSchema,
  pageIdSchema,
  pages,
  updatePageSchema,
} from "@soco/page-db/schema/pages";

export const createPage = async (page: NewPageParams) => {
  const newPage = insertPageSchema.parse(page);
  try {
    const [p] = await db.insert(pages).values(newPage).returning();
    return { page: p };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updatePage = async (id: PageId, page: UpdatePageParams) => {
  const { id: pageId } = pageIdSchema.parse({ id });
  const newPage = updatePageSchema.parse(page);
  try {
    const [p] = await db
      .update(pages)
      .set({ ...newPage, updatedAt: new Date() })
      .where(eq(pages.id, pageId!))
      .returning();
    return { page: p };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deletePage = async (id: PageId) => {
  const { id: pageId } = pageIdSchema.parse({ id });
  try {
    const [p] = await db.delete(pages).where(eq(pages.id, pageId!)).returning();
    return { page: p };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
