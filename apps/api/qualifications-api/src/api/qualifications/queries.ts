import type { QualificationId } from "@soco/qualifications-db/schema/qualifications";
import { eq } from "@soco/qualifications-db";
import { db } from "@soco/qualifications-db/client";
import {
  qualificationIdSchema,
  qualifications,
} from "@soco/qualifications-db/schema/qualifications";

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
