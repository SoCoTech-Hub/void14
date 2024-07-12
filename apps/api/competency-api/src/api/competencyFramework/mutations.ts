import type {
  CompetencyFrameworkId,
  NewCompetencyFrameworkParams,
  UpdateCompetencyFrameworkParams,
} from "@soco/competency-db/schema/competencyFramework";
import { getUserAuth } from "@soco/auth-service";
import { and, eq } from "@soco/competency-db";
import { db } from "@soco/competency-db/client";
import {
  competencyFramework,
  competencyFrameworkIdSchema,
  insertCompetencyFrameworkSchema,
  updateCompetencyFrameworkSchema,
} from "@soco/competency-db/schema/competencyFramework";

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
