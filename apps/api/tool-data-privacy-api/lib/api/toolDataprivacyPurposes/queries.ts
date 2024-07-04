import { db } from "@/lib/db/index";
import { eq, and } from "drizzle-orm";
import { getUserAuth } from "@soco/auth/utils";
import { type ToolDataprivacyPurposeId, toolDataprivacyPurposeIdSchema, toolDataprivacyPurposes } from "@/lib/db/schema/toolDataprivacyPurposes";

export const getToolDataprivacyPurposes = async () => {
  const { session } = await getUserAuth();
  const rows = await db.select().from(toolDataprivacyPurposes).where(eq(toolDataprivacyPurposes.userId, session?.user.id!));
  const t = rows
  return { toolDataprivacyPurposes: t };
};

export const getToolDataprivacyPurposeById = async (id: ToolDataprivacyPurposeId) => {
  const { session } = await getUserAuth();
  const { id: toolDataprivacyPurposeId } = toolDataprivacyPurposeIdSchema.parse({ id });
  const [row] = await db.select().from(toolDataprivacyPurposes).where(and(eq(toolDataprivacyPurposes.id, toolDataprivacyPurposeId), eq(toolDataprivacyPurposes.userId, session?.user.id!)));
  if (row === undefined) return {};
  const t = row;
  return { toolDataprivacyPurpose: t };
};


