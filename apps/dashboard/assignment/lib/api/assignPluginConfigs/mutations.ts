import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { 
  type AssignPluginConfigId, 
  type NewAssignPluginConfigParams,
  type UpdateAssignPluginConfigParams, 
  updateAssignPluginConfigSchema,
  insertAssignPluginConfigSchema, 
  assignPluginConfigs,
  assignPluginConfigIdSchema 
} from "@/lib/db/schema/assignPluginConfigs";

export const createAssignPluginConfig = async (assignPluginConfig: NewAssignPluginConfigParams) => {
  const newAssignPluginConfig = insertAssignPluginConfigSchema.parse(assignPluginConfig);
  try {
    const [a] =  await db.insert(assignPluginConfigs).values(newAssignPluginConfig).returning();
    return { assignPluginConfig: a };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateAssignPluginConfig = async (id: AssignPluginConfigId, assignPluginConfig: UpdateAssignPluginConfigParams) => {
  const { id: assignPluginConfigId } = assignPluginConfigIdSchema.parse({ id });
  const newAssignPluginConfig = updateAssignPluginConfigSchema.parse(assignPluginConfig);
  try {
    const [a] =  await db
     .update(assignPluginConfigs)
     .set(newAssignPluginConfig)
     .where(eq(assignPluginConfigs.id, assignPluginConfigId!))
     .returning();
    return { assignPluginConfig: a };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteAssignPluginConfig = async (id: AssignPluginConfigId) => {
  const { id: assignPluginConfigId } = assignPluginConfigIdSchema.parse({ id });
  try {
    const [a] =  await db.delete(assignPluginConfigs).where(eq(assignPluginConfigs.id, assignPluginConfigId!))
    .returning();
    return { assignPluginConfig: a };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

