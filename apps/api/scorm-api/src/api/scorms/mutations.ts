import type {
  NewScormParams,
  ScormId,
  UpdateScormParams,
} from "@soco/scorm-db/schema/scorms";
import { eq } from "@soco/scorm-db";
import { db } from "@soco/scorm-db/client";
import {
  insertScormSchema,
  scormIdSchema,
  scorms,
  updateScormSchema,
} from "@soco/scorm-db/schema/scorms";

export const createScorm = async (scorm: NewScormParams) => {
  const newScorm = insertScormSchema.parse(scorm);
  try {
    const [s] = await db.insert(scorms).values(newScorm).returning();
    return { scorm: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateScorm = async (id: ScormId, scorm: UpdateScormParams) => {
  const { id: scormId } = scormIdSchema.parse({ id });
  const newScorm = updateScormSchema.parse(scorm);
  try {
    const [s] = await db
      .update(scorms)
      .set({ ...newScorm, updatedAt: new Date() })
      .where(eq(scorms.id, scormId!))
      .returning();
    return { scorm: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteScorm = async (id: ScormId) => {
  const { id: scormId } = scormIdSchema.parse({ id });
  try {
    const [s] = await db
      .delete(scorms)
      .where(eq(scorms.id, scormId!))
      .returning();
    return { scorm: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
