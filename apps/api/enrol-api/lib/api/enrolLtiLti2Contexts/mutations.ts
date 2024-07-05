import { eq } from "drizzle-orm";

import { db } from "../../db/index";
import {
  EnrolLtiLti2ContextId,
  enrolLtiLti2ContextIdSchema,
  enrolLtiLti2Contexts,
  insertEnrolLtiLti2ContextSchema,
  NewEnrolLtiLti2ContextParams,
  UpdateEnrolLtiLti2ContextParams,
  updateEnrolLtiLti2ContextSchema,
} from "../../db/schema/enrolLtiLti2Contexts";

export const createEnrolLtiLti2Context = async (
  enrolLtiLti2Context: NewEnrolLtiLti2ContextParams,
) => {
  const newEnrolLtiLti2Context =
    insertEnrolLtiLti2ContextSchema.parse(enrolLtiLti2Context);
  try {
    const [e] = await db
      .insert(enrolLtiLti2Contexts)
      .values(newEnrolLtiLti2Context)
      .returning();
    return { enrolLtiLti2Context: e };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateEnrolLtiLti2Context = async (
  id: EnrolLtiLti2ContextId,
  enrolLtiLti2Context: UpdateEnrolLtiLti2ContextParams,
) => {
  const { id: enrolLtiLti2ContextId } = enrolLtiLti2ContextIdSchema.parse({
    id,
  });
  const newEnrolLtiLti2Context =
    updateEnrolLtiLti2ContextSchema.parse(enrolLtiLti2Context);
  try {
    const [e] = await db
      .update(enrolLtiLti2Contexts)
      .set({ ...newEnrolLtiLti2Context, updatedAt: new Date() })
      .where(eq(enrolLtiLti2Contexts.id, enrolLtiLti2ContextId!))
      .returning();
    return { enrolLtiLti2Context: e };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteEnrolLtiLti2Context = async (id: EnrolLtiLti2ContextId) => {
  const { id: enrolLtiLti2ContextId } = enrolLtiLti2ContextIdSchema.parse({
    id,
  });
  try {
    const [e] = await db
      .delete(enrolLtiLti2Contexts)
      .where(eq(enrolLtiLti2Contexts.id, enrolLtiLti2ContextId!))
      .returning();
    return { enrolLtiLti2Context: e };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
