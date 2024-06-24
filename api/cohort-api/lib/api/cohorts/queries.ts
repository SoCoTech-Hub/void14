import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { type CohortId, cohortIdSchema, cohorts } from "@/lib/db/schema/cohorts";

export const getCohorts = async () => {
  const rows = await db.select().from(cohorts);
  const c = rows
  return { cohorts: c };
};

export const getCohortById = async (id: CohortId) => {
  const { id: cohortId } = cohortIdSchema.parse({ id });
  const [row] = await db.select().from(cohorts).where(eq(cohorts.id, cohortId));
  if (row === undefined) return {};
  const c = row;
  return { cohort: c };
};


