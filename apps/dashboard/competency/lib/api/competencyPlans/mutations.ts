import { db } from "@/lib/db/index";
import { and, eq } from "drizzle-orm";
import { 
  type CompetencyPlanId, 
  type NewCompetencyPlanParams,
  type UpdateCompetencyPlanParams, 
  updateCompetencyPlanSchema,
  insertCompetencyPlanSchema, 
  competencyPlans,
  competencyPlanIdSchema 
} from "@/lib/db/schema/competencyPlans";
import { getUserAuth } from "@/lib/auth/utils";

export const createCompetencyPlan = async (competencyPlan: NewCompetencyPlanParams) => {
  const { session } = await getUserAuth();
  const newCompetencyPlan = insertCompetencyPlanSchema.parse({ ...competencyPlan, userId: session?.user.id! });
  try {
    const [c] =  await db.insert(competencyPlans).values(newCompetencyPlan).returning();
    return { competencyPlan: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateCompetencyPlan = async (id: CompetencyPlanId, competencyPlan: UpdateCompetencyPlanParams) => {
  const { session } = await getUserAuth();
  const { id: competencyPlanId } = competencyPlanIdSchema.parse({ id });
  const newCompetencyPlan = updateCompetencyPlanSchema.parse({ ...competencyPlan, userId: session?.user.id! });
  try {
    const [c] =  await db
     .update(competencyPlans)
     .set({...newCompetencyPlan, updatedAt: new Date() })
     .where(and(eq(competencyPlans.id, competencyPlanId!), eq(competencyPlans.userId, session?.user.id!)))
     .returning();
    return { competencyPlan: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteCompetencyPlan = async (id: CompetencyPlanId) => {
  const { session } = await getUserAuth();
  const { id: competencyPlanId } = competencyPlanIdSchema.parse({ id });
  try {
    const [c] =  await db.delete(competencyPlans).where(and(eq(competencyPlans.id, competencyPlanId!), eq(competencyPlans.userId, session?.user.id!)))
    .returning();
    return { competencyPlan: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

