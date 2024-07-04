import { eq } from "drizzle-orm";

import type { ToolUserToursStepId } from "../db/schema/toolUserToursSteps";
import { db } from "../db/index";
import {
  toolUserToursStepIdSchema,
  toolUserToursSteps,
} from "../db/schema/toolUserToursSteps";

export const getToolUserToursSteps = async () => {
  const rows = await db.select().from(toolUserToursSteps);
  const t = rows;
  return { toolUserToursSteps: t };
};

export const getToolUserToursStepById = async (id: ToolUserToursStepId) => {
  const { id: toolUserToursStepId } = toolUserToursStepIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(toolUserToursSteps)
    .where(eq(toolUserToursSteps.id, toolUserToursStepId));
  if (row === undefined) return {};
  const t = row;
  return { toolUserToursStep: t };
};
