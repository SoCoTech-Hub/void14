import { db } from "@soco/enrol-db/client";
import { and, eq } from "@soco/enrol-db";
import { 
  type EnrolFlatfileId, 
  type NewEnrolFlatfileParams,
  type UpdateEnrolFlatfileParams, 
  updateEnrolFlatfileSchema,
  insertEnrolFlatfileSchema, 
  enrolFlatfiles,
  enrolFlatfileIdSchema 
} from "@soco/enrol-db/schema/enrolFlatfiles";
import { getUserAuth } from "@soco/auth-service";

export const createEnrolFlatfile = async (enrolFlatfile: NewEnrolFlatfileParams) => {
  const { session } = await getUserAuth();
  const newEnrolFlatfile = insertEnrolFlatfileSchema.parse({ ...enrolFlatfile, userId: session?.user.id! });
  try {
    const [e] =  await db.insert(enrolFlatfiles).values(newEnrolFlatfile).returning();
    return { enrolFlatfile: e };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateEnrolFlatfile = async (id: EnrolFlatfileId, enrolFlatfile: UpdateEnrolFlatfileParams) => {
  const { session } = await getUserAuth();
  const { id: enrolFlatfileId } = enrolFlatfileIdSchema.parse({ id });
  const newEnrolFlatfile = updateEnrolFlatfileSchema.parse({ ...enrolFlatfile, userId: session?.user.id! });
  try {
    const [e] =  await db
     .update(enrolFlatfiles)
     .set({...newEnrolFlatfile, updatedAt: new Date() })
     .where(and(eq(enrolFlatfiles.id, enrolFlatfileId!), eq(enrolFlatfiles.userId, session?.user.id!)))
     .returning();
    return { enrolFlatfile: e };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteEnrolFlatfile = async (id: EnrolFlatfileId) => {
  const { session } = await getUserAuth();
  const { id: enrolFlatfileId } = enrolFlatfileIdSchema.parse({ id });
  try {
    const [e] =  await db.delete(enrolFlatfiles).where(and(eq(enrolFlatfiles.id, enrolFlatfileId!), eq(enrolFlatfiles.userId, session?.user.id!)))
    .returning();
    return { enrolFlatfile: e };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

