import type {
  EnrolLtiLti2ShareKeyId,
  NewEnrolLtiLti2ShareKeyParams,
  UpdateEnrolLtiLti2ShareKeyParams,
} from "@soco/enrol-db/schema/enrolLtiLti2ShareKeys";
import { eq } from "@soco/enrol-db";
import { db } from "@soco/enrol-db/client";
import {
  enrolLtiLti2ShareKeyIdSchema,
  enrolLtiLti2ShareKeys,
  insertEnrolLtiLti2ShareKeySchema,
  updateEnrolLtiLti2ShareKeySchema,
} from "@soco/enrol-db/schema/enrolLtiLti2ShareKeys";

export const createEnrolLtiLti2ShareKey = async (
  enrolLtiLti2ShareKey: NewEnrolLtiLti2ShareKeyParams,
) => {
  const newEnrolLtiLti2ShareKey =
    insertEnrolLtiLti2ShareKeySchema.parse(enrolLtiLti2ShareKey);
  try {
    const [e] = await db
      .insert(enrolLtiLti2ShareKeys)
      .values(newEnrolLtiLti2ShareKey)
      .returning();
    return { enrolLtiLti2ShareKey: e };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateEnrolLtiLti2ShareKey = async (
  id: EnrolLtiLti2ShareKeyId,
  enrolLtiLti2ShareKey: UpdateEnrolLtiLti2ShareKeyParams,
) => {
  const { id: enrolLtiLti2ShareKeyId } = enrolLtiLti2ShareKeyIdSchema.parse({
    id,
  });
  const newEnrolLtiLti2ShareKey =
    updateEnrolLtiLti2ShareKeySchema.parse(enrolLtiLti2ShareKey);
  try {
    const [e] = await db
      .update(enrolLtiLti2ShareKeys)
      .set(newEnrolLtiLti2ShareKey)
      .where(eq(enrolLtiLti2ShareKeys.id, enrolLtiLti2ShareKeyId!))
      .returning();
    return { enrolLtiLti2ShareKey: e };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteEnrolLtiLti2ShareKey = async (
  id: EnrolLtiLti2ShareKeyId,
) => {
  const { id: enrolLtiLti2ShareKeyId } = enrolLtiLti2ShareKeyIdSchema.parse({
    id,
  });
  try {
    const [e] = await db
      .delete(enrolLtiLti2ShareKeys)
      .where(eq(enrolLtiLti2ShareKeys.id, enrolLtiLti2ShareKeyId!))
      .returning();
    return { enrolLtiLti2ShareKey: e };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
