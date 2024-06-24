import { db } from "@/lib/db/index";
import { eq, and } from "drizzle-orm";
import { getUserAuth } from "@/lib/auth/utils";
import { type ToolDataprivacyCtxLevelId, toolDataprivacyCtxLevelIdSchema, toolDataprivacyCtxLevels } from "@/lib/db/schema/toolDataprivacyCtxLevels";
import { toolDataprivacyCategories } from "@/lib/db/schema/toolDataprivacyCategories";
import { toolDataprivacyPurposes } from "@/lib/db/schema/toolDataprivacyPurposes";

export const getToolDataprivacyCtxLevels = async () => {
  const { session } = await getUserAuth();
  const rows = await db.select({ toolDataprivacyCtxLevel: toolDataprivacyCtxLevels, toolDataprivacyCategory: toolDataprivacyCategories, toolDataprivacyPurpose: toolDataprivacyPurposes }).from(toolDataprivacyCtxLevels).leftJoin(toolDataprivacyCategories, eq(toolDataprivacyCtxLevels.toolDataprivacyCategoryId, toolDataprivacyCategories.id)).leftJoin(toolDataprivacyPurposes, eq(toolDataprivacyCtxLevels.toolDataprivacyPurposeId, toolDataprivacyPurposes.id)).where(eq(toolDataprivacyCtxLevels.userId, session?.user.id!));
  const t = rows .map((r) => ({ ...r.toolDataprivacyCtxLevel, toolDataprivacyCategory: r.toolDataprivacyCategory, toolDataprivacyPurpose: r.toolDataprivacyPurpose})); 
  return { toolDataprivacyCtxLevels: t };
};

export const getToolDataprivacyCtxLevelById = async (id: ToolDataprivacyCtxLevelId) => {
  const { session } = await getUserAuth();
  const { id: toolDataprivacyCtxLevelId } = toolDataprivacyCtxLevelIdSchema.parse({ id });
  const [row] = await db.select({ toolDataprivacyCtxLevel: toolDataprivacyCtxLevels, toolDataprivacyCategory: toolDataprivacyCategories, toolDataprivacyPurpose: toolDataprivacyPurposes }).from(toolDataprivacyCtxLevels).where(and(eq(toolDataprivacyCtxLevels.id, toolDataprivacyCtxLevelId), eq(toolDataprivacyCtxLevels.userId, session?.user.id!))).leftJoin(toolDataprivacyCategories, eq(toolDataprivacyCtxLevels.toolDataprivacyCategoryId, toolDataprivacyCategories.id)).leftJoin(toolDataprivacyPurposes, eq(toolDataprivacyCtxLevels.toolDataprivacyPurposeId, toolDataprivacyPurposes.id));
  if (row === undefined) return {};
  const t =  { ...row.toolDataprivacyCtxLevel, toolDataprivacyCategory: row.toolDataprivacyCategory, toolDataprivacyPurpose: row.toolDataprivacyPurpose } ;
  return { toolDataprivacyCtxLevel: t };
};


