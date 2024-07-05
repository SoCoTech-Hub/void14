import { eq } from "drizzle-orm";

import type { LtiserviceGradebookserviceId } from "../../db/schema/ltiserviceGradebookservices";
import { db } from "../../db/index";
import {
  ltiserviceGradebookserviceIdSchema,
  ltiserviceGradebookservices,
} from "../../db/schema/ltiserviceGradebookservices";

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
