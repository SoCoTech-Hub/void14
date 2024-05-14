import { db } from "@/lib/db/index";
import { eq, and } from "drizzle-orm";
import { getUserAuth } from "@/lib/auth/utils";
import { type CompetencyUserCompId, competencyUserCompIdSchema, competencyUserComps } from "@/lib/db/schema/competencyUserComps";
import { competencies } from "@/lib/db/schema/competencies";

export const getCompetencyUserComps = async () => {
  const { session } = await getUserAuth();
  const rows = await db.select({ competencyUserComp: competencyUserComps, competency: competencies }).from(competencyUserComps).leftJoin(competencies, eq(competencyUserComps.competencyId, competencies.id)).where(eq(competencyUserComps.userId, session?.user.id!));
  const c = rows .map((r) => ({ ...r.competencyUserComp, competency: r.competency})); 
  return { competencyUserComps: c };
};

export const getCompetencyUserCompById = async (id: CompetencyUserCompId) => {
  const { session } = await getUserAuth();
  const { id: competencyUserCompId } = competencyUserCompIdSchema.parse({ id });
  const [row] = await db.select({ competencyUserComp: competencyUserComps, competency: competencies }).from(competencyUserComps).where(and(eq(competencyUserComps.id, competencyUserCompId), eq(competencyUserComps.userId, session?.user.id!))).leftJoin(competencies, eq(competencyUserComps.competencyId, competencies.id));
  if (row === undefined) return {};
  const c =  { ...row.competencyUserComp, competency: row.competency } ;
  return { competencyUserComp: c };
};


