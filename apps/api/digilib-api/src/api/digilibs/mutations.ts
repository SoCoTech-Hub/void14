import { db } from "@soco/digilib-db/client";
import { eq } from "@soco/digilib-db";
import { 
  DigilibId, 
  NewDigilibParams,
  UpdateDigilibParams, 
  updateDigilibSchema,
  insertDigilibSchema, 
  digilibs,
  digilibIdSchema 
} from "@soco/digilib-db/schema/digilibs";

export const createDigilib = async (digilib: NewDigilibParams) => {
  const newDigilib = insertDigilibSchema.parse(digilib);
  try {
    const [d] =  await db.insert(digilibs).values(newDigilib).returning();
    return { digilib: d };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateDigilib = async (id: DigilibId, digilib: UpdateDigilibParams) => {
  const { id: digilibId } = digilibIdSchema.parse({ id });
  const newDigilib = updateDigilibSchema.parse(digilib);
  try {
    const [d] =  await db
     .update(digilibs)
     .set({...newDigilib, updatedAt: new Date() })
     .where(eq(digilibs.id, digilibId!))
     .returning();
    return { digilib: d };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteDigilib = async (id: DigilibId) => {
  const { id: digilibId } = digilibIdSchema.parse({ id });
  try {
    const [d] =  await db.delete(digilibs).where(eq(digilibs.id, digilibId!))
    .returning();
    return { digilib: d };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

