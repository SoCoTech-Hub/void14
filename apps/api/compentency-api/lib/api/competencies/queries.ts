import { db } from "@/lib/db/index";
import { eq, and } from "drizzle-orm";
import { getUserAuth } from "@/lib/auth/utils";
import { type CompetencyId, competencyIdSchema, competencies } from "@/lib/db/schema/competencies";
import { competencyFrameworks } from "@/lib/db/schema/competencyFrameworks";

export const getCompetencies = async () => {
  const { session } = await getUserAuth();
  const rows = await db.select({ competency: competencies, competencyFramework: competencyFrameworks }).from(competencies).leftJoin(competencyFrameworks, eq(competencies.competencyFrameworkId, competencyFrameworks.id)).where(eq(competencies.userId, session?.user.id!));
  const c = rows .map((r) => ({ ...r.competency, competencyFramework: r.competencyFramework})); 
  return { competencies: c };
};

export const getCompetencyById = async (id: CompetencyId) => {
  const { session } = await getUserAuth();
  const { id: competencyId } = competencyIdSchema.parse({ id });
  const [row] = await db.select({ competency: competencies, competencyFramework: competencyFrameworks }).from(competencies).where(and(eq(competencies.id, competencyId), eq(competencies.userId, session?.user.id!))).leftJoin(competencyFrameworks, eq(competencies.competencyFrameworkId, competencyFrameworks.id));
  if (row === undefined) return {};
  const c =  { ...row.competency, competencyFramework: row.competencyFramework } ;
  return { competency: c };
};


