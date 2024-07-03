import { db } from "@/lib/db/index";
import { and, eq } from "drizzle-orm";
import { 
  CompetencyModuleCompId, 
  NewCompetencyModuleCompParams,
  UpdateCompetencyModuleCompParams, 
  updateCompetencyModuleCompSchema,
  insertCompetencyModuleCompSchema, 
  competencyModuleComps,
  competencyModuleCompIdSchema 
} from "@/lib/db/schema/competencyModuleComps";
import { getUserAuth } from "@/lib/auth/utils";

export const createCompetencyModuleComp = async (competencyModuleComp: NewCompetencyModuleCompParams) => {
  const { session } = await getUserAuth();
  const newCompetencyModuleComp = insertCompetencyModuleCompSchema.parse({ ...competencyModuleComp, userId: session?.user.id! });
  try {
    const [c] =  await db.insert(competencyModuleComps).values(newCompetencyModuleComp).returning();
    return { competencyModuleComp: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateCompetencyModuleComp = async (id: CompetencyModuleCompId, competencyModuleComp: UpdateCompetencyModuleCompParams) => {
  const { session } = await getUserAuth();
  const { id: competencyModuleCompId } = competencyModuleCompIdSchema.parse({ id });
  const newCompetencyModuleComp = updateCompetencyModuleCompSchema.parse({ ...competencyModuleComp, userId: session?.user.id! });
  try {
    const [c] =  await db
     .update(competencyModuleComps)
     .set({...newCompetencyModuleComp, updatedAt: new Date() })
     .where(and(eq(competencyModuleComps.id, competencyModuleCompId!), eq(competencyModuleComps.userId, session?.user.id!)))
     .returning();
    return { competencyModuleComp: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteCompetencyModuleComp = async (id: CompetencyModuleCompId) => {
  const { session } = await getUserAuth();
  const { id: competencyModuleCompId } = competencyModuleCompIdSchema.parse({ id });
  try {
    const [c] =  await db.delete(competencyModuleComps).where(and(eq(competencyModuleComps.id, competencyModuleCompId!), eq(competencyModuleComps.userId, session?.user.id!)))
    .returning();
    return { competencyModuleComp: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

