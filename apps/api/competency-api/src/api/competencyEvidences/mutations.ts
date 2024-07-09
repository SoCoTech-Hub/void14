import type {
  CompetencyEvidenceId,
  NewCompetencyEvidenceParams,
  UpdateCompetencyEvidenceParams,
} from "@soco/competency-db/schema/competencyEvidences";
import { getUserAuth } from "@soco/auth-services";
import { and, db, eq } from "@soco/competency-db";
import {
  competencyEvidenceIdSchema,
  competencyEvidences,
  insertCompetencyEvidenceSchema,
  updateCompetencyEvidenceSchema,
} from "@soco/competency-db/schema/competencyEvidences";

export const createCompetencyEvidence = async (
  competencyEvidence: NewCompetencyEvidenceParams,
) => {
  const { session } = await getUserAuth();
  const newCompetencyEvidence = insertCompetencyEvidenceSchema.parse({
    ...competencyEvidence,
    userId: session?.user.id!,
  });
  try {
    const [c] = await db
      .insert(competencyEvidences)
      .values(newCompetencyEvidence)
      .returning();
    return { competencyEvidence: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateCompetencyEvidence = async (
  id: CompetencyEvidenceId,
  competencyEvidence: UpdateCompetencyEvidenceParams,
) => {
  const { session } = await getUserAuth();
  const { id: competencyEvidenceId } = competencyEvidenceIdSchema.parse({ id });
  const newCompetencyEvidence = updateCompetencyEvidenceSchema.parse({
    ...competencyEvidence,
    userId: session?.user.id!,
  });
  try {
    const [c] = await db
      .update(competencyEvidences)
      .set({ ...newCompetencyEvidence, updatedAt: new Date() })
      .where(
        and(
          eq(competencyEvidences.id, competencyEvidenceId!),
          eq(competencyEvidences.userId, session?.user.id!),
        ),
      )
      .returning();
    return { competencyEvidence: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteCompetencyEvidence = async (id: CompetencyEvidenceId) => {
  const { session } = await getUserAuth();
  const { id: competencyEvidenceId } = competencyEvidenceIdSchema.parse({ id });
  try {
    const [c] = await db
      .delete(competencyEvidences)
      .where(
        and(
          eq(competencyEvidences.id, competencyEvidenceId!),
          eq(competencyEvidences.userId, session?.user.id!),
        ),
      )
      .returning();
    return { competencyEvidence: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
