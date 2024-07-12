import { db } from "@soco/enrol-db/client";
import { eq } from "@soco/enrol-db";
import { 
  type EnrolLtiContextId, 
  type NewEnrolLtiContextParams,
  type UpdateEnrolLtiContextParams, 
  updateEnrolLtiContextSchema,
  insertEnrolLtiContextSchema, 
  enrolLtiContexts,
  enrolLtiContextIdSchema 
} from "@soco/enrol-db/schema/enrolLtiContexts";

export const createEnrolLtiContext = async (enrolLtiContext: NewEnrolLtiContextParams) => {
  const newEnrolLtiContext = insertEnrolLtiContextSchema.parse(enrolLtiContext);
  try {
    const [e] =  await db.insert(enrolLtiContexts).values(newEnrolLtiContext).returning();
    return { enrolLtiContext: e };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateEnrolLtiContext = async (id: EnrolLtiContextId, enrolLtiContext: UpdateEnrolLtiContextParams) => {
  const { id: enrolLtiContextId } = enrolLtiContextIdSchema.parse({ id });
  const newEnrolLtiContext = updateEnrolLtiContextSchema.parse(enrolLtiContext);
  try {
    const [e] =  await db
     .update(enrolLtiContexts)
     .set({...newEnrolLtiContext, updatedAt: new Date() })
     .where(eq(enrolLtiContexts.id, enrolLtiContextId!))
     .returning();
    return { enrolLtiContext: e };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteEnrolLtiContext = async (id: EnrolLtiContextId) => {
  const { id: enrolLtiContextId } = enrolLtiContextIdSchema.parse({ id });
  try {
    const [e] =  await db.delete(enrolLtiContexts).where(eq(enrolLtiContexts.id, enrolLtiContextId!))
    .returning();
    return { enrolLtiContext: e };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

