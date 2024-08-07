import type {
  NewQualificationParams,
  QualificationId,
  UpdateQualificationParams,
} from "@soco/qualifications-db/schema/qualifications";
import { eq } from "@soco/qualifications-db";
import { db } from "@soco/qualifications-db/client";
import {
  insertQualificationSchema,
  qualificationIdSchema,
  qualifications,
  updateQualificationSchema,
} from "@soco/qualifications-db/schema/qualifications";

export const createQualification = async (
  qualification: NewQualificationParams,
) => {
  const newQualification = insertQualificationSchema.parse(qualification);
  try {
    const [q] = await db
      .insert(qualifications)
      .values(newQualification)
      .returning();
    return { qualification: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateQualification = async (
  id: QualificationId,
  qualification: UpdateQualificationParams,
) => {
  const { id: qualificationId } = qualificationIdSchema.parse({ id });
  const newQualification = updateQualificationSchema.parse(qualification);
  try {
    const [q] = await db
      .update(qualifications)
      .set(newQualification)
      .where(eq(qualifications.id, qualificationId!))
      .returning();
    return { qualification: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteQualification = async (id: QualificationId) => {
  const { id: qualificationId } = qualificationIdSchema.parse({ id });
  try {
    const [q] = await db
      .delete(qualifications)
      .where(eq(qualifications.id, qualificationId!))
      .returning();
    return { qualification: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
