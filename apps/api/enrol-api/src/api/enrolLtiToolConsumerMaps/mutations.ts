import { db } from "@soco/enrol-db/client";
import { eq } from "@soco/enrol-db";
import { 
  type EnrolLtiToolConsumerMapId, 
  type NewEnrolLtiToolConsumerMapParams,
  type UpdateEnrolLtiToolConsumerMapParams, 
  updateEnrolLtiToolConsumerMapSchema,
  insertEnrolLtiToolConsumerMapSchema, 
  enrolLtiToolConsumerMaps,
  enrolLtiToolConsumerMapIdSchema 
} from "@soco/enrol-db/schema/enrolLtiToolConsumerMaps";

export const createEnrolLtiToolConsumerMap = async (enrolLtiToolConsumerMap: NewEnrolLtiToolConsumerMapParams) => {
  const newEnrolLtiToolConsumerMap = insertEnrolLtiToolConsumerMapSchema.parse(enrolLtiToolConsumerMap);
  try {
    const [e] =  await db.insert(enrolLtiToolConsumerMaps).values(newEnrolLtiToolConsumerMap).returning();
    return { enrolLtiToolConsumerMap: e };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateEnrolLtiToolConsumerMap = async (id: EnrolLtiToolConsumerMapId, enrolLtiToolConsumerMap: UpdateEnrolLtiToolConsumerMapParams) => {
  const { id: enrolLtiToolConsumerMapId } = enrolLtiToolConsumerMapIdSchema.parse({ id });
  const newEnrolLtiToolConsumerMap = updateEnrolLtiToolConsumerMapSchema.parse(enrolLtiToolConsumerMap);
  try {
    const [e] =  await db
     .update(enrolLtiToolConsumerMaps)
     .set(newEnrolLtiToolConsumerMap)
     .where(eq(enrolLtiToolConsumerMaps.id, enrolLtiToolConsumerMapId!))
     .returning();
    return { enrolLtiToolConsumerMap: e };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteEnrolLtiToolConsumerMap = async (id: EnrolLtiToolConsumerMapId) => {
  const { id: enrolLtiToolConsumerMapId } = enrolLtiToolConsumerMapIdSchema.parse({ id });
  try {
    const [e] =  await db.delete(enrolLtiToolConsumerMaps).where(eq(enrolLtiToolConsumerMaps.id, enrolLtiToolConsumerMapId!))
    .returning();
    return { enrolLtiToolConsumerMap: e };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

