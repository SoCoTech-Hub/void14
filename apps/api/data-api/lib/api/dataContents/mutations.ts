import { eq } from "drizzle-orm";

import { db } from "../../db/index";
import {
  DataContentId,
  dataContentIdSchema,
  dataContents,
  insertDataContentSchema,
  NewDataContentParams,
  UpdateDataContentParams,
  updateDataContentSchema,
} from "../../db/schema/dataContents";

export const createDataContent = async (dataContent: NewDataContentParams) => {
  const newDataContent = insertDataContentSchema.parse(dataContent);
  try {
    const [d] = await db
      .insert(dataContents)
      .values(newDataContent)
      .returning();
    return { dataContent: d };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateDataContent = async (
  id: DataContentId,
  dataContent: UpdateDataContentParams,
) => {
  const { id: dataContentId } = dataContentIdSchema.parse({ id });
  const newDataContent = updateDataContentSchema.parse(dataContent);
  try {
    const [d] = await db
      .update(dataContents)
      .set(newDataContent)
      .where(eq(dataContents.id, dataContentId!))
      .returning();
    return { dataContent: d };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteDataContent = async (id: DataContentId) => {
  const { id: dataContentId } = dataContentIdSchema.parse({ id });
  try {
    const [d] = await db
      .delete(dataContents)
      .where(eq(dataContents.id, dataContentId!))
      .returning();
    return { dataContent: d };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
