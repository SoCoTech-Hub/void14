import type { EnrolLtiToolId } from "@soco/enrol-db/schema/enrolLtiTools";
import { eq } from "@soco/enrol-db";
import { db } from "@soco/enrol-db/client";
import {
  enrolLtiToolIdSchema,
  enrolLtiTools,
} from "@soco/enrol-db/schema/enrolLtiTools";

export const getEnrolLtiTools = async () => {
  const rows = await db.select().from(enrolLtiTools);
  const e = rows;
  return { enrolLtiTools: e };
};

export const getEnrolLtiToolById = async (id: EnrolLtiToolId) => {
  const { id: enrolLtiToolId } = enrolLtiToolIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(enrolLtiTools)
    .where(eq(enrolLtiTools.id, enrolLtiToolId));
  if (row === undefined) return {};
  const e = row;
  return { enrolLtiTool: e };
};
