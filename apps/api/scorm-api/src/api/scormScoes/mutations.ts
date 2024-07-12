import { db } from "@soco/scorm-db/client";
import { eq } from "@soco/scorm-db";
import { 
  type ScormScoeId, 
  type NewScormScoeParams,
  type UpdateScormScoeParams, 
  updateScormScoeSchema,
  insertScormScoeSchema, 
  scormScoes,
  scormScoeIdSchema 
} from "@soco/scorm-db/schema/scormScoes";

export const createScormScoe = async (scormScoe: NewScormScoeParams) => {
  const newScormScoe = insertScormScoeSchema.parse(scormScoe);
  try {
    const [s] =  await db.insert(scormScoes).values(newScormScoe).returning();
    return { scormScoe: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateScormScoe = async (id: ScormScoeId, scormScoe: UpdateScormScoeParams) => {
  const { id: scormScoeId } = scormScoeIdSchema.parse({ id });
  const newScormScoe = updateScormScoeSchema.parse(scormScoe);
  try {
    const [s] =  await db
     .update(scormScoes)
     .set(newScormScoe)
     .where(eq(scormScoes.id, scormScoeId!))
     .returning();
    return { scormScoe: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteScormScoe = async (id: ScormScoeId) => {
  const { id: scormScoeId } = scormScoeIdSchema.parse({ id });
  try {
    const [s] =  await db.delete(scormScoes).where(eq(scormScoes.id, scormScoeId!))
    .returning();
    return { scormScoe: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

