import { eq } from "drizzle-orm";

import { db } from "../db/index";
import {
  insertQtypeDdimageortextSchema,
  NewQtypeDdimageortextParams,
  QtypeDdimageortextId,
  qtypeDdimageortextIdSchema,
  qtypeDdimageortexts,
  UpdateQtypeDdimageortextParams,
  updateQtypeDdimageortextSchema,
} from "../db/schema/qtypeDdimageortexts";

export const createQtypeDdimageortext = async (
  qtypeDdimageortext: NewQtypeDdimageortextParams,
) => {
  const newQtypeDdimageortext =
    insertQtypeDdimageortextSchema.parse(qtypeDdimageortext);
  try {
    const [q] = await db
      .insert(qtypeDdimageortexts)
      .values(newQtypeDdimageortext)
      .returning();
    return { qtypeDdimageortext: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateQtypeDdimageortext = async (
  id: QtypeDdimageortextId,
  qtypeDdimageortext: UpdateQtypeDdimageortextParams,
) => {
  const { id: qtypeDdimageortextId } = qtypeDdimageortextIdSchema.parse({ id });
  const newQtypeDdimageortext =
    updateQtypeDdimageortextSchema.parse(qtypeDdimageortext);
  try {
    const [q] = await db
      .update(qtypeDdimageortexts)
      .set(newQtypeDdimageortext)
      .where(eq(qtypeDdimageortexts.id, qtypeDdimageortextId!))
      .returning();
    return { qtypeDdimageortext: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteQtypeDdimageortext = async (id: QtypeDdimageortextId) => {
  const { id: qtypeDdimageortextId } = qtypeDdimageortextIdSchema.parse({ id });
  try {
    const [q] = await db
      .delete(qtypeDdimageortexts)
      .where(eq(qtypeDdimageortexts.id, qtypeDdimageortextId!))
      .returning();
    return { qtypeDdimageortext: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
