import type {
  CompetencyTemplateCohortId,
  NewCompetencyTemplateCohortParams,
  UpdateCompetencyTemplateCohortParams,
} from "@soco/competency-db/schema/competencyTemplateCohorts";
import { getUserAuth } from "@soco/auth-service";
import { and, eq } from "@soco/competency-db";
import { db } from "@soco/competency-db/client";
import {
  competencyTemplateCohortIdSchema,
  competencyTemplateCohorts,
  insertCompetencyTemplateCohortSchema,
  updateCompetencyTemplateCohortSchema,
} from "@soco/competency-db/schema/competencyTemplateCohorts";

export const createCompetencyTemplateCohort = async (
  competencyTemplateCohort: NewCompetencyTemplateCohortParams,
) => {
  const { session } = await getUserAuth();
  const newCompetencyTemplateCohort =
    insertCompetencyTemplateCohortSchema.parse({
      ...competencyTemplateCohort,
      userId: session?.user.id!,
    });
  try {
    const [c] = await db
      .insert(competencyTemplateCohorts)
      .values(newCompetencyTemplateCohort)
      .returning();
    return { competencyTemplateCohort: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateCompetencyTemplateCohort = async (
  id: CompetencyTemplateCohortId,
  competencyTemplateCohort: UpdateCompetencyTemplateCohortParams,
) => {
  const { session } = await getUserAuth();
  const { id: competencyTemplateCohortId } =
    competencyTemplateCohortIdSchema.parse({ id });
  const newCompetencyTemplateCohort =
    updateCompetencyTemplateCohortSchema.parse({
      ...competencyTemplateCohort,
      userId: session?.user.id!,
    });
  try {
    const [c] = await db
      .update(competencyTemplateCohorts)
      .set({ ...newCompetencyTemplateCohort, updatedAt: new Date() })
      .where(
        and(
          eq(competencyTemplateCohorts.id, competencyTemplateCohortId!),
          eq(competencyTemplateCohorts.userId, session?.user.id!),
        ),
      )
      .returning();
    return { competencyTemplateCohort: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteCompetencyTemplateCohort = async (
  id: CompetencyTemplateCohortId,
) => {
  const { session } = await getUserAuth();
  const { id: competencyTemplateCohortId } =
    competencyTemplateCohortIdSchema.parse({ id });
  try {
    const [c] = await db
      .delete(competencyTemplateCohorts)
      .where(
        and(
          eq(competencyTemplateCohorts.id, competencyTemplateCohortId!),
          eq(competencyTemplateCohorts.userId, session?.user.id!),
        ),
      )
      .returning();
    return { competencyTemplateCohort: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
