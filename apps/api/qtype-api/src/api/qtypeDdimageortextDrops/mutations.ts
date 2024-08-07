import type {
  NewQtypeDdimageortextDropParams,
  QtypeDdimageortextDropId,
  UpdateQtypeDdimageortextDropParams,
} from "@soco/qtype-db/schema/qtypeDdimageortextDrops";
import { eq } from "@soco/qtype-db";
import { db } from "@soco/qtype-db/client";
import {
  insertQtypeDdimageortextDropSchema,
  qtypeDdimageortextDropIdSchema,
  qtypeDdimageortextDrops,
  updateQtypeDdimageortextDropSchema,
} from "@soco/qtype-db/schema/qtypeDdimageortextDrops";

export const createQtypeDdimageortextDrop = async (
  qtypeDdimageortextDrop: NewQtypeDdimageortextDropParams,
) => {
  const newQtypeDdimageortextDrop = insertQtypeDdimageortextDropSchema.parse(
    qtypeDdimageortextDrop,
  );
  try {
    const [q] = await db
      .insert(qtypeDdimageortextDrops)
      .values(newQtypeDdimageortextDrop)
      .returning();
    return { qtypeDdimageortextDrop: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateQtypeDdimageortextDrop = async (
  id: QtypeDdimageortextDropId,
  qtypeDdimageortextDrop: UpdateQtypeDdimageortextDropParams,
) => {
  const { id: qtypeDdimageortextDropId } = qtypeDdimageortextDropIdSchema.parse(
    { id },
  );
  const newQtypeDdimageortextDrop = updateQtypeDdimageortextDropSchema.parse(
    qtypeDdimageortextDrop,
  );
  try {
    const [q] = await db
      .update(qtypeDdimageortextDrops)
      .set(newQtypeDdimageortextDrop)
      .where(eq(qtypeDdimageortextDrops.id, qtypeDdimageortextDropId!))
      .returning();
    return { qtypeDdimageortextDrop: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteQtypeDdimageortextDrop = async (
  id: QtypeDdimageortextDropId,
) => {
  const { id: qtypeDdimageortextDropId } = qtypeDdimageortextDropIdSchema.parse(
    { id },
  );
  try {
    const [q] = await db
      .delete(qtypeDdimageortextDrops)
      .where(eq(qtypeDdimageortextDrops.id, qtypeDdimageortextDropId!))
      .returning();
    return { qtypeDdimageortextDrop: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
