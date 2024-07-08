import { db } from "@soco/qualifications-db/index";
import { eq } from "drizzle-orm";
import { 
  QualificationId, 
  NewQualificationParams,
  UpdateQualificationParams, 
  updateQualificationSchema,
  insertQualificationSchema, 
  qualifications,
  qualificationIdSchema 
} from "@soco/qualifications-db/schema/qualifications";

export const createQualification = async (qualification: NewQualificationParams) => {
  const newQualification = insertQualificationSchema.parse(qualification);
  try {
    const [q] =  await db.insert(qualifications).values(newQualification).returning();
    return { qualification: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateQualification = async (id: QualificationId, qualification: UpdateQualificationParams) => {
  const { id: qualificationId } = qualificationIdSchema.parse({ id });
  const newQualification = updateQualificationSchema.parse(qualification);
  try {
    const [q] =  await db
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
    const [q] =  await db.delete(qualifications).where(eq(qualifications.id, qualificationId!))
    .returning();
    return { qualification: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

