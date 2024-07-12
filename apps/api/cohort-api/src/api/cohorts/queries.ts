import type { CohortId } from "@soco/cohort-db/schema/cohorts";
import { eq } from "@soco/cohort-db";
import { db } from "@soco/cohort-db/client";
import { cohortIdSchema, cohorts } from "@soco/cohort-db/schema/cohorts";

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
