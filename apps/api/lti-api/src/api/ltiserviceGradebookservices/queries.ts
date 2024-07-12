import type { LtiserviceGradebookserviceId } from "@soco/lti-db/schema/ltiserviceGradebookservices";
import { eq } from "@soco/lti-db";
import { db } from "@soco/lti-db/client";
import {
  ltiserviceGradebookserviceIdSchema,
  ltiserviceGradebookservices,
} from "@soco/lti-db/schema/ltiserviceGradebookservices";

export const getLtiserviceGradebookservices = async () => {
  const rows = await db.select().from(ltiserviceGradebookservices);
  const l = rows;
  return { ltiserviceGradebookservices: l };
};

export const getLtiserviceGradebookserviceById = async (
  id: LtiserviceGradebookserviceId,
) => {
  const { id: ltiserviceGradebookserviceId } =
    ltiserviceGradebookserviceIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(ltiserviceGradebookservices)
    .where(eq(ltiserviceGradebookservices.id, ltiserviceGradebookserviceId));
  if (row === undefined) return {};
  const l = row;
  return { ltiserviceGradebookservice: l };
};
