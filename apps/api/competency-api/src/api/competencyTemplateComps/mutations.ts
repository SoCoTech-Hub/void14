import { getUserAuth } from "@soco/auth-service";
import { and, eq } from "@soco/competency-db";
import { db } from "@soco/competency-db/client";
import {
  CompetencyTemplateCompId,
  competencyTemplateCompIdSchema,
  competencyTemplateComps,
  insertCompetencyTemplateCompSchema,
  NewCompetencyTemplateCompParams,
  UpdateCompetencyTemplateCompParams,
  updateCompetencyTemplateCompSchema,
} from "@soco/competency-db/schema/competencyTemplateComps";

export const createCompetencyTemplateComp = async (
  competencyTemplateComp: NewCompetencyTemplateCompParams,
) => {
  const { session } = await getUserAuth();
  const newCompetencyTemplateComp = insertCompetencyTemplateCompSchema.parse({
    ...competencyTemplateComp,
    userId: session?.user.id!,
  });
  try {
    const [c] = await db
      .insert(competencyTemplateComps)
      .values(newCompetencyTemplateComp)
      .returning();
    return { competencyTemplateComp: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateCompetencyTemplateComp = async (
  id: CompetencyTemplateCompId,
  competencyTemplateComp: UpdateCompetencyTemplateCompParams,
) => {
  const { session } = await getUserAuth();
  const { id: competencyTemplateCompId } = competencyTemplateCompIdSchema.parse(
    { id },
  );
  const newCompetencyTemplateComp = updateCompetencyTemplateCompSchema.parse({
    ...competencyTemplateComp,
    userId: session?.user.id!,
  });
  try {
    const [c] = await db
      .update(competencyTemplateComps)
      .set({ ...newCompetencyTemplateComp, updatedAt: new Date() })
      .where(
        and(
          eq(competencyTemplateComps.id, competencyTemplateCompId!),
          eq(competencyTemplateComps.userId, session?.user.id!),
        ),
      )
      .returning();
    return { competencyTemplateComp: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteCompetencyTemplateComp = async (
  id: CompetencyTemplateCompId,
) => {
  const { session } = await getUserAuth();
  const { id: competencyTemplateCompId } = competencyTemplateCompIdSchema.parse(
    { id },
  );
  try {
    const [c] = await db
      .delete(competencyTemplateComps)
      .where(
        and(
          eq(competencyTemplateComps.id, competencyTemplateCompId!),
          eq(competencyTemplateComps.userId, session?.user.id!),
        ),
      )
      .returning();
    return { competencyTemplateComp: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
