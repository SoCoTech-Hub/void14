import { db } from "@/lib/db/index";
import { and, eq } from "drizzle-orm";
import { 
  CompetencyPlanCompId, 
  NewCompetencyPlanCompParams,
  UpdateCompetencyPlanCompParams, 
  updateCompetencyPlanCompSchema,
  insertCompetencyPlanCompSchema, 
  competencyPlanComps,
  competencyPlanCompIdSchema 
} from "@/lib/db/schema/competencyPlanComps";
import { getUserAuth } from "@/lib/auth/utils";

export const createCompetencyPlanComp = async (competencyPlanComp: NewCompetencyPlanCompParams) => {
  const { session } = await getUserAuth();
  const newCompetencyPlanComp = insertCompetencyPlanCompSchema.parse({ ...competencyPlanComp, userId: session?.user.id! });
  try {
    const [c] =  await db.insert(competencyPlanComps).values(newCompetencyPlanComp).returning();
    return { competencyPlanComp: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateCompetencyPlanComp = async (id: CompetencyPlanCompId, competencyPlanComp: UpdateCompetencyPlanCompParams) => {
  const { session } = await getUserAuth();
  const { id: competencyPlanCompId } = competencyPlanCompIdSchema.parse({ id });
  const newCompetencyPlanComp = updateCompetencyPlanCompSchema.parse({ ...competencyPlanComp, userId: session?.user.id! });
  try {
    const [c] =  await db
     .update(competencyPlanComps)
     .set({...newCompetencyPlanComp, updatedAt: new Date() })
     .where(and(eq(competencyPlanComps.id, competencyPlanCompId!), eq(competencyPlanComps.userId, session?.user.id!)))
     .returning();
    return { competencyPlanComp: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteCompetencyPlanComp = async (id: CompetencyPlanCompId) => {
  const { session } = await getUserAuth();
  const { id: competencyPlanCompId } = competencyPlanCompIdSchema.parse({ id });
  try {
    const [c] =  await db.delete(competencyPlanComps).where(and(eq(competencyPlanComps.id, competencyPlanCompId!), eq(competencyPlanComps.userId, session?.user.id!)))
    .returning();
    return { competencyPlanComp: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

