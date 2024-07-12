import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { 
  type ConfigId, 
  type NewConfigParams,
  type UpdateConfigParams, 
  updateConfigSchema,
  insertConfigSchema, 
  configs,
  configIdSchema 
} from "@/lib/db/schema/configs";

export const createConfig = async (config: NewConfigParams) => {
  const newConfig = insertConfigSchema.parse(config);
  try {
    const [c] =  await db.insert(configs).values(newConfig).returning();
    return { config: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateConfig = async (id: ConfigId, config: UpdateConfigParams) => {
  const { id: configId } = configIdSchema.parse({ id });
  const newConfig = updateConfigSchema.parse(config);
  try {
    const [c] =  await db
     .update(configs)
     .set(newConfig)
     .where(eq(configs.id, configId!))
     .returning();
    return { config: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteConfig = async (id: ConfigId) => {
  const { id: configId } = configIdSchema.parse({ id });
  try {
    const [c] =  await db.delete(configs).where(eq(configs.id, configId!))
    .returning();
    return { config: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

