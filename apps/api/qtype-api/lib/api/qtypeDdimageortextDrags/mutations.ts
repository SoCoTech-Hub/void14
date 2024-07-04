import { eq } from "drizzle-orm";

import { db } from "../db/index";
import {
  insertQtypeDdimageortextDragSchema,
  NewQtypeDdimageortextDragParams,
  QtypeDdimageortextDragId,
  qtypeDdimageortextDragIdSchema,
  qtypeDdimageortextDrags,
  UpdateQtypeDdimageortextDragParams,
  updateQtypeDdimageortextDragSchema,
} from "../db/schema/qtypeDdimageortextDrags";

export const createQtypeDdimageortextDrag = async (
  qtypeDdimageortextDrag: NewQtypeDdimageortextDragParams,
) => {
  const newQtypeDdimageortextDrag = insertQtypeDdimageortextDragSchema.parse(
    qtypeDdimageortextDrag,
  );
  try {
    const [q] = await db
      .insert(qtypeDdimageortextDrags)
      .values(newQtypeDdimageortextDrag)
      .returning();
    return { qtypeDdimageortextDrag: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateQtypeDdimageortextDrag = async (
  id: QtypeDdimageortextDragId,
  qtypeDdimageortextDrag: UpdateQtypeDdimageortextDragParams,
) => {
  const { id: qtypeDdimageortextDragId } = qtypeDdimageortextDragIdSchema.parse(
    { id },
  );
  const newQtypeDdimageortextDrag = updateQtypeDdimageortextDragSchema.parse(
    qtypeDdimageortextDrag,
  );
  try {
    const [q] = await db
      .update(qtypeDdimageortextDrags)
      .set(newQtypeDdimageortextDrag)
      .where(eq(qtypeDdimageortextDrags.id, qtypeDdimageortextDragId!))
      .returning();
    return { qtypeDdimageortextDrag: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteQtypeDdimageortextDrag = async (
  id: QtypeDdimageortextDragId,
) => {
  const { id: qtypeDdimageortextDragId } = qtypeDdimageortextDragIdSchema.parse(
    { id },
  );
  try {
    const [q] = await db
      .delete(qtypeDdimageortextDrags)
      .where(eq(qtypeDdimageortextDrags.id, qtypeDdimageortextDragId!))
      .returning();
    return { qtypeDdimageortextDrag: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
