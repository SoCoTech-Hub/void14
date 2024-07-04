import { eq } from "drizzle-orm";

import { db } from "../db/index";
import {
  insertToolRecyclebinCategorySchema,
  NewToolRecyclebinCategoryParams,
  toolRecyclebinCategories,
  ToolRecyclebinCategoryId,
  toolRecyclebinCategoryIdSchema,
  UpdateToolRecyclebinCategoryParams,
  updateToolRecyclebinCategorySchema,
} from "../db/schema/toolRecyclebinCategories";

export const createToolRecyclebinCategory = async (
  toolRecyclebinCategory: NewToolRecyclebinCategoryParams,
) => {
  const newToolRecyclebinCategory = insertToolRecyclebinCategorySchema.parse(
    toolRecyclebinCategory,
  );
  try {
    const [t] = await db
      .insert(toolRecyclebinCategories)
      .values(newToolRecyclebinCategory)
      .returning();
    return { toolRecyclebinCategory: t };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateToolRecyclebinCategory = async (
  id: ToolRecyclebinCategoryId,
  toolRecyclebinCategory: UpdateToolRecyclebinCategoryParams,
) => {
  const { id: toolRecyclebinCategoryId } = toolRecyclebinCategoryIdSchema.parse(
    { id },
  );
  const newToolRecyclebinCategory = updateToolRecyclebinCategorySchema.parse(
    toolRecyclebinCategory,
  );
  try {
    const [t] = await db
      .update(toolRecyclebinCategories)
      .set({ ...newToolRecyclebinCategory, updatedAt: new Date() })
      .where(eq(toolRecyclebinCategories.id, toolRecyclebinCategoryId!))
      .returning();
    return { toolRecyclebinCategory: t };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteToolRecyclebinCategory = async (
  id: ToolRecyclebinCategoryId,
) => {
  const { id: toolRecyclebinCategoryId } = toolRecyclebinCategoryIdSchema.parse(
    { id },
  );
  try {
    const [t] = await db
      .delete(toolRecyclebinCategories)
      .where(eq(toolRecyclebinCategories.id, toolRecyclebinCategoryId!))
      .returning();
    return { toolRecyclebinCategory: t };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
