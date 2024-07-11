import { getUserAuth } from "@soco/auth-service";
import { and, eq } from "@soco/competency-db";
import { db } from "@soco/competency-db/client";
import {
  CompetencyUserCompPlanId,
  competencyUserCompPlanIdSchema,
  competencyUserCompPlans,
  insertCompetencyUserCompPlanSchema,
  NewCompetencyUserCompPlanParams,
  UpdateCompetencyUserCompPlanParams,
  updateCompetencyUserCompPlanSchema,
} from "@soco/competency-db/schema/competencyUserCompPlans";

export const createCompetencyUserCompPlan = async (
  competencyUserCompPlan: NewCompetencyUserCompPlanParams,
) => {
  const { session } = await getUserAuth();
  const newCompetencyUserCompPlan = insertCompetencyUserCompPlanSchema.parse({
    ...competencyUserCompPlan,
    userId: session?.user.id!,
  });
  try {
    const [c] = await db
      .insert(competencyUserCompPlans)
      .values(newCompetencyUserCompPlan)
      .returning();
    return { competencyUserCompPlan: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateCompetencyUserCompPlan = async (
  id: CompetencyUserCompPlanId,
  competencyUserCompPlan: UpdateCompetencyUserCompPlanParams,
) => {
  const { session } = await getUserAuth();
  const { id: competencyUserCompPlanId } = competencyUserCompPlanIdSchema.parse(
    { id },
  );
  const newCompetencyUserCompPlan = updateCompetencyUserCompPlanSchema.parse({
    ...competencyUserCompPlan,
    userId: session?.user.id!,
  });
  try {
    const [c] = await db
      .update(competencyUserCompPlans)
      .set({ ...newCompetencyUserCompPlan, updatedAt: new Date() })
      .where(
        and(
          eq(competencyUserCompPlans.id, competencyUserCompPlanId!),
          eq(competencyUserCompPlans.userId, session?.user.id!),
        ),
      )
      .returning();
    return { competencyUserCompPlan: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteCompetencyUserCompPlan = async (
  id: CompetencyUserCompPlanId,
) => {
  const { session } = await getUserAuth();
  const { id: competencyUserCompPlanId } = competencyUserCompPlanIdSchema.parse(
    { id },
  );
  try {
    const [c] = await db
      .delete(competencyUserCompPlans)
      .where(
        and(
          eq(competencyUserCompPlans.id, competencyUserCompPlanId!),
          eq(competencyUserCompPlans.userId, session?.user.id!),
        ),
      )
      .returning();
    return { competencyUserCompPlan: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
