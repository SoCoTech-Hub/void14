import { eq } from "drizzle-orm";

import { db } from "../../db/index";
import {
  EnrolLtiLti2UserResultId,
  enrolLtiLti2UserResultIdSchema,
  enrolLtiLti2UserResults,
  insertEnrolLtiLti2UserResultSchema,
  NewEnrolLtiLti2UserResultParams,
  UpdateEnrolLtiLti2UserResultParams,
  updateEnrolLtiLti2UserResultSchema,
} from "../../db/schema/enrolLtiLti2UserResults";

export const createEnrolLtiLti2UserResult = async (
  enrolLtiLti2UserResult: NewEnrolLtiLti2UserResultParams,
) => {
  const newEnrolLtiLti2UserResult = insertEnrolLtiLti2UserResultSchema.parse(
    enrolLtiLti2UserResult,
  );
  try {
    const [e] = await db
      .insert(enrolLtiLti2UserResults)
      .values(newEnrolLtiLti2UserResult)
      .returning();
    return { enrolLtiLti2UserResult: e };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateEnrolLtiLti2UserResult = async (
  id: EnrolLtiLti2UserResultId,
  enrolLtiLti2UserResult: UpdateEnrolLtiLti2UserResultParams,
) => {
  const { id: enrolLtiLti2UserResultId } = enrolLtiLti2UserResultIdSchema.parse(
    { id },
  );
  const newEnrolLtiLti2UserResult = updateEnrolLtiLti2UserResultSchema.parse(
    enrolLtiLti2UserResult,
  );
  try {
    const [e] = await db
      .update(enrolLtiLti2UserResults)
      .set({ ...newEnrolLtiLti2UserResult, updatedAt: new Date() })
      .where(eq(enrolLtiLti2UserResults.id, enrolLtiLti2UserResultId!))
      .returning();
    return { enrolLtiLti2UserResult: e };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteEnrolLtiLti2UserResult = async (
  id: EnrolLtiLti2UserResultId,
) => {
  const { id: enrolLtiLti2UserResultId } = enrolLtiLti2UserResultIdSchema.parse(
    { id },
  );
  try {
    const [e] = await db
      .delete(enrolLtiLti2UserResults)
      .where(eq(enrolLtiLti2UserResults.id, enrolLtiLti2UserResultId!))
      .returning();
    return { enrolLtiLti2UserResult: e };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
