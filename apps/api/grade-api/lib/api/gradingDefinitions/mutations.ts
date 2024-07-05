import { and, eq } from "drizzle-orm";

import { getUserAuth } from "@soco/auth/utils";

import { db } from "../../db/index";
import {
  GradingDefinitionId,
  gradingDefinitionIdSchema,
  gradingDefinitions,
  insertGradingDefinitionSchema,
  NewGradingDefinitionParams,
  UpdateGradingDefinitionParams,
  updateGradingDefinitionSchema,
} from "../../db/schema/gradingDefinitions";

export const createGradingDefinition = async (
  gradingDefinition: NewGradingDefinitionParams,
) => {
  const { session } = await getUserAuth();
  const newGradingDefinition = insertGradingDefinitionSchema.parse({
    ...gradingDefinition,
    userId: session?.user.id!,
  });
  try {
    const [g] = await db
      .insert(gradingDefinitions)
      .values(newGradingDefinition)
      .returning();
    return { gradingDefinition: g };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateGradingDefinition = async (
  id: GradingDefinitionId,
  gradingDefinition: UpdateGradingDefinitionParams,
) => {
  const { session } = await getUserAuth();
  const { id: gradingDefinitionId } = gradingDefinitionIdSchema.parse({ id });
  const newGradingDefinition = updateGradingDefinitionSchema.parse({
    ...gradingDefinition,
    userId: session?.user.id!,
  });
  try {
    const [g] = await db
      .update(gradingDefinitions)
      .set({ ...newGradingDefinition, updatedAt: new Date() })
      .where(
        and(
          eq(gradingDefinitions.id, gradingDefinitionId!),
          eq(gradingDefinitions.userId, session?.user.id!),
        ),
      )
      .returning();
    return { gradingDefinition: g };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteGradingDefinition = async (id: GradingDefinitionId) => {
  const { session } = await getUserAuth();
  const { id: gradingDefinitionId } = gradingDefinitionIdSchema.parse({ id });
  try {
    const [g] = await db
      .delete(gradingDefinitions)
      .where(
        and(
          eq(gradingDefinitions.id, gradingDefinitionId!),
          eq(gradingDefinitions.userId, session?.user.id!),
        ),
      )
      .returning();
    return { gradingDefinition: g };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
