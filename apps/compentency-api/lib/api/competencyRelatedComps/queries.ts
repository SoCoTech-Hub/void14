import { db } from "@/lib/db/index";
import { eq, and } from "drizzle-orm";
import { getUserAuth } from "@/lib/auth/utils";
import { type CompetencyRelatedCompId, competencyRelatedCompIdSchema, competencyRelatedComps } from "@/lib/db/schema/competencyRelatedComps";
import { competencies } from "@/lib/db/schema/competencies";

export const getCompetencyRelatedComps = async () => {
  const { session } = await getUserAuth();
  const rows = await db.select({ competencyRelatedComp: competencyRelatedComps, competency: competencies }).from(competencyRelatedComps).leftJoin(competencies, eq(competencyRelatedComps.competencyId, competencies.id)).where(eq(competencyRelatedComps.userId, session?.user.id!));
  const c = rows .map((r) => ({ ...r.competencyRelatedComp, competency: r.competency})); 
  return { competencyRelatedComps: c };
};

export const getCompetencyRelatedCompById = async (id: CompetencyRelatedCompId) => {
  const { session } = await getUserAuth();
  const { id: competencyRelatedCompId } = competencyRelatedCompIdSchema.parse({ id });
  const [row] = await db.select({ competencyRelatedComp: competencyRelatedComps, competency: competencies }).from(competencyRelatedComps).where(and(eq(competencyRelatedComps.id, competencyRelatedCompId), eq(competencyRelatedComps.userId, session?.user.id!))).leftJoin(competencies, eq(competencyRelatedComps.competencyId, competencies.id));
  if (row === undefined) return {};
  const c =  { ...row.competencyRelatedComp, competency: row.competency } ;
  return { competencyRelatedComp: c };
};


