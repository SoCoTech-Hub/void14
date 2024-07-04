import { and, eq } from "drizzle-orm";

import { getUserAuth } from "@soco/auth/utils";

import { db } from "../db/index";
import {
  competencyFramework,
  CompetencyFrameworkId,
  competencyFrameworkIdSchema,
  insertCompetencyFrameworkSchema,
  NewCompetencyFrameworkParams,
  UpdateCompetencyFrameworkParams,
  updateCompetencyFrameworkSchema,
} from "../db/schema/competencyFramework";

export const createCompetencyFramework = async (
  competencyFramework: NewCompetencyFrameworkParams,
) => {
  const { session } = await getUserAuth();
  const newCompetencyFramework = insertCompetencyFrameworkSchema.parse({
    ...competencyFramework,
    userId: session?.user.id!,
  });
  try {
    const [c] = await db
      .insert(competencyFramework)
      .values(newCompetencyFramework)
      .returning();
    return { competencyFramework: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateCompetencyFramework = async (
  id: CompetencyFrameworkId,
  competencyFramework: UpdateCompetencyFrameworkParams,
) => {
  const { session } = await getUserAuth();
  const { id: competencyFrameworkId } = competencyFrameworkIdSchema.parse({
    id,
  });
  const newCompetencyFramework = updateCompetencyFrameworkSchema.parse({
    ...competencyFramework,
    userId: session?.user.id!,
  });
  try {
    const [c] = await db
      .update(competencyFramework)
      .set({ ...newCompetencyFramework, updatedAt: new Date() })
      .where(
        and(
          eq(competencyFramework.id, competencyFrameworkId!),
          eq(competencyFramework.userId, session?.user.id!),
        ),
      )
      .returning();
    return { competencyFramework: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteCompetencyFramework = async (id: CompetencyFrameworkId) => {
  const { session } = await getUserAuth();
  const { id: competencyFrameworkId } = competencyFrameworkIdSchema.parse({
    id,
  });
  try {
    const [c] = await db
      .delete(competencyFramework)
      .where(
        and(
          eq(competencyFramework.id, competencyFrameworkId!),
          eq(competencyFramework.userId, session?.user.id!),
        ),
      )
      .returning();
    return { competencyFramework: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
