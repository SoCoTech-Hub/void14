import type {
  LabelId,
  NewLabelParams,
  UpdateLabelParams,
} from "@soco/label-db/schema/labels";
import { eq } from "@soco/label-db";
import { db } from "@soco/label-db/client";
import {
  insertLabelSchema,
  labelIdSchema,
  labels,
  updateLabelSchema,
} from "@soco/label-db/schema/labels";

export const createLabel = async (label: NewLabelParams) => {
  const newLabel = insertLabelSchema.parse(label);
  try {
    const [l] = await db.insert(labels).values(newLabel).returning();
    return { label: l };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateLabel = async (id: LabelId, label: UpdateLabelParams) => {
  const { id: labelId } = labelIdSchema.parse({ id });
  const newLabel = updateLabelSchema.parse(label);
  try {
    const [l] = await db
      .update(labels)
      .set({ ...newLabel, updatedAt: new Date() })
      .where(eq(labels.id, labelId!))
      .returning();
    return { label: l };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteLabel = async (id: LabelId) => {
  const { id: labelId } = labelIdSchema.parse({ id });
  try {
    const [l] = await db
      .delete(labels)
      .where(eq(labels.id, labelId!))
      .returning();
    return { label: l };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
