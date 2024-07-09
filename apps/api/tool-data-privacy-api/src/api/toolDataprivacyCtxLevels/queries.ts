import { and, eq } from "drizzle-orm";

import type { ToolDataprivacyCtxLevelId } from "@soco/tool-data-privacy-db/schema/toolDataprivacyCtxLevels";
import { getUserAuth } from "@soco/auth-services";
import { db } from "@soco/tool-data-privacy-db/index";
import { toolDataprivacyCategories } from "@soco/tool-data-privacy-db/schema/toolDataprivacyCategories";
import {
  toolDataprivacyCtxLevelIdSchema,
  toolDataprivacyCtxLevels,
} from "@soco/tool-data-privacy-db/schema/toolDataprivacyCtxLevels";
import { toolDataprivacyPurposes } from "@soco/tool-data-privacy-db/schema/toolDataprivacyPurposes";

export const getToolDataprivacyCtxLevels = async () => {
  const { session } = await getUserAuth();
  const rows = await db
    .select({
      toolDataprivacyCtxLevel: toolDataprivacyCtxLevels,
      toolDataprivacyCategory: toolDataprivacyCategories,
      toolDataprivacyPurpose: toolDataprivacyPurposes,
    })
    .from(toolDataprivacyCtxLevels)
    .leftJoin(
      toolDataprivacyCategories,
      eq(
        toolDataprivacyCtxLevels.toolDataprivacyCategoryId,
        toolDataprivacyCategories.id,
      ),
    )
    .leftJoin(
      toolDataprivacyPurposes,
      eq(
        toolDataprivacyCtxLevels.toolDataprivacyPurposeId,
        toolDataprivacyPurposes.id,
      ),
    )
    .where(eq(toolDataprivacyCtxLevels.userId, session?.user.id!));
  const t = rows.map((r) => ({
    ...r.toolDataprivacyCtxLevel,
    toolDataprivacyCategory: r.toolDataprivacyCategory,
    toolDataprivacyPurpose: r.toolDataprivacyPurpose,
  }));
  return { toolDataprivacyCtxLevels: t };
};

export const getToolDataprivacyCtxLevelById = async (
  id: ToolDataprivacyCtxLevelId,
) => {
  const { session } = await getUserAuth();
  const { id: toolDataprivacyCtxLevelId } =
    toolDataprivacyCtxLevelIdSchema.parse({ id });
  const [row] = await db
    .select({
      toolDataprivacyCtxLevel: toolDataprivacyCtxLevels,
      toolDataprivacyCategory: toolDataprivacyCategories,
      toolDataprivacyPurpose: toolDataprivacyPurposes,
    })
    .from(toolDataprivacyCtxLevels)
    .where(
      and(
        eq(toolDataprivacyCtxLevels.id, toolDataprivacyCtxLevelId),
        eq(toolDataprivacyCtxLevels.userId, session?.user.id!),
      ),
    )
    .leftJoin(
      toolDataprivacyCategories,
      eq(
        toolDataprivacyCtxLevels.toolDataprivacyCategoryId,
        toolDataprivacyCategories.id,
      ),
    )
    .leftJoin(
      toolDataprivacyPurposes,
      eq(
        toolDataprivacyCtxLevels.toolDataprivacyPurposeId,
        toolDataprivacyPurposes.id,
      ),
    );
  if (row === undefined) return {};
  const t = {
    ...row.toolDataprivacyCtxLevel,
    toolDataprivacyCategory: row.toolDataprivacyCategory,
    toolDataprivacyPurpose: row.toolDataprivacyPurpose,
  };
  return { toolDataprivacyCtxLevel: t };
};
