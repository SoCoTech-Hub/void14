import { db } from "@/lib/db/index";
import { eq, and } from "drizzle-orm";
import { getUserAuth } from "@/lib/auth/utils";
import { type ToolDataprivacyCtxInstanceId, toolDataprivacyCtxInstanceIdSchema, toolDataprivacyCtxInstances } from "@/lib/db/schema/toolDataprivacyCtxInstances";
import { toolDataprivacyCategories } from "@/lib/db/schema/toolDataprivacyCategories";

export const getToolDataprivacyCtxInstances = async () => {
  const { session } = await getUserAuth();
  const rows = await db.select({ toolDataprivacyCtxInstance: toolDataprivacyCtxInstances, toolDataprivacyCategory: toolDataprivacyCategories }).from(toolDataprivacyCtxInstances).leftJoin(toolDataprivacyCategories, eq(toolDataprivacyCtxInstances.toolDataprivacyCategoryId, toolDataprivacyCategories.id)).where(eq(toolDataprivacyCtxInstances.userId, session?.user.id!));
  const t = rows .map((r) => ({ ...r.toolDataprivacyCtxInstance, toolDataprivacyCategory: r.toolDataprivacyCategory})); 
  return { toolDataprivacyCtxInstances: t };
};

export const getToolDataprivacyCtxInstanceById = async (id: ToolDataprivacyCtxInstanceId) => {
  const { session } = await getUserAuth();
  const { id: toolDataprivacyCtxInstanceId } = toolDataprivacyCtxInstanceIdSchema.parse({ id });
  const [row] = await db.select({ toolDataprivacyCtxInstance: toolDataprivacyCtxInstances, toolDataprivacyCategory: toolDataprivacyCategories }).from(toolDataprivacyCtxInstances).where(and(eq(toolDataprivacyCtxInstances.id, toolDataprivacyCtxInstanceId), eq(toolDataprivacyCtxInstances.userId, session?.user.id!))).leftJoin(toolDataprivacyCategories, eq(toolDataprivacyCtxInstances.toolDataprivacyCategoryId, toolDataprivacyCategories.id));
  if (row === undefined) return {};
  const t =  { ...row.toolDataprivacyCtxInstance, toolDataprivacyCategory: row.toolDataprivacyCategory } ;
  return { toolDataprivacyCtxInstance: t };
};


