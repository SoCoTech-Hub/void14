import { db } from "@/lib/db/index";
import { eq, and } from "drizzle-orm";
import { getUserAuth } from "@soco/auth/utils";
import { type CompetencyTemplateId, competencyTemplateIdSchema, competencyTemplates } from "@/lib/db/schema/competencyTemplates";

export const getCompetencyTemplates = async () => {
  const { session } = await getUserAuth();
  const rows = await db.select().from(competencyTemplates).where(eq(competencyTemplates.userId, session?.user.id!));
  const c = rows
  return { competencyTemplates: c };
};

export const getCompetencyTemplateById = async (id: CompetencyTemplateId) => {
  const { session } = await getUserAuth();
  const { id: competencyTemplateId } = competencyTemplateIdSchema.parse({ id });
  const [row] = await db.select().from(competencyTemplates).where(and(eq(competencyTemplates.id, competencyTemplateId), eq(competencyTemplates.userId, session?.user.id!)));
  if (row === undefined) return {};
  const c = row;
  return { competencyTemplate: c };
};


