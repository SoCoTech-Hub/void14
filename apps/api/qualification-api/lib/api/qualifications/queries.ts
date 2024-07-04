import { eq } from "drizzle-orm";

import type { QualificationId } from "../db/schema/qualifications";
import { db } from "../db/index";
import {
  qualificationIdSchema,
  qualifications,
} from "../db/schema/qualifications";

export const getQualifications = async () => {
  const rows = await db.select().from(qualifications);
  const q = rows;
  return { qualifications: q };
};

export const getQualificationById = async (id: QualificationId) => {
  const { id: qualificationId } = qualificationIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(qualifications)
    .where(eq(qualifications.id, qualificationId));
  if (row === undefined) return {};
  const q = row;
  return { qualification: q };
};
