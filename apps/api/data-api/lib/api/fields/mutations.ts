import { eq } from "drizzle-orm";

import { db } from "../../db/index";
import {
  FieldId,
  fieldIdSchema,
  fields,
  insertFieldSchema,
  NewFieldParams,
  UpdateFieldParams,
  updateFieldSchema,
} from "../../db/schema/fields";

export const createField = async (field: NewFieldParams) => {
  const newField = insertFieldSchema.parse(field);
  try {
    const [f] = await db.insert(fields).values(newField).returning();
    return { field: f };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateField = async (id: FieldId, field: UpdateFieldParams) => {
  const { id: fieldId } = fieldIdSchema.parse({ id });
  const newField = updateFieldSchema.parse(field);
  try {
    const [f] = await db
      .update(fields)
      .set(newField)
      .where(eq(fields.id, fieldId!))
      .returning();
    return { field: f };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteField = async (id: FieldId) => {
  const { id: fieldId } = fieldIdSchema.parse({ id });
  try {
    const [f] = await db
      .delete(fields)
      .where(eq(fields.id, fieldId!))
      .returning();
    return { field: f };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
