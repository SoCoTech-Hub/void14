import { db } from "@soco/qtype-db/client";
import { eq } from "@soco/qtype-db";
import { 
  QtypeShortanswerOptionId, 
  NewQtypeShortanswerOptionParams,
  UpdateQtypeShortanswerOptionParams, 
  updateQtypeShortanswerOptionSchema,
  insertQtypeShortanswerOptionSchema, 
  qtypeShortanswerOptions,
  qtypeShortanswerOptionIdSchema 
} from "@soco/qtype-db/schema/qtypeShortanswerOptions";

export const createQtypeShortanswerOption = async (qtypeShortanswerOption: NewQtypeShortanswerOptionParams) => {
  const newQtypeShortanswerOption = insertQtypeShortanswerOptionSchema.parse(qtypeShortanswerOption);
  try {
    const [q] =  await db.insert(qtypeShortanswerOptions).values(newQtypeShortanswerOption).returning();
    return { qtypeShortanswerOption: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateQtypeShortanswerOption = async (id: QtypeShortanswerOptionId, qtypeShortanswerOption: UpdateQtypeShortanswerOptionParams) => {
  const { id: qtypeShortanswerOptionId } = qtypeShortanswerOptionIdSchema.parse({ id });
  const newQtypeShortanswerOption = updateQtypeShortanswerOptionSchema.parse(qtypeShortanswerOption);
  try {
    const [q] =  await db
     .update(qtypeShortanswerOptions)
     .set(newQtypeShortanswerOption)
     .where(eq(qtypeShortanswerOptions.id, qtypeShortanswerOptionId!))
     .returning();
    return { qtypeShortanswerOption: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteQtypeShortanswerOption = async (id: QtypeShortanswerOptionId) => {
  const { id: qtypeShortanswerOptionId } = qtypeShortanswerOptionIdSchema.parse({ id });
  try {
    const [q] =  await db.delete(qtypeShortanswerOptions).where(eq(qtypeShortanswerOptions.id, qtypeShortanswerOptionId!))
    .returning();
    return { qtypeShortanswerOption: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

