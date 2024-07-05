import { eq } from "drizzle-orm";

import type { LtiTypeId } from "../../db/schema/ltiTypes";
import { db } from "../../db/index";
import { ltiTypeIdSchema, ltiTypes } from "../../db/schema/ltiTypes";

export const getLtiTypes = async () => {
  const rows = await db.select().from(ltiTypes);
  const l = rows;
  return { ltiTypes: l };
};

export const getLtiTypeById = async (id: LtiTypeId) => {
  const { id: ltiTypeId } = ltiTypeIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(ltiTypes)
    .where(eq(ltiTypes.id, ltiTypeId));
  if (row === undefined) return {};
  const l = row;
  return { ltiType: l };
};
