import { eq } from "drizzle-orm";

import type { EnrolLtiLti2ShareKeyId } from "../../db/schema/enrolLtiLti2ShareKeys";
import { db } from "../../db/index";
import {
  enrolLtiLti2ShareKeyIdSchema,
  enrolLtiLti2ShareKeys,
} from "../../db/schema/enrolLtiLti2ShareKeys";

export const getEnrolLtiLti2ShareKeys = async () => {
  const rows = await db.select().from(enrolLtiLti2ShareKeys);
  const e = rows;
  return { enrolLtiLti2ShareKeys: e };
};

export const getEnrolLtiLti2ShareKeyById = async (
  id: EnrolLtiLti2ShareKeyId,
) => {
  const { id: enrolLtiLti2ShareKeyId } = enrolLtiLti2ShareKeyIdSchema.parse({
    id,
  });
  const [row] = await db
    .select()
    .from(enrolLtiLti2ShareKeys)
    .where(eq(enrolLtiLti2ShareKeys.id, enrolLtiLti2ShareKeyId));
  if (row === undefined) return {};
  const e = row;
  return { enrolLtiLti2ShareKey: e };
};
