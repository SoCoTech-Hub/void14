import type {
  NewQtypeMultichoiceOptionParams,
  QtypeMultichoiceOptionId,
  UpdateQtypeMultichoiceOptionParams,
} from "@soco/qtype-db/schema/qtypeMultichoiceOptions";
import { eq } from "@soco/qtype-db";
import { db } from "@soco/qtype-db/client";
import {
  insertQtypeMultichoiceOptionSchema,
  qtypeMultichoiceOptionIdSchema,
  qtypeMultichoiceOptions,
  updateQtypeMultichoiceOptionSchema,
} from "@soco/qtype-db/schema/qtypeMultichoiceOptions";

export const createQtypeMultichoiceOption = async (
  qtypeMultichoiceOption: NewQtypeMultichoiceOptionParams,
) => {
  const newQtypeMultichoiceOption = insertQtypeMultichoiceOptionSchema.parse(
    qtypeMultichoiceOption,
  );
  try {
    const [q] = await db
      .insert(qtypeMultichoiceOptions)
      .values(newQtypeMultichoiceOption)
      .returning();
    return { qtypeMultichoiceOption: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateQtypeMultichoiceOption = async (
  id: QtypeMultichoiceOptionId,
  qtypeMultichoiceOption: UpdateQtypeMultichoiceOptionParams,
) => {
  const { id: qtypeMultichoiceOptionId } = qtypeMultichoiceOptionIdSchema.parse(
    { id },
  );
  const newQtypeMultichoiceOption = updateQtypeMultichoiceOptionSchema.parse(
    qtypeMultichoiceOption,
  );
  try {
    const [q] = await db
      .update(qtypeMultichoiceOptions)
      .set(newQtypeMultichoiceOption)
      .where(eq(qtypeMultichoiceOptions.id, qtypeMultichoiceOptionId!))
      .returning();
    return { qtypeMultichoiceOption: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteQtypeMultichoiceOption = async (
  id: QtypeMultichoiceOptionId,
) => {
  const { id: qtypeMultichoiceOptionId } = qtypeMultichoiceOptionIdSchema.parse(
    { id },
  );
  try {
    const [q] = await db
      .delete(qtypeMultichoiceOptions)
      .where(eq(qtypeMultichoiceOptions.id, qtypeMultichoiceOptionId!))
      .returning();
    return { qtypeMultichoiceOption: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
