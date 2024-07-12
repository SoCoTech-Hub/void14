import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { 
  type H5pactivityId, 
  type NewH5pactivityParams,
  type UpdateH5pactivityParams, 
  updateH5pactivitySchema,
  insertH5pactivitySchema, 
  h5pactivities,
  h5pactivityIdSchema 
} from "@/lib/db/schema/h5pactivities";

export const createH5pactivity = async (h5pactivity: NewH5pactivityParams) => {
  const newH5pactivity = insertH5pactivitySchema.parse(h5pactivity);
  try {
    const [h] =  await db.insert(h5pactivities).values(newH5pactivity).returning();
    return { h5pactivity: h };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateH5pactivity = async (id: H5pactivityId, h5pactivity: UpdateH5pactivityParams) => {
  const { id: h5pactivityId } = h5pactivityIdSchema.parse({ id });
  const newH5pactivity = updateH5pactivitySchema.parse(h5pactivity);
  try {
    const [h] =  await db
     .update(h5pactivities)
     .set({...newH5pactivity, updatedAt: new Date() })
     .where(eq(h5pactivities.id, h5pactivityId!))
     .returning();
    return { h5pactivity: h };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteH5pactivity = async (id: H5pactivityId) => {
  const { id: h5pactivityId } = h5pactivityIdSchema.parse({ id });
  try {
    const [h] =  await db.delete(h5pactivities).where(eq(h5pactivities.id, h5pactivityId!))
    .returning();
    return { h5pactivity: h };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

