import { db } from "@/lib/db/index";
import { and, eq } from "drizzle-orm";
import { 
  CompetencyUserCompId, 
  NewCompetencyUserCompParams,
  UpdateCompetencyUserCompParams, 
  updateCompetencyUserCompSchema,
  insertCompetencyUserCompSchema, 
  competencyUserComps,
  competencyUserCompIdSchema 
} from "@/lib/db/schema/competencyUserComps";
import { getUserAuth } from "@/lib/auth/utils";

export const createCompetencyUserComp = async (competencyUserComp: NewCompetencyUserCompParams) => {
  const { session } = await getUserAuth();
  const newCompetencyUserComp = insertCompetencyUserCompSchema.parse({ ...competencyUserComp, userId: session?.user.id! });
  try {
    const [c] =  await db.insert(competencyUserComps).values(newCompetencyUserComp).returning();
    return { competencyUserComp: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateCompetencyUserComp = async (id: CompetencyUserCompId, competencyUserComp: UpdateCompetencyUserCompParams) => {
  const { session } = await getUserAuth();
  const { id: competencyUserCompId } = competencyUserCompIdSchema.parse({ id });
  const newCompetencyUserComp = updateCompetencyUserCompSchema.parse({ ...competencyUserComp, userId: session?.user.id! });
  try {
    const [c] =  await db
     .update(competencyUserComps)
     .set({...newCompetencyUserComp, updatedAt: new Date() })
     .where(and(eq(competencyUserComps.id, competencyUserCompId!), eq(competencyUserComps.userId, session?.user.id!)))
     .returning();
    return { competencyUserComp: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteCompetencyUserComp = async (id: CompetencyUserCompId) => {
  const { session } = await getUserAuth();
  const { id: competencyUserCompId } = competencyUserCompIdSchema.parse({ id });
  try {
    const [c] =  await db.delete(competencyUserComps).where(and(eq(competencyUserComps.id, competencyUserCompId!), eq(competencyUserComps.userId, session?.user.id!)))
    .returning();
    return { competencyUserComp: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

