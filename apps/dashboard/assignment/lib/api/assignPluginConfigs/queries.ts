import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { type AssignPluginConfigId, assignPluginConfigIdSchema, assignPluginConfigs } from "@/lib/db/schema/assignPluginConfigs";
import { assignments } from "@/lib/db/schema/assignments";

export const getAssignPluginConfigs = async () => {
  const rows = await db.select({ assignPluginConfig: assignPluginConfigs, assignment: assignments }).from(assignPluginConfigs).leftJoin(assignments, eq(assignPluginConfigs.assignmentId, assignments.id));
  const a = rows .map((r) => ({ ...r.assignPluginConfig, assignment: r.assignment})); 
  return { assignPluginConfigs: a };
};

export const getAssignPluginConfigById = async (id: AssignPluginConfigId) => {
  const { id: assignPluginConfigId } = assignPluginConfigIdSchema.parse({ id });
  const [row] = await db.select({ assignPluginConfig: assignPluginConfigs, assignment: assignments }).from(assignPluginConfigs).where(eq(assignPluginConfigs.id, assignPluginConfigId)).leftJoin(assignments, eq(assignPluginConfigs.assignmentId, assignments.id));
  if (row === undefined) return {};
  const a =  { ...row.assignPluginConfig, assignment: row.assignment } ;
  return { assignPluginConfig: a };
};


