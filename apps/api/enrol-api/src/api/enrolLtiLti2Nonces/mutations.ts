import { db } from "@soco/enrol-db/client";
import { eq } from "@soco/enrol-db";
import { 
  EnrolLtiLti2NonceId, 
  NewEnrolLtiLti2NonceParams,
  UpdateEnrolLtiLti2NonceParams, 
  updateEnrolLtiLti2NonceSchema,
  insertEnrolLtiLti2NonceSchema, 
  enrolLtiLti2Nonces,
  enrolLtiLti2NonceIdSchema 
} from "@soco/enrol-db/schema/enrolLtiLti2Nonces";

export const createEnrolLtiLti2Nonce = async (enrolLtiLti2Nonce: NewEnrolLtiLti2NonceParams) => {
  const newEnrolLtiLti2Nonce = insertEnrolLtiLti2NonceSchema.parse(enrolLtiLti2Nonce);
  try {
    const [e] =  await db.insert(enrolLtiLti2Nonces).values(newEnrolLtiLti2Nonce).returning();
    return { enrolLtiLti2Nonce: e };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateEnrolLtiLti2Nonce = async (id: EnrolLtiLti2NonceId, enrolLtiLti2Nonce: UpdateEnrolLtiLti2NonceParams) => {
  const { id: enrolLtiLti2NonceId } = enrolLtiLti2NonceIdSchema.parse({ id });
  const newEnrolLtiLti2Nonce = updateEnrolLtiLti2NonceSchema.parse(enrolLtiLti2Nonce);
  try {
    const [e] =  await db
     .update(enrolLtiLti2Nonces)
     .set(newEnrolLtiLti2Nonce)
     .where(eq(enrolLtiLti2Nonces.id, enrolLtiLti2NonceId!))
     .returning();
    return { enrolLtiLti2Nonce: e };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteEnrolLtiLti2Nonce = async (id: EnrolLtiLti2NonceId) => {
  const { id: enrolLtiLti2NonceId } = enrolLtiLti2NonceIdSchema.parse({ id });
  try {
    const [e] =  await db.delete(enrolLtiLti2Nonces).where(eq(enrolLtiLti2Nonces.id, enrolLtiLti2NonceId!))
    .returning();
    return { enrolLtiLti2Nonce: e };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

