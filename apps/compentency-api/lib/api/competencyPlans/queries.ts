import { db } from "@/lib/db/index";
import { eq, and } from "drizzle-orm";
import { getUserAuth } from "@/lib/auth/utils";
import { type CompetencyPlanId, competencyPlanIdSchema, competencyPlans } from "@/lib/db/schema/competencyPlans";

export const getCompetencyPlans = async () => {
  const { session } = await getUserAuth();
  const rows = await db.select().from(competencyPlans).where(eq(competencyPlans.userId, session?.user.id!));
  const c = rows
  return { competencyPlans: c };
};

export const getCompetencyPlanById = async (id: CompetencyPlanId) => {
  const { session } = await getUserAuth();
  const { id: competencyPlanId } = competencyPlanIdSchema.parse({ id });
  const [row] = await db.select().from(competencyPlans).where(and(eq(competencyPlans.id, competencyPlanId), eq(competencyPlans.userId, session?.user.id!)));
  if (row === undefined) return {};
  const c = row;
  return { competencyPlan: c };
};


