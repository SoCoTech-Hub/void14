import type {
  NewQtypeRandomsamatchOptionParams,
  QtypeRandomsamatchOptionId,
  UpdateQtypeRandomsamatchOptionParams,
} from "@soco/qtype-db/schema/qtypeRandomsamatchOptions";
import { eq } from "@soco/qtype-db";
import { db } from "@soco/qtype-db/client";
import {
  insertQtypeRandomsamatchOptionSchema,
  qtypeRandomsamatchOptionIdSchema,
  qtypeRandomsamatchOptions,
  updateQtypeRandomsamatchOptionSchema,
} from "@soco/qtype-db/schema/qtypeRandomsamatchOptions";

export const createQtypeRandomsamatchOption = async (
  qtypeRandomsamatchOption: NewQtypeRandomsamatchOptionParams,
) => {
  const newQtypeRandomsamatchOption =
    insertQtypeRandomsamatchOptionSchema.parse(qtypeRandomsamatchOption);
  try {
    const [q] = await db
      .insert(qtypeRandomsamatchOptions)
      .values(newQtypeRandomsamatchOption)
      .returning();
    return { qtypeRandomsamatchOption: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateQtypeRandomsamatchOption = async (
  id: QtypeRandomsamatchOptionId,
  qtypeRandomsamatchOption: UpdateQtypeRandomsamatchOptionParams,
) => {
  const { id: qtypeRandomsamatchOptionId } =
    qtypeRandomsamatchOptionIdSchema.parse({ id });
  const newQtypeRandomsamatchOption =
    updateQtypeRandomsamatchOptionSchema.parse(qtypeRandomsamatchOption);
  try {
    const [q] = await db
      .update(qtypeRandomsamatchOptions)
      .set(newQtypeRandomsamatchOption)
      .where(eq(qtypeRandomsamatchOptions.id, qtypeRandomsamatchOptionId!))
      .returning();
    return { qtypeRandomsamatchOption: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteQtypeRandomsamatchOption = async (
  id: QtypeRandomsamatchOptionId,
) => {
  const { id: qtypeRandomsamatchOptionId } =
    qtypeRandomsamatchOptionIdSchema.parse({ id });
  try {
    const [q] = await db
      .delete(qtypeRandomsamatchOptions)
      .where(eq(qtypeRandomsamatchOptions.id, qtypeRandomsamatchOptionId!))
      .returning();
    return { qtypeRandomsamatchOption: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
