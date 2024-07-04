import { eq } from "drizzle-orm";

import { db } from "../db/index";
import {
  insertQtypeMatchOptionSchema,
  NewQtypeMatchOptionParams,
  QtypeMatchOptionId,
  qtypeMatchOptionIdSchema,
  qtypeMatchOptions,
  UpdateQtypeMatchOptionParams,
  updateQtypeMatchOptionSchema,
} from "../db/schema/qtypeMatchOptions";

export const createQtypeMatchOption = async (
  qtypeMatchOption: NewQtypeMatchOptionParams,
) => {
  const newQtypeMatchOption =
    insertQtypeMatchOptionSchema.parse(qtypeMatchOption);
  try {
    const [q] = await db
      .insert(qtypeMatchOptions)
      .values(newQtypeMatchOption)
      .returning();
    return { qtypeMatchOption: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateQtypeMatchOption = async (
  id: QtypeMatchOptionId,
  qtypeMatchOption: UpdateQtypeMatchOptionParams,
) => {
  const { id: qtypeMatchOptionId } = qtypeMatchOptionIdSchema.parse({ id });
  const newQtypeMatchOption =
    updateQtypeMatchOptionSchema.parse(qtypeMatchOption);
  try {
    const [q] = await db
      .update(qtypeMatchOptions)
      .set(newQtypeMatchOption)
      .where(eq(qtypeMatchOptions.id, qtypeMatchOptionId!))
      .returning();
    return { qtypeMatchOption: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteQtypeMatchOption = async (id: QtypeMatchOptionId) => {
  const { id: qtypeMatchOptionId } = qtypeMatchOptionIdSchema.parse({ id });
  try {
    const [q] = await db
      .delete(qtypeMatchOptions)
      .where(eq(qtypeMatchOptions.id, qtypeMatchOptionId!))
      .returning();
    return { qtypeMatchOption: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
