import { eq } from "drizzle-orm";

import type { CohortId } from "../db/schema/cohorts";
import { db } from "../db/index";
import { cohortIdSchema, cohorts } from "../db/schema/cohorts";

export const getCohorts = async () => {
  const rows = await db.select().from(cohorts);
  const c = rows;
  return { cohorts: c };
};

export const getCohortById = async (id: CohortId) => {
  const { id: cohortId } = cohortIdSchema.parse({ id });
  const [row] = await db.select().from(cohorts).where(eq(cohorts.id, cohortId));
  if (row === undefined) return {};
  const c = row;
  return { cohort: c };
};
