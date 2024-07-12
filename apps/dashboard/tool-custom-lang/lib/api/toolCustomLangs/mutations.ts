import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { 
  type ToolCustomLangId, 
  type NewToolCustomLangParams,
  type UpdateToolCustomLangParams, 
  updateToolCustomLangSchema,
  insertToolCustomLangSchema, 
  toolCustomLangs,
  toolCustomLangIdSchema 
} from "@/lib/db/schema/toolCustomLangs";

export const createToolCustomLang = async (toolCustomLang: NewToolCustomLangParams) => {
  const newToolCustomLang = insertToolCustomLangSchema.parse(toolCustomLang);
  try {
    const [t] =  await db.insert(toolCustomLangs).values(newToolCustomLang).returning();
    return { toolCustomLang: t };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateToolCustomLang = async (id: ToolCustomLangId, toolCustomLang: UpdateToolCustomLangParams) => {
  const { id: toolCustomLangId } = toolCustomLangIdSchema.parse({ id });
  const newToolCustomLang = updateToolCustomLangSchema.parse(toolCustomLang);
  try {
    const [t] =  await db
     .update(toolCustomLangs)
     .set({...newToolCustomLang, updatedAt: new Date() })
     .where(eq(toolCustomLangs.id, toolCustomLangId!))
     .returning();
    return { toolCustomLang: t };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteToolCustomLang = async (id: ToolCustomLangId) => {
  const { id: toolCustomLangId } = toolCustomLangIdSchema.parse({ id });
  try {
    const [t] =  await db.delete(toolCustomLangs).where(eq(toolCustomLangs.id, toolCustomLangId!))
    .returning();
    return { toolCustomLang: t };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

