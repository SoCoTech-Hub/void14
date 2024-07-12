import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { 
  type QtypeMatchOptionId, 
  type NewQtypeMatchOptionParams,
  type UpdateQtypeMatchOptionParams, 
  updateQtypeMatchOptionSchema,
  insertQtypeMatchOptionSchema, 
  qtypeMatchOptions,
  qtypeMatchOptionIdSchema 
} from "@/lib/db/schema/qtypeMatchOptions";

export const createQtypeMatchOption = async (qtypeMatchOption: NewQtypeMatchOptionParams) => {
  const newQtypeMatchOption = insertQtypeMatchOptionSchema.parse(qtypeMatchOption);
  try {
    const [q] =  await db.insert(qtypeMatchOptions).values(newQtypeMatchOption).returning();
    return { qtypeMatchOption: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateQtypeMatchOption = async (id: QtypeMatchOptionId, qtypeMatchOption: UpdateQtypeMatchOptionParams) => {
  const { id: qtypeMatchOptionId } = qtypeMatchOptionIdSchema.parse({ id });
  const newQtypeMatchOption = updateQtypeMatchOptionSchema.parse(qtypeMatchOption);
  try {
    const [q] =  await db
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
    const [q] =  await db.delete(qtypeMatchOptions).where(eq(qtypeMatchOptions.id, qtypeMatchOptionId!))
    .returning();
    return { qtypeMatchOption: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

