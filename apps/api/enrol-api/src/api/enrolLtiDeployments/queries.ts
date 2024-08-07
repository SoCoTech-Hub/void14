import type { EnrolLtiDeploymentId } from "@soco/enrol-db/schema/enrolLtiDeployments";
import { eq } from "@soco/enrol-db";
import { db } from "@soco/enrol-db/client";
import {
  enrolLtiDeploymentIdSchema,
  enrolLtiDeployments,
} from "@soco/enrol-db/schema/enrolLtiDeployments";

export const getEnrolLtiDeployments = async () => {
  const rows = await db.select().from(enrolLtiDeployments);
  const e = rows;
  return { enrolLtiDeployments: e };
};

export const getEnrolLtiDeploymentById = async (id: EnrolLtiDeploymentId) => {
  const { id: enrolLtiDeploymentId } = enrolLtiDeploymentIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(enrolLtiDeployments)
    .where(eq(enrolLtiDeployments.id, enrolLtiDeploymentId));
  if (row === undefined) return {};
  const e = row;
  return { enrolLtiDeployment: e };
};
