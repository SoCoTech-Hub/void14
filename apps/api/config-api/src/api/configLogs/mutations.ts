import { db } from "@soco/config-db/client";
import { and, eq } from "@soco/config-db";
import { 
  type ConfigLogId, 
  type NewConfigLogParams,
  type UpdateConfigLogParams, 
  updateConfigLogSchema,
  insertConfigLogSchema, 
  configLogs,
  configLogIdSchema 
} from "@soco/config-db/schema/configLogs";
import { getUserAuth } from "@soco/auth-service";

export const createConfigLog = async (configLog: NewConfigLogParams) => {
  const { session } = await getUserAuth();
  const newConfigLog = insertConfigLogSchema.parse({ ...configLog, userId: session?.user.id! });
  try {
    const [c] =  await db.insert(configLogs).values(newConfigLog).returning();
    return { configLog: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateConfigLog = async (id: ConfigLogId, configLog: UpdateConfigLogParams) => {
  const { session } = await getUserAuth();
  const { id: configLogId } = configLogIdSchema.parse({ id });
  const newConfigLog = updateConfigLogSchema.parse({ ...configLog, userId: session?.user.id! });
  try {
    const [c] =  await db
     .update(configLogs)
     .set({...newConfigLog, updatedAt: new Date() })
     .where(and(eq(configLogs.id, configLogId!), eq(configLogs.userId, session?.user.id!)))
     .returning();
    return { configLog: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteConfigLog = async (id: ConfigLogId) => {
  const { session } = await getUserAuth();
  const { id: configLogId } = configLogIdSchema.parse({ id });
  try {
    const [c] =  await db.delete(configLogs).where(and(eq(configLogs.id, configLogId!), eq(configLogs.userId, session?.user.id!)))
    .returning();
    return { configLog: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

