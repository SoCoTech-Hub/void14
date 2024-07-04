import { and, eq } from "drizzle-orm";

import { getUserAuth } from "@soco/auth/utils";

import { db } from "../db/index";
import {
  CompetencyTemplateCohortId,
  competencyTemplateCohortIdSchema,
  competencyTemplateCohorts,
  insertCompetencyTemplateCohortSchema,
  NewCompetencyTemplateCohortParams,
  UpdateCompetencyTemplateCohortParams,
  updateCompetencyTemplateCohortSchema,
} from "../db/schema/competencyTemplateCohorts";

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