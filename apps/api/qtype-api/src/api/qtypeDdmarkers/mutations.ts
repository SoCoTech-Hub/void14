import type {
  NewQtypeDdmarkerParams,
  QtypeDdmarkerId,
  UpdateQtypeDdmarkerParams,
} from "@soco/qtype-db/schema/qtypeDdmarkers";
import { eq } from "@soco/qtype-db";
import { db } from "@soco/qtype-db/client";
import {
  insertQtypeDdmarkerSchema,
  qtypeDdmarkerIdSchema,
  qtypeDdmarkers,
  updateQtypeDdmarkerSchema,
} from "@soco/qtype-db/schema/qtypeDdmarkers";

export const createQtypeDdmarker = async (
  qtypeDdmarker: NewQtypeDdmarkerParams,
) => {
  const newQtypeDdmarker = insertQtypeDdmarkerSchema.parse(qtypeDdmarker);
  try {
    const [q] = await db
      .insert(qtypeDdmarkers)
      .values(newQtypeDdmarker)
      .returning();
    return { qtypeDdmarker: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateQtypeDdmarker = async (
  id: QtypeDdmarkerId,
  qtypeDdmarker: UpdateQtypeDdmarkerParams,
) => {
  const { id: qtypeDdmarkerId } = qtypeDdmarkerIdSchema.parse({ id });
  const newQtypeDdmarker = updateQtypeDdmarkerSchema.parse(qtypeDdmarker);
  try {
    const [q] = await db
      .update(qtypeDdmarkers)
      .set(newQtypeDdmarker)
      .where(eq(qtypeDdmarkers.id, qtypeDdmarkerId!))
      .returning();
    return { qtypeDdmarker: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteQtypeDdmarker = async (id: QtypeDdmarkerId) => {
  const { id: qtypeDdmarkerId } = qtypeDdmarkerIdSchema.parse({ id });
  try {
    const [q] = await db
      .delete(qtypeDdmarkers)
      .where(eq(qtypeDdmarkers.id, qtypeDdmarkerId!))
      .returning();
    return { qtypeDdmarker: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
