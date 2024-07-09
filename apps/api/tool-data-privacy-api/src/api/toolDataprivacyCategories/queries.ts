import { and, eq } from "drizzle-orm";

import type { ToolDataprivacyCategoryId } from "@soco/tool-data-privacy-db/schema/toolDataprivacyCategories";
import { getUserAuth } from "@soco/auth-services";
import { db } from "@soco/tool-data-privacy-db/index";
import {
  toolDataprivacyCategories,
  toolDataprivacyCategoryIdSchema,
} from "@soco/tool-data-privacy-db/schema/toolDataprivacyCategories";

export const getToolDataprivacyCategories = async () => {
  const { session } = await getUserAuth();
  const rows = await db
    .select()
    .from(toolDataprivacyCategories)
    .where(eq(toolDataprivacyCategories.userId, session?.user.id!));
  const t = rows;
  return { toolDataprivacyCategories: t };
};

export const getToolDataprivacyCategoryById = async (
  id: ToolDataprivacyCategoryId,
) => {
  const { session } = await getUserAuth();
  const { id: toolDataprivacyCategoryId } =
    toolDataprivacyCategoryIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(toolDataprivacyCategories)
    .where(
      and(
        eq(toolDataprivacyCategories.id, toolDataprivacyCategoryId),
        eq(toolDataprivacyCategories.userId, session?.user.id!),
      ),
    );
  if (row === undefined) return {};
  const t = row;
  return { toolDataprivacyCategory: t };
};
