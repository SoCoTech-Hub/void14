import type {
  NewToolUserToursTourParams,
  ToolUserToursTourId,
  UpdateToolUserToursTourParams,
} from "@soco/tool-user-tours-db/schema/toolUserToursTours";
import { eq } from "@soco/tool-user-tours-db";
import { db } from "@soco/tool-user-tours-db/client";
import {
  insertToolUserToursTourSchema,
  toolUserToursTourIdSchema,
  toolUserToursTours,
  updateToolUserToursTourSchema,
} from "@soco/tool-user-tours-db/schema/toolUserToursTours";

export const createToolUserToursTour = async (
  toolUserToursTour: NewToolUserToursTourParams,
) => {
  const newToolUserToursTour =
    insertToolUserToursTourSchema.parse(toolUserToursTour);
  try {
    const [t] = await db
      .insert(toolUserToursTours)
      .values(newToolUserToursTour)
      .returning();
    return { toolUserToursTour: t };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateToolUserToursTour = async (
  id: ToolUserToursTourId,
  toolUserToursTour: UpdateToolUserToursTourParams,
) => {
  const { id: toolUserToursTourId } = toolUserToursTourIdSchema.parse({ id });
  const newToolUserToursTour =
    updateToolUserToursTourSchema.parse(toolUserToursTour);
  try {
    const [t] = await db
      .update(toolUserToursTours)
      .set(newToolUserToursTour)
      .where(eq(toolUserToursTours.id, toolUserToursTourId!))
      .returning();
    return { toolUserToursTour: t };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteToolUserToursTour = async (id: ToolUserToursTourId) => {
  const { id: toolUserToursTourId } = toolUserToursTourIdSchema.parse({ id });
  try {
    const [t] = await db
      .delete(toolUserToursTours)
      .where(eq(toolUserToursTours.id, toolUserToursTourId!))
      .returning();
    return { toolUserToursTour: t };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
