import { db } from "@soco/competency-db/client";
import { eq, and } from "@soco/competency-db";
import { getUserAuth } from "@soco/auth-service";
import { type CompetencyPlanCompId, competencyPlanCompIdSchema, competencyPlanComps } from "@soco/competency-db/schema/competencyPlanComps";
import { competencies } from "@soco/competency-db/schema/competencies";
import { competencyPlans } from "@soco/competency-db/schema/competencyPlans";

export const getCompetencyPlanComps = async () => {
  const { session } = await getUserAuth();
  const rows = await db.select({ competencyPlanComp: competencyPlanComps, competency: competencies, competencyPlan: competencyPlans }).from(competencyPlanComps).leftJoin(competencies, eq(competencyPlanComps.competencyId, competencies.id)).leftJoin(competencyPlans, eq(competencyPlanComps.competencyPlanId, competencyPlans.id)).where(eq(competencyPlanComps.userId, session?.user.id!));
  const c = rows .map((r) => ({ ...r.competencyPlanComp, competency: r.competency, competencyPlan: r.competencyPlan})); 
  return { competencyPlanComps: c };
};

export const getCompetencyPlanCompById = async (id: CompetencyPlanCompId) => {
  const { session } = await getUserAuth();
  const { id: competencyPlanCompId } = competencyPlanCompIdSchema.parse({ id });
  const [row] = await db.select({ competencyPlanComp: competencyPlanComps, competency: competencies, competencyPlan: competencyPlans }).from(competencyPlanComps).where(and(eq(competencyPlanComps.id, competencyPlanCompId), eq(competencyPlanComps.userId, session?.user.id!))).leftJoin(competencies, eq(competencyPlanComps.competencyId, competencies.id)).leftJoin(competencyPlans, eq(competencyPlanComps.competencyPlanId, competencyPlans.id));
  if (row === undefined) return {};
  const c =  { ...row.competencyPlanComp, competency: row.competency, competencyPlan: row.competencyPlan } ;
  return { competencyPlanComp: c };
};


