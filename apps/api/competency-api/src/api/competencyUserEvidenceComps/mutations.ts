import { and, eq } from "drizzle-orm";

import { getUserAuth } from "@soco/auth-services";
import { db } from "@soco/competency-db/index";
import {
  CompetencyUserEvidenceCompId,
  competencyUserEvidenceCompIdSchema,
  competencyUserEvidenceComps,
  insertCompetencyUserEvidenceCompSchema,
  NewCompetencyUserEvidenceCompParams,
  UpdateCompetencyUserEvidenceCompParams,
  updateCompetencyUserEvidenceCompSchema,
} from "@soco/competency-db/schema/competencyUserEvidenceComps";

export const createCompetencyUserEvidenceComp = async (
  competencyUserEvidenceComp: NewCompetencyUserEvidenceCompParams,
) => {
  const { session } = await getUserAuth();
  const newCompetencyUserEvidenceComp =
    insertCompetencyUserEvidenceCompSchema.parse({
      ...competencyUserEvidenceComp,
      userId: session?.user.id!,
    });
  try {
    const [c] = await db
      .insert(competencyUserEvidenceComps)
      .values(newCompetencyUserEvidenceComp)
      .returning();
    return { competencyUserEvidenceComp: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateCompetencyUserEvidenceComp = async (
  id: CompetencyUserEvidenceCompId,
  competencyUserEvidenceComp: UpdateCompetencyUserEvidenceCompParams,
) => {
  const { session } = await getUserAuth();
  const { id: competencyUserEvidenceCompId } =
    competencyUserEvidenceCompIdSchema.parse({ id });
  const newCompetencyUserEvidenceComp =
    updateCompetencyUserEvidenceCompSchema.parse({
      ...competencyUserEvidenceComp,
      userId: session?.user.id!,
    });
  try {
    const [c] = await db
      .update(competencyUserEvidenceComps)
      .set({ ...newCompetencyUserEvidenceComp, updatedAt: new Date() })
      .where(
        and(
          eq(competencyUserEvidenceComps.id, competencyUserEvidenceCompId!),
          eq(competencyUserEvidenceComps.userId, session?.user.id!),
        ),
      )
      .returning();
    return { competencyUserEvidenceComp: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteCompetencyUserEvidenceComp = async (
  id: CompetencyUserEvidenceCompId,
) => {
  const { session } = await getUserAuth();
  const { id: competencyUserEvidenceCompId } =
    competencyUserEvidenceCompIdSchema.parse({ id });
  try {
    const [c] = await db
      .delete(competencyUserEvidenceComps)
      .where(
        and(
          eq(competencyUserEvidenceComps.id, competencyUserEvidenceCompId!),
          eq(competencyUserEvidenceComps.userId, session?.user.id!),
        ),
      )
      .returning();
    return { competencyUserEvidenceComp: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
