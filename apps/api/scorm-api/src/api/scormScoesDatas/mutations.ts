import type {
  NewScormScoesDataParams,
  ScormScoesDataId,
  UpdateScormScoesDataParams,
} from "@soco/scorm-db/schema/scormScoesDatas";
import { eq } from "@soco/scorm-db";
import { db } from "@soco/scorm-db/client";
import {
  insertScormScoesDataSchema,
  scormScoesDataIdSchema,
  scormScoesDatas,
  updateScormScoesDataSchema,
} from "@soco/scorm-db/schema/scormScoesDatas";

export const createScormScoesData = async (
  scormScoesData: NewScormScoesDataParams,
) => {
  const newScormScoesData = insertScormScoesDataSchema.parse(scormScoesData);
  try {
    const [s] = await db
      .insert(scormScoesDatas)
      .values(newScormScoesData)
      .returning();
    return { scormScoesData: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateScormScoesData = async (
  id: ScormScoesDataId,
  scormScoesData: UpdateScormScoesDataParams,
) => {
  const { id: scormScoesDataId } = scormScoesDataIdSchema.parse({ id });
  const newScormScoesData = updateScormScoesDataSchema.parse(scormScoesData);
  try {
    const [s] = await db
      .update(scormScoesDatas)
      .set(newScormScoesData)
      .where(eq(scormScoesDatas.id, scormScoesDataId!))
      .returning();
    return { scormScoesData: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteScormScoesData = async (id: ScormScoesDataId) => {
  const { id: scormScoesDataId } = scormScoesDataIdSchema.parse({ id });
  try {
    const [s] = await db
      .delete(scormScoesDatas)
      .where(eq(scormScoesDatas.id, scormScoesDataId!))
      .returning();
    return { scormScoesData: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
