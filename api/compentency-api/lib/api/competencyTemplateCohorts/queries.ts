import { db } from "@/lib/db/index";
import { eq, and } from "drizzle-orm";
import { getUserAuth } from "@/lib/auth/utils";
import { type CompetencyTemplateCohortId, competencyTemplateCohortIdSchema, competencyTemplateCohorts } from "@/lib/db/schema/competencyTemplateCohorts";
import { competencyTemplates } from "@/lib/db/schema/competencyTemplates";

export const getCompetencyTemplateCohorts = async () => {
  const { session } = await getUserAuth();
  const rows = await db.select({ competencyTemplateCohort: competencyTemplateCohorts, competencyTemplate: competencyTemplates }).from(competencyTemplateCohorts).leftJoin(competencyTemplates, eq(competencyTemplateCohorts.competencyTemplateId, competencyTemplates.id)).where(eq(competencyTemplateCohorts.userId, session?.user.id!));
  const c = rows .map((r) => ({ ...r.competencyTemplateCohort, competencyTemplate: r.competencyTemplate})); 
  return { competencyTemplateCohorts: c };
};

export const getCompetencyTemplateCohortById = async (id: CompetencyTemplateCohortId) => {
  const { session } = await getUserAuth();
  const { id: competencyTemplateCohortId } = competencyTemplateCohortIdSchema.parse({ id });
  const [row] = await db.select({ competencyTemplateCohort: competencyTemplateCohorts, competencyTemplate: competencyTemplates }).from(competencyTemplateCohorts).where(and(eq(competencyTemplateCohorts.id, competencyTemplateCohortId), eq(competencyTemplateCohorts.userId, session?.user.id!))).leftJoin(competencyTemplates, eq(competencyTemplateCohorts.competencyTemplateId, competencyTemplates.id));
  if (row === undefined) return {};
  const c =  { ...row.competencyTemplateCohort, competencyTemplate: row.competencyTemplate } ;
  return { competencyTemplateCohort: c };
};


