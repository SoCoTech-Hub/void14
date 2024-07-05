import { eq } from "drizzle-orm";

import type { EnrolLtiDeploymentId } from "../../db/schema/enrolLtiDeployments";
import { db } from "../../db/index";
import {
  enrolLtiDeploymentIdSchema,
  enrolLtiDeployments,
} from "../../db/schema/enrolLtiDeployments";

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
