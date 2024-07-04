import { db } from "@/lib/db/index";
import { and, eq } from "drizzle-orm";
import { 
  CompetencyFrameworkId, 
  NewCompetencyFrameworkParams,
  UpdateCompetencyFrameworkParams, 
  updateCompetencyFrameworkSchema,
  insertCompetencyFrameworkSchema, 
  competencyFrameworks,
  competencyFrameworkIdSchema 
} from "@/lib/db/schema/competencyFrameworks";
import { getUserAuth } from "@soco/auth/utils";

export const createCompetencyFramework = async (competencyFramework: NewCompetencyFrameworkParams) => {
  const { session } = await getUserAuth();
  const newCompetencyFramework = insertCompetencyFrameworkSchema.parse({ ...competencyFramework, userId: session?.user.id! });
  try {
    const [c] =  await db.insert(competencyFrameworks).values(newCompetencyFramework).returning();
    return { competencyFramework: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateCompetencyFramework = async (id: CompetencyFrameworkId, competencyFramework: UpdateCompetencyFrameworkParams) => {
  const { session } = await getUserAuth();
  const { id: competencyFrameworkId } = competencyFrameworkIdSchema.parse({ id });
  const newCompetencyFramework = updateCompetencyFrameworkSchema.parse({ ...competencyFramework, userId: session?.user.id! });
  try {
    const [c] =  await db
     .update(competencyFrameworks)
     .set({...newCompetencyFramework, updatedAt: new Date() })
     .where(and(eq(competencyFrameworks.id, competencyFrameworkId!), eq(competencyFrameworks.userId, session?.user.id!)))
     .returning();
    return { competencyFramework: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteCompetencyFramework = async (id: CompetencyFrameworkId) => {
  const { session } = await getUserAuth();
  const { id: competencyFrameworkId } = competencyFrameworkIdSchema.parse({ id });
  try {
    const [c] =  await db.delete(competencyFrameworks).where(and(eq(competencyFrameworks.id, competencyFrameworkId!), eq(competencyFrameworks.userId, session?.user.id!)))
    .returning();
    return { competencyFramework: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

