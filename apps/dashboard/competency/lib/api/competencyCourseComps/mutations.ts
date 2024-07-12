import { db } from "@/lib/db/index";
import { and, eq } from "drizzle-orm";
import { 
  type CompetencyCourseCompId, 
  type NewCompetencyCourseCompParams,
  type UpdateCompetencyCourseCompParams, 
  updateCompetencyCourseCompSchema,
  insertCompetencyCourseCompSchema, 
  competencyCourseComps,
  competencyCourseCompIdSchema 
} from "@/lib/db/schema/competencyCourseComps";
import { getUserAuth } from "@/lib/auth/utils";

export const createCompetencyCourseComp = async (competencyCourseComp: NewCompetencyCourseCompParams) => {
  const { session } = await getUserAuth();
  const newCompetencyCourseComp = insertCompetencyCourseCompSchema.parse({ ...competencyCourseComp, userId: session?.user.id! });
  try {
    const [c] =  await db.insert(competencyCourseComps).values(newCompetencyCourseComp).returning();
    return { competencyCourseComp: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateCompetencyCourseComp = async (id: CompetencyCourseCompId, competencyCourseComp: UpdateCompetencyCourseCompParams) => {
  const { session } = await getUserAuth();
  const { id: competencyCourseCompId } = competencyCourseCompIdSchema.parse({ id });
  const newCompetencyCourseComp = updateCompetencyCourseCompSchema.parse({ ...competencyCourseComp, userId: session?.user.id! });
  try {
    const [c] =  await db
     .update(competencyCourseComps)
     .set({...newCompetencyCourseComp, updatedAt: new Date() })
     .where(and(eq(competencyCourseComps.id, competencyCourseCompId!), eq(competencyCourseComps.userId, session?.user.id!)))
     .returning();
    return { competencyCourseComp: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteCompetencyCourseComp = async (id: CompetencyCourseCompId) => {
  const { session } = await getUserAuth();
  const { id: competencyCourseCompId } = competencyCourseCompIdSchema.parse({ id });
  try {
    const [c] =  await db.delete(competencyCourseComps).where(and(eq(competencyCourseComps.id, competencyCourseCompId!), eq(competencyCourseComps.userId, session?.user.id!)))
    .returning();
    return { competencyCourseComp: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

