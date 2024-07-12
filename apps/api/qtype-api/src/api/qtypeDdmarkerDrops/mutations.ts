import { db } from "@soco/qtype-db/client";
import { eq } from "@soco/qtype-db";
import { 
  type QtypeDdmarkerDropId, 
  type NewQtypeDdmarkerDropParams,
  type UpdateQtypeDdmarkerDropParams, 
  updateQtypeDdmarkerDropSchema,
  insertQtypeDdmarkerDropSchema, 
  qtypeDdmarkerDrops,
  qtypeDdmarkerDropIdSchema 
} from "@soco/qtype-db/schema/qtypeDdmarkerDrops";

export const createQtypeDdmarkerDrop = async (qtypeDdmarkerDrop: NewQtypeDdmarkerDropParams) => {
  const newQtypeDdmarkerDrop = insertQtypeDdmarkerDropSchema.parse(qtypeDdmarkerDrop);
  try {
    const [q] =  await db.insert(qtypeDdmarkerDrops).values(newQtypeDdmarkerDrop).returning();
    return { qtypeDdmarkerDrop: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateQtypeDdmarkerDrop = async (id: QtypeDdmarkerDropId, qtypeDdmarkerDrop: UpdateQtypeDdmarkerDropParams) => {
  const { id: qtypeDdmarkerDropId } = qtypeDdmarkerDropIdSchema.parse({ id });
  const newQtypeDdmarkerDrop = updateQtypeDdmarkerDropSchema.parse(qtypeDdmarkerDrop);
  try {
    const [q] =  await db
     .update(qtypeDdmarkerDrops)
     .set(newQtypeDdmarkerDrop)
     .where(eq(qtypeDdmarkerDrops.id, qtypeDdmarkerDropId!))
     .returning();
    return { qtypeDdmarkerDrop: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteQtypeDdmarkerDrop = async (id: QtypeDdmarkerDropId) => {
  const { id: qtypeDdmarkerDropId } = qtypeDdmarkerDropIdSchema.parse({ id });
  try {
    const [q] =  await db.delete(qtypeDdmarkerDrops).where(eq(qtypeDdmarkerDrops.id, qtypeDdmarkerDropId!))
    .returning();
    return { qtypeDdmarkerDrop: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

