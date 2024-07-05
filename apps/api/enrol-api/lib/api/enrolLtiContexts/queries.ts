import { eq } from "drizzle-orm";

import type { EnrolLtiContextId } from "../../db/schema/enrolLtiContexts";
import { db } from "../../db/index";
import {
  enrolLtiContextIdSchema,
  enrolLtiContexts,
} from "../../db/schema/enrolLtiContexts";

export const getEnrolLtiContexts = async () => {
  const rows = await db.select().from(enrolLtiContexts);
  const e = rows;
  return { enrolLtiContexts: e };
};

export const getEnrolLtiContextById = async (id: EnrolLtiContextId) => {
  const { id: enrolLtiContextId } = enrolLtiContextIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(enrolLtiContexts)
    .where(eq(enrolLtiContexts.id, enrolLtiContextId));
  if (row === undefined) return {};
  const e = row;
  return { enrolLtiContext: e };
};
