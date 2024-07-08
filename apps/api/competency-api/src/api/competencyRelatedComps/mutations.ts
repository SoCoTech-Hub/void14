import { db } from "@soco/competency-db/index";
import { and, eq } from "drizzle-orm";
import { 
  CompetencyRelatedCompId, 
  NewCompetencyRelatedCompParams,
  UpdateCompetencyRelatedCompParams, 
  updateCompetencyRelatedCompSchema,
  insertCompetencyRelatedCompSchema, 
  competencyRelatedComps,
  competencyRelatedCompIdSchema 
} from "@soco/competency-db/schema/competencyRelatedComps";
import { getUserAuth } from "@/lib/auth/utils";

export const createCompetencyRelatedComp = async (competencyRelatedComp: NewCompetencyRelatedCompParams) => {
  const { session } = await getUserAuth();
  const newCompetencyRelatedComp = insertCompetencyRelatedCompSchema.parse({ ...competencyRelatedComp, userId: session?.user.id! });
  try {
    const [c] =  await db.insert(competencyRelatedComps).values(newCompetencyRelatedComp).returning();
    return { competencyRelatedComp: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateCompetencyRelatedComp = async (id: CompetencyRelatedCompId, competencyRelatedComp: UpdateCompetencyRelatedCompParams) => {
  const { session } = await getUserAuth();
  const { id: competencyRelatedCompId } = competencyRelatedCompIdSchema.parse({ id });
  const newCompetencyRelatedComp = updateCompetencyRelatedCompSchema.parse({ ...competencyRelatedComp, userId: session?.user.id! });
  try {
    const [c] =  await db
     .update(competencyRelatedComps)
     .set({...newCompetencyRelatedComp, updatedAt: new Date() })
     .where(and(eq(competencyRelatedComps.id, competencyRelatedCompId!), eq(competencyRelatedComps.userId, session?.user.id!)))
     .returning();
    return { competencyRelatedComp: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteCompetencyRelatedComp = async (id: CompetencyRelatedCompId) => {
  const { session } = await getUserAuth();
  const { id: competencyRelatedCompId } = competencyRelatedCompIdSchema.parse({ id });
  try {
    const [c] =  await db.delete(competencyRelatedComps).where(and(eq(competencyRelatedComps.id, competencyRelatedCompId!), eq(competencyRelatedComps.userId, session?.user.id!)))
    .returning();
    return { competencyRelatedComp: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

