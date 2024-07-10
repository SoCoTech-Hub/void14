import { db } from "@soco/enrol-db/client";
import { eq } from "@soco/enrol-db";
import { 
  EnrolLtiLti2ConsumerId, 
  NewEnrolLtiLti2ConsumerParams,
  UpdateEnrolLtiLti2ConsumerParams, 
  updateEnrolLtiLti2ConsumerSchema,
  insertEnrolLtiLti2ConsumerSchema, 
  enrolLtiLti2Consumers,
  enrolLtiLti2ConsumerIdSchema 
} from "@soco/enrol-db/schema/enrolLtiLti2Consumers";

export const createEnrolLtiLti2Consumer = async (enrolLtiLti2Consumer: NewEnrolLtiLti2ConsumerParams) => {
  const newEnrolLtiLti2Consumer = insertEnrolLtiLti2ConsumerSchema.parse(enrolLtiLti2Consumer);
  try {
    const [e] =  await db.insert(enrolLtiLti2Consumers).values(newEnrolLtiLti2Consumer).returning();
    return { enrolLtiLti2Consumer: e };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateEnrolLtiLti2Consumer = async (id: EnrolLtiLti2ConsumerId, enrolLtiLti2Consumer: UpdateEnrolLtiLti2ConsumerParams) => {
  const { id: enrolLtiLti2ConsumerId } = enrolLtiLti2ConsumerIdSchema.parse({ id });
  const newEnrolLtiLti2Consumer = updateEnrolLtiLti2ConsumerSchema.parse(enrolLtiLti2Consumer);
  try {
    const [e] =  await db
     .update(enrolLtiLti2Consumers)
     .set({...newEnrolLtiLti2Consumer, updatedAt: new Date() })
     .where(eq(enrolLtiLti2Consumers.id, enrolLtiLti2ConsumerId!))
     .returning();
    return { enrolLtiLti2Consumer: e };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteEnrolLtiLti2Consumer = async (id: EnrolLtiLti2ConsumerId) => {
  const { id: enrolLtiLti2ConsumerId } = enrolLtiLti2ConsumerIdSchema.parse({ id });
  try {
    const [e] =  await db.delete(enrolLtiLti2Consumers).where(eq(enrolLtiLti2Consumers.id, enrolLtiLti2ConsumerId!))
    .returning();
    return { enrolLtiLti2Consumer: e };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

