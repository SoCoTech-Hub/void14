import type {
  CompetencyUserEvidenceId,
  NewCompetencyUserEvidenceParams,
  UpdateCompetencyUserEvidenceParams,
} from "@soco/competency-db/schema/competencyUserEvidences";
import { getUserAuth } from "@soco/auth-services";
import { and, db, eq } from "@soco/competency-db";
import {
  competencyUserEvidenceIdSchema,
  competencyUserEvidences,
  insertCompetencyUserEvidenceSchema,
  updateCompetencyUserEvidenceSchema,
} from "@soco/competency-db/schema/competencyUserEvidences";

export const createCompetencyUserEvidence = async (
  competencyUserEvidence: NewCompetencyUserEvidenceParams,
) => {
  const { session } = await getUserAuth();
  const newCompetencyUserEvidence = insertCompetencyUserEvidenceSchema.parse({
    ...competencyUserEvidence,
    userId: session?.user.id!,
  });
  try {
    const [c] = await db
      .insert(competencyUserEvidences)
      .values(newCompetencyUserEvidence)
      .returning();
    return { competencyUserEvidence: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateCompetencyUserEvidence = async (
  id: CompetencyUserEvidenceId,
  competencyUserEvidence: UpdateCompetencyUserEvidenceParams,
) => {
  const { session } = await getUserAuth();
  const { id: competencyUserEvidenceId } = competencyUserEvidenceIdSchema.parse(
    { id },
  );
  const newCompetencyUserEvidence = updateCompetencyUserEvidenceSchema.parse({
    ...competencyUserEvidence,
    userId: session?.user.id!,
  });
  try {
    const [c] = await db
      .update(competencyUserEvidences)
      .set({ ...newCompetencyUserEvidence, updatedAt: new Date() })
      .where(
        and(
          eq(competencyUserEvidences.id, competencyUserEvidenceId!),
          eq(competencyUserEvidences.userId, session?.user.id!),
        ),
      )
      .returning();
    return { competencyUserEvidence: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteCompetencyUserEvidence = async (
  id: CompetencyUserEvidenceId,
) => {
  const { session } = await getUserAuth();
  const { id: competencyUserEvidenceId } = competencyUserEvidenceIdSchema.parse(
    { id },
  );
  try {
    const [c] = await db
      .delete(competencyUserEvidences)
      .where(
        and(
          eq(competencyUserEvidences.id, competencyUserEvidenceId!),
          eq(competencyUserEvidences.userId, session?.user.id!),
        ),
      )
      .returning();
    return { competencyUserEvidence: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
