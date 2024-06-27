import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { 
  CohortId, 
  NewCohortParams,
  UpdateCohortParams, 
  updateCohortSchema,
  insertCohortSchema, 
  cohorts,
  cohortIdSchema 
} from "@/lib/db/schema/cohorts";

export const createCohort = async (cohort: NewCohortParams) => {
  const newCohort = insertCohortSchema.parse(cohort);
  try {
    const [c] =  await db.insert(cohorts).values(newCohort).returning();
    return { cohort: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateCohort = async (id: CohortId, cohort: UpdateCohortParams) => {
  const { id: cohortId } = cohortIdSchema.parse({ id });
  const newCohort = updateCohortSchema.parse(cohort);
  try {
    const [c] =  await db
     .update(cohorts)
     .set({...newCohort, updatedAt: new Date() })
     .where(eq(cohorts.id, cohortId!))
     .returning();
    return { cohort: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteCohort = async (id: CohortId) => {
  const { id: cohortId } = cohortIdSchema.parse({ id });
  try {
    const [c] =  await db.delete(cohorts).where(eq(cohorts.id, cohortId!))
    .returning();
    return { cohort: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

