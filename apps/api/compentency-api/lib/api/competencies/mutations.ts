import { and, eq } from "drizzle-orm";

import { getUserAuth } from "@soco/auth/utils";

import { db } from "../../db/index";
import {
  competencies,
  CompetencyId,
  competencyIdSchema,
  insertCompetencySchema,
  NewCompetencyParams,
  UpdateCompetencyParams,
  updateCompetencySchema,
} from "../../db/schema/competencies";

export const createCompetency = async (competency: NewCompetencyParams) => {
  const { session } = await getUserAuth();
  const newCompetency = insertCompetencySchema.parse({
    ...competency,
    userId: session?.user.id!,
  });
  try {
    const [c] = await db.insert(competencies).values(newCompetency).returning();
    return { competency: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateCompetency = async (
  id: CompetencyId,
  competency: UpdateCompetencyParams,
) => {
  const { session } = await getUserAuth();
  const { id: competencyId } = competencyIdSchema.parse({ id });
  const newCompetency = updateCompetencySchema.parse({
    ...competency,
    userId: session?.user.id!,
  });
  try {
    const [c] = await db
      .update(competencies)
      .set({ ...newCompetency, updatedAt: new Date() })
      .where(
        and(
          eq(competencies.id, competencyId!),
          eq(competencies.userId, session?.user.id!),
        ),
      )
      .returning();
    return { competency: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteCompetency = async (id: CompetencyId) => {
  const { session } = await getUserAuth();
  const { id: competencyId } = competencyIdSchema.parse({ id });
  try {
    const [c] = await db
      .delete(competencies)
      .where(
        and(
          eq(competencies.id, competencyId!),
          eq(competencies.userId, session?.user.id!),
        ),
      )
      .returning();
    return { competency: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
