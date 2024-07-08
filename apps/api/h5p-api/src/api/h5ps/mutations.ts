import { db } from "@soco/h5p-db/index";
import { eq } from "drizzle-orm";
import { 
  H5pId, 
  NewH5pParams,
  UpdateH5pParams, 
  updateH5pSchema,
  insertH5pSchema, 
  h5ps,
  h5pIdSchema 
} from "@soco/h5p-db/schema/h5ps";

export const createH5p = async (h5p: NewH5pParams) => {
  const newH5p = insertH5pSchema.parse(h5p);
  try {
    const [h] =  await db.insert(h5ps).values(newH5p).returning();
    return { h5p: h };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateH5p = async (id: H5pId, h5p: UpdateH5pParams) => {
  const { id: h5pId } = h5pIdSchema.parse({ id });
  const newH5p = updateH5pSchema.parse(h5p);
  try {
    const [h] =  await db
     .update(h5ps)
     .set({...newH5p, updatedAt: new Date() })
     .where(eq(h5ps.id, h5pId!))
     .returning();
    return { h5p: h };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteH5p = async (id: H5pId) => {
  const { id: h5pId } = h5pIdSchema.parse({ id });
  try {
    const [h] =  await db.delete(h5ps).where(eq(h5ps.id, h5pId!))
    .returning();
    return { h5p: h };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

