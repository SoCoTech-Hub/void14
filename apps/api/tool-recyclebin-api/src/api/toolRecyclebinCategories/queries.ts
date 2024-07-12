import type { ToolRecyclebinCategoryId } from "@soco/tool-recyclebin-db/schema/toolRecyclebinCategories";
import { eq } from "@soco/tool-recyclebin-db";
import { db } from "@soco/tool-recyclebin-db/client";
import {
  toolRecyclebinCategories,
  toolRecyclebinCategoryIdSchema,
} from "@soco/tool-recyclebin-db/schema/toolRecyclebinCategories";

export const getToolRecyclebinCategories = async () => {
  const rows = await db.select().from(toolRecyclebinCategories);
  const t = rows;
  return { toolRecyclebinCategories: t };
};

export const getToolRecyclebinCategoryById = async (
  id: ToolRecyclebinCategoryId,
) => {
  const { id: toolRecyclebinCategoryId } = toolRecyclebinCategoryIdSchema.parse(
    { id },
  );
  const [row] = await db
    .select()
    .from(toolRecyclebinCategories)
    .where(eq(toolRecyclebinCategories.id, toolRecyclebinCategoryId));
  if (row === undefined) return {};
  const t = row;
  return { toolRecyclebinCategory: t };
};
