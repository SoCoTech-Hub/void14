import { db } from "@soco/competency-db/client";
import { and, eq } from "@soco/competency-db";
import { 
  CompetencyTemplateId, 
  NewCompetencyTemplateParams,
  UpdateCompetencyTemplateParams, 
  updateCompetencyTemplateSchema,
  insertCompetencyTemplateSchema, 
  competencyTemplates,
  competencyTemplateIdSchema 
} from "@soco/competency-db/schema/competencyTemplates";
import { getUserAuth } from "@/lib/auth/utils";

export const createCompetencyTemplate = async (competencyTemplate: NewCompetencyTemplateParams) => {
  const { session } = await getUserAuth();
  const newCompetencyTemplate = insertCompetencyTemplateSchema.parse({ ...competencyTemplate, userId: session?.user.id! });
  try {
    const [c] =  await db.insert(competencyTemplates).values(newCompetencyTemplate).returning();
    return { competencyTemplate: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateCompetencyTemplate = async (id: CompetencyTemplateId, competencyTemplate: UpdateCompetencyTemplateParams) => {
  const { session } = await getUserAuth();
  const { id: competencyTemplateId } = competencyTemplateIdSchema.parse({ id });
  const newCompetencyTemplate = updateCompetencyTemplateSchema.parse({ ...competencyTemplate, userId: session?.user.id! });
  try {
    const [c] =  await db
     .update(competencyTemplates)
     .set({...newCompetencyTemplate, updatedAt: new Date() })
     .where(and(eq(competencyTemplates.id, competencyTemplateId!), eq(competencyTemplates.userId, session?.user.id!)))
     .returning();
    return { competencyTemplate: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteCompetencyTemplate = async (id: CompetencyTemplateId) => {
  const { session } = await getUserAuth();
  const { id: competencyTemplateId } = competencyTemplateIdSchema.parse({ id });
  try {
    const [c] =  await db.delete(competencyTemplates).where(and(eq(competencyTemplates.id, competencyTemplateId!), eq(competencyTemplates.userId, session?.user.id!)))
    .returning();
    return { competencyTemplate: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

