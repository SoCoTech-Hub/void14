import { eq } from "drizzle-orm";

import type { EnrolLtiLti2NonceId } from "../db/schema/enrolLtiLti2Nonces";
import { db } from "../db/index";
import {
  enrolLtiLti2NonceIdSchema,
  enrolLtiLti2Nonces,
} from "../db/schema/enrolLtiLti2Nonces";

export const getEnrolLtiLti2Nonces = async () => {
  const rows = await db.select().from(enrolLtiLti2Nonces);
  const e = rows;
  return { enrolLtiLti2Nonces: e };
};

export const getEnrolLtiLti2NonceById = async (id: EnrolLtiLti2NonceId) => {
  const { id: enrolLtiLti2NonceId } = enrolLtiLti2NonceIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(enrolLtiLti2Nonces)
    .where(eq(enrolLtiLti2Nonces.id, enrolLtiLti2NonceId));
  if (row === undefined) return {};
  const e = row;
  return { enrolLtiLti2Nonce: e };
};