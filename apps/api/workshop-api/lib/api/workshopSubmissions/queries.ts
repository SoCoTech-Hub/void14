import { and, eq } from "drizzle-orm";

import { getUserAuth } from "@soco/auth/utils";

import type { WorkshopSubmissionId } from "../db/schema/workshopSubmissions";
import { db } from "../db/index";
import { workshops } from "../db/schema/workshops";
import {
  workshopSubmissionIdSchema,
  workshopSubmissions,
} from "../db/schema/workshopSubmissions";

export const getWorkshopSubmissions = async () => {
  const { session } = await getUserAuth();
  const rows = await db
    .select({ workshopSubmission: workshopSubmissions, workshop: workshops })
    .from(workshopSubmissions)
    .leftJoin(workshops, eq(workshopSubmissions.workshopId, workshops.id))
    .where(eq(workshopSubmissions.userId, session?.user.id!));
  const w = rows.map((r) => ({
    ...r.workshopSubmission,
    workshop: r.workshop,
  }));
  return { workshopSubmissions: w };
};

export const getWorkshopSubmissionById = async (id: WorkshopSubmissionId) => {
  const { session } = await getUserAuth();
  const { id: workshopSubmissionId } = workshopSubmissionIdSchema.parse({ id });
  const [row] = await db
    .select({ workshopSubmission: workshopSubmissions, workshop: workshops })
    .from(workshopSubmissions)
    .where(
      and(
        eq(workshopSubmissions.id, workshopSubmissionId),
        eq(workshopSubmissions.userId, session?.user.id!),
      ),
    )
    .leftJoin(workshops, eq(workshopSubmissions.workshopId, workshops.id));
  if (row === undefined) return {};
  const w = { ...row.workshopSubmission, workshop: row.workshop };
  return { workshopSubmission: w };
};
