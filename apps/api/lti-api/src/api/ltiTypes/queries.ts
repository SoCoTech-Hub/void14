import type { LtiTypeId } from "@soco/lti-db/schema/ltiTypes";
import { eq } from "@soco/lti-db";
import { db } from "@soco/lti-db/client";
import { ltiTypeIdSchema, ltiTypes } from "@soco/lti-db/schema/ltiTypes";

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
