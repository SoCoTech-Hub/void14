import type {
  NewToolCustomLangComponentParams,
  ToolCustomLangComponentId,
  UpdateToolCustomLangComponentParams,
} from "@soco/tool-custom-lang-db/schema/toolCustomLangComponents";
import { eq } from "@soco/tool-custom-lang-db";
import { db } from "@soco/tool-custom-lang-db/client";
import {
  insertToolCustomLangComponentSchema,
  toolCustomLangComponentIdSchema,
  toolCustomLangComponents,
  updateToolCustomLangComponentSchema,
} from "@soco/tool-custom-lang-db/schema/toolCustomLangComponents";

export const createToolCustomLangComponent = async (
  toolCustomLangComponent: NewToolCustomLangComponentParams,
) => {
  const newToolCustomLangComponent = insertToolCustomLangComponentSchema.parse(
    toolCustomLangComponent,
  );
  try {
    const [t] = await db
      .insert(toolCustomLangComponents)
      .values(newToolCustomLangComponent)
      .returning();
    return { toolCustomLangComponent: t };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateToolCustomLangComponent = async (
  id: ToolCustomLangComponentId,
  toolCustomLangComponent: UpdateToolCustomLangComponentParams,
) => {
  const { id: toolCustomLangComponentId } =
    toolCustomLangComponentIdSchema.parse({ id });
  const newToolCustomLangComponent = updateToolCustomLangComponentSchema.parse(
    toolCustomLangComponent,
  );
  try {
    const [t] = await db
      .update(toolCustomLangComponents)
      .set(newToolCustomLangComponent)
      .where(eq(toolCustomLangComponents.id, toolCustomLangComponentId!))
      .returning();
    return { toolCustomLangComponent: t };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteToolCustomLangComponent = async (
  id: ToolCustomLangComponentId,
) => {
  const { id: toolCustomLangComponentId } =
    toolCustomLangComponentIdSchema.parse({ id });
  try {
    const [t] = await db
      .delete(toolCustomLangComponents)
      .where(eq(toolCustomLangComponents.id, toolCustomLangComponentId!))
      .returning();
    return { toolCustomLangComponent: t };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
