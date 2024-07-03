import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { 
  EnrolLtiAppRegistrationId, 
  NewEnrolLtiAppRegistrationParams,
  UpdateEnrolLtiAppRegistrationParams, 
  updateEnrolLtiAppRegistrationSchema,
  insertEnrolLtiAppRegistrationSchema, 
  enrolLtiAppRegistrations,
  enrolLtiAppRegistrationIdSchema 
} from "@/lib/db/schema/enrolLtiAppRegistrations";

export const createEnrolLtiAppRegistration = async (enrolLtiAppRegistration: NewEnrolLtiAppRegistrationParams) => {
  const newEnrolLtiAppRegistration = insertEnrolLtiAppRegistrationSchema.parse(enrolLtiAppRegistration);
  try {
    const [e] =  await db.insert(enrolLtiAppRegistrations).values(newEnrolLtiAppRegistration).returning();
    return { enrolLtiAppRegistration: e };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateEnrolLtiAppRegistration = async (id: EnrolLtiAppRegistrationId, enrolLtiAppRegistration: UpdateEnrolLtiAppRegistrationParams) => {
  const { id: enrolLtiAppRegistrationId } = enrolLtiAppRegistrationIdSchema.parse({ id });
  const newEnrolLtiAppRegistration = updateEnrolLtiAppRegistrationSchema.parse(enrolLtiAppRegistration);
  try {
    const [e] =  await db
     .update(enrolLtiAppRegistrations)
     .set({...newEnrolLtiAppRegistration, updatedAt: new Date() })
     .where(eq(enrolLtiAppRegistrations.id, enrolLtiAppRegistrationId!))
     .returning();
    return { enrolLtiAppRegistration: e };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteEnrolLtiAppRegistration = async (id: EnrolLtiAppRegistrationId) => {
  const { id: enrolLtiAppRegistrationId } = enrolLtiAppRegistrationIdSchema.parse({ id });
  try {
    const [e] =  await db.delete(enrolLtiAppRegistrations).where(eq(enrolLtiAppRegistrations.id, enrolLtiAppRegistrationId!))
    .returning();
    return { enrolLtiAppRegistration: e };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

