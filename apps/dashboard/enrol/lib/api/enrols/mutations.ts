import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { 
  EnrolId, 
  NewEnrolParams,
  UpdateEnrolParams, 
  updateEnrolSchema,
  insertEnrolSchema, 
  enrols,
  enrolIdSchema 
} from "@/lib/db/schema/enrols";

export const createEnrol = async (enrol: NewEnrolParams) => {
  const newEnrol = insertEnrolSchema.parse(enrol);
  try {
    const [e] =  await db.insert(enrols).values(newEnrol).returning();
    return { enrol: e };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateEnrol = async (id: EnrolId, enrol: UpdateEnrolParams) => {
  const { id: enrolId } = enrolIdSchema.parse({ id });
  const newEnrol = updateEnrolSchema.parse(enrol);
  try {
    const [e] =  await db
     .update(enrols)
     .set({...newEnrol, updatedAt: new Date() })
     .where(eq(enrols.id, enrolId!))
     .returning();
    return { enrol: e };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteEnrol = async (id: EnrolId) => {
  const { id: enrolId } = enrolIdSchema.parse({ id });
  try {
    const [e] =  await db.delete(enrols).where(eq(enrols.id, enrolId!))
    .returning();
    return { enrol: e };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

