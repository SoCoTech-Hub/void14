import type {
  NewQtypeDdmarkerDragParams,
  QtypeDdmarkerDragId,
  UpdateQtypeDdmarkerDragParams,
} from "@soco/qtype-db/schema/qtypeDdmarkerDrags";
import { eq } from "@soco/qtype-db";
import { db } from "@soco/qtype-db/client";
import {
  insertQtypeDdmarkerDragSchema,
  qtypeDdmarkerDragIdSchema,
  qtypeDdmarkerDrags,
  updateQtypeDdmarkerDragSchema,
} from "@soco/qtype-db/schema/qtypeDdmarkerDrags";

export const createQtypeDdmarkerDrag = async (
  qtypeDdmarkerDrag: NewQtypeDdmarkerDragParams,
) => {
  const newQtypeDdmarkerDrag =
    insertQtypeDdmarkerDragSchema.parse(qtypeDdmarkerDrag);
  try {
    const [q] = await db
      .insert(qtypeDdmarkerDrags)
      .values(newQtypeDdmarkerDrag)
      .returning();
    return { qtypeDdmarkerDrag: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateQtypeDdmarkerDrag = async (
  id: QtypeDdmarkerDragId,
  qtypeDdmarkerDrag: UpdateQtypeDdmarkerDragParams,
) => {
  const { id: qtypeDdmarkerDragId } = qtypeDdmarkerDragIdSchema.parse({ id });
  const newQtypeDdmarkerDrag =
    updateQtypeDdmarkerDragSchema.parse(qtypeDdmarkerDrag);
  try {
    const [q] = await db
      .update(qtypeDdmarkerDrags)
      .set(newQtypeDdmarkerDrag)
      .where(eq(qtypeDdmarkerDrags.id, qtypeDdmarkerDragId!))
      .returning();
    return { qtypeDdmarkerDrag: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteQtypeDdmarkerDrag = async (id: QtypeDdmarkerDragId) => {
  const { id: qtypeDdmarkerDragId } = qtypeDdmarkerDragIdSchema.parse({ id });
  try {
    const [q] = await db
      .delete(qtypeDdmarkerDrags)
      .where(eq(qtypeDdmarkerDrags.id, qtypeDdmarkerDragId!))
      .returning();
    return { qtypeDdmarkerDrag: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
