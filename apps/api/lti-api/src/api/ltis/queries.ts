import { db } from "@soco/lti-db/client";
import { eq } from "@soco/lti-db";
import { type LtiId, ltiIdSchema, ltis } from "@soco/lti-db/schema/ltis";

export const getLtis = async () => {
  const rows = await db.select().from(ltis);
  const l = rows
  return { ltis: l };
};

export const getLtiById = async (id: LtiId) => {
  const { id: ltiId } = ltiIdSchema.parse({ id });
  const [row] = await db.select().from(ltis).where(eq(ltis.id, ltiId));
  if (row === undefined) return {};
  const l = row;
  return { lti: l };
};


