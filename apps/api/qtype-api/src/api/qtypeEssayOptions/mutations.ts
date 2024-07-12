import type {
  NewQtypeEssayOptionParams,
  QtypeEssayOptionId,
  UpdateQtypeEssayOptionParams,
} from "@soco/qtype-db/schema/qtypeEssayOptions";
import { eq } from "@soco/qtype-db";
import { db } from "@soco/qtype-db/client";
import {
  insertQtypeEssayOptionSchema,
  qtypeEssayOptionIdSchema,
  qtypeEssayOptions,
  updateQtypeEssayOptionSchema,
} from "@soco/qtype-db/schema/qtypeEssayOptions";

export const createQtypeEssayOption = async (
  qtypeEssayOption: NewQtypeEssayOptionParams,
) => {
  const newQtypeEssayOption =
    insertQtypeEssayOptionSchema.parse(qtypeEssayOption);
  try {
    const [q] = await db
      .insert(qtypeEssayOptions)
      .values(newQtypeEssayOption)
      .returning();
    return { qtypeEssayOption: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateQtypeEssayOption = async (
  id: QtypeEssayOptionId,
  qtypeEssayOption: UpdateQtypeEssayOptionParams,
) => {
  const { id: qtypeEssayOptionId } = qtypeEssayOptionIdSchema.parse({ id });
  const newQtypeEssayOption =
    updateQtypeEssayOptionSchema.parse(qtypeEssayOption);
  try {
    const [q] = await db
      .update(qtypeEssayOptions)
      .set(newQtypeEssayOption)
      .where(eq(qtypeEssayOptions.id, qtypeEssayOptionId!))
      .returning();
    return { qtypeEssayOption: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteQtypeEssayOption = async (id: QtypeEssayOptionId) => {
  const { id: qtypeEssayOptionId } = qtypeEssayOptionIdSchema.parse({ id });
  try {
    const [q] = await db
      .delete(qtypeEssayOptions)
      .where(eq(qtypeEssayOptions.id, qtypeEssayOptionId!))
      .returning();
    return { qtypeEssayOption: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
