import { eq } from "drizzle-orm";

import { db } from "../../db/index";
import {
  insertToolUserToursStepSchema,
  NewToolUserToursStepParams,
  ToolUserToursStepId,
  toolUserToursStepIdSchema,
  toolUserToursSteps,
  UpdateToolUserToursStepParams,
  updateToolUserToursStepSchema,
} from "../../db/schema/toolUserToursSteps";

export const createToolUserToursStep = async (
  toolUserToursStep: NewToolUserToursStepParams,
) => {
  const newToolUserToursStep =
    insertToolUserToursStepSchema.parse(toolUserToursStep);
  try {
    const [t] = await db
      .insert(toolUserToursSteps)
      .values(newToolUserToursStep)
      .returning();
    return { toolUserToursStep: t };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateToolUserToursStep = async (
  id: ToolUserToursStepId,
  toolUserToursStep: UpdateToolUserToursStepParams,
) => {
  const { id: toolUserToursStepId } = toolUserToursStepIdSchema.parse({ id });
  const newToolUserToursStep =
    updateToolUserToursStepSchema.parse(toolUserToursStep);
  try {
    const [t] = await db
      .update(toolUserToursSteps)
      .set(newToolUserToursStep)
      .where(eq(toolUserToursSteps.id, toolUserToursStepId!))
      .returning();
    return { toolUserToursStep: t };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteToolUserToursStep = async (id: ToolUserToursStepId) => {
  const { id: toolUserToursStepId } = toolUserToursStepIdSchema.parse({ id });
  try {
    const [t] = await db
      .delete(toolUserToursSteps)
      .where(eq(toolUserToursSteps.id, toolUserToursStepId!))
      .returning();
    return { toolUserToursStep: t };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
