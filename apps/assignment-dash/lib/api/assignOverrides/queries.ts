import { db } from "@/lib/db/index";
import { eq, and } from "drizzle-orm";
import { getUserAuth } from "@/lib/auth/utils";
import { type AssignOverrideId, assignOverrideIdSchema, assignOverrides } from "@/lib/db/schema/assignOverrides";
import { assigns } from "@/lib/db/schema/assigns";

export const getAssignOverrides = async () => {
  const { session } = await getUserAuth();
  const rows = await db.select({ assignOverride: assignOverrides, assign: assigns }).from(assignOverrides).leftJoin(assigns, eq(assignOverrides.assignId, assigns.id)).where(eq(assignOverrides.userId, session?.user.id!));
  const a = rows .map((r) => ({ ...r.assignOverride, assign: r.assign})); 
  return { assignOverrides: a };
};

export const getAssignOverrideById = async (id: AssignOverrideId) => {
  const { session } = await getUserAuth();
  const { id: assignOverrideId } = assignOverrideIdSchema.parse({ id });
  const [row] = await db.select({ assignOverride: assignOverrides, assign: assigns }).from(assignOverrides).where(and(eq(assignOverrides.id, assignOverrideId), eq(assignOverrides.userId, session?.user.id!))).leftJoin(assigns, eq(assignOverrides.assignId, assigns.id));
  if (row === undefined) return {};
  const a =  { ...row.assignOverride, assign: row.assign } ;
  return { assignOverride: a };
};


