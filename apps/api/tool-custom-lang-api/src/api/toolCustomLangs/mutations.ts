import type {
  NewToolCustomLangParams,
  ToolCustomLangId,
  UpdateToolCustomLangParams,
} from "@soco/tool-custom-lang-db/schema/toolCustomLangs";
import { eq } from "@soco/tool-custom-lang-db";
import { db } from "@soco/tool-custom-lang-db/client";
import {
  insertToolCustomLangSchema,
  toolCustomLangIdSchema,
  toolCustomLangs,
  updateToolCustomLangSchema,
} from "@soco/tool-custom-lang-db/schema/toolCustomLangs";

export const createToolCustomLang = async (
  toolCustomLang: NewToolCustomLangParams,
) => {
  const newToolCustomLang = insertToolCustomLangSchema.parse(toolCustomLang);
  try {
    const [t] = await db
      .insert(toolCustomLangs)
      .values(newToolCustomLang)
      .returning();
    return { toolCustomLang: t };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateToolCustomLang = async (
  id: ToolCustomLangId,
  toolCustomLang: UpdateToolCustomLangParams,
) => {
  const { id: toolCustomLangId } = toolCustomLangIdSchema.parse({ id });
  const newToolCustomLang = updateToolCustomLangSchema.parse(toolCustomLang);
  try {
    const [t] = await db
      .update(toolCustomLangs)
      .set({ ...newToolCustomLang, updatedAt: new Date() })
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
    const [t] = await db
      .delete(toolCustomLangs)
      .where(eq(toolCustomLangs.id, toolCustomLangId!))
      .returning();
    return { toolCustomLang: t };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
