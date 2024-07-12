import type {
  ContextTempId,
  NewContextTempParams,
  UpdateContextTempParams,
} from "@soco/context-db/schema/contextTemp";
import { eq } from "@soco/context-db";
import { db } from "@soco/context-db/client";
import {
  contextTemp,
  contextTempIdSchema,
  insertContextTempSchema,
  updateContextTempSchema,
} from "@soco/context-db/schema/contextTemp";

export const createContextTemp = async (contextTemp: NewContextTempParams) => {
  const newContextTemp = insertContextTempSchema.parse(contextTemp);
  try {
    const [c] = await db.insert(contextTemp).values(newContextTemp).returning();
    return { contextTemp: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateContextTemp = async (
  id: ContextTempId,
  contextTemp: UpdateContextTempParams,
) => {
  const { id: contextTempId } = contextTempIdSchema.parse({ id });
  const newContextTemp = updateContextTempSchema.parse(contextTemp);
  try {
    const [c] = await db
      .update(contextTemp)
      .set(newContextTemp)
      .where(eq(contextTemp.id, contextTempId!))
      .returning();
    return { contextTemp: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteContextTemp = async (id: ContextTempId) => {
  const { id: contextTempId } = contextTempIdSchema.parse({ id });
  try {
    const [c] = await db
      .delete(contextTemp)
      .where(eq(contextTemp.id, contextTempId!))
      .returning();
    return { contextTemp: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
