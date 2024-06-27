import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { 
  H5pactivityAttemptsResultId, 
  NewH5pactivityAttemptsResultParams,
  UpdateH5pactivityAttemptsResultParams, 
  updateH5pactivityAttemptsResultSchema,
  insertH5pactivityAttemptsResultSchema, 
  h5pactivityAttemptsResults,
  h5pactivityAttemptsResultIdSchema 
} from "@/lib/db/schema/h5pactivityAttemptsResults";

export const createH5pactivityAttemptsResult = async (h5pactivityAttemptsResult: NewH5pactivityAttemptsResultParams) => {
  const newH5pactivityAttemptsResult = insertH5pactivityAttemptsResultSchema.parse(h5pactivityAttemptsResult);
  try {
    const [h] =  await db.insert(h5pactivityAttemptsResults).values(newH5pactivityAttemptsResult).returning();
    return { h5pactivityAttemptsResult: h };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateH5pactivityAttemptsResult = async (id: H5pactivityAttemptsResultId, h5pactivityAttemptsResult: UpdateH5pactivityAttemptsResultParams) => {
  const { id: h5pactivityAttemptsResultId } = h5pactivityAttemptsResultIdSchema.parse({ id });
  const newH5pactivityAttemptsResult = updateH5pactivityAttemptsResultSchema.parse(h5pactivityAttemptsResult);
  try {
    const [h] =  await db
     .update(h5pactivityAttemptsResults)
     .set({...newH5pactivityAttemptsResult, updatedAt: new Date() })
     .where(eq(h5pactivityAttemptsResults.id, h5pactivityAttemptsResultId!))
     .returning();
    return { h5pactivityAttemptsResult: h };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteH5pactivityAttemptsResult = async (id: H5pactivityAttemptsResultId) => {
  const { id: h5pactivityAttemptsResultId } = h5pactivityAttemptsResultIdSchema.parse({ id });
  try {
    const [h] =  await db.delete(h5pactivityAttemptsResults).where(eq(h5pactivityAttemptsResults.id, h5pactivityAttemptsResultId!))
    .returning();
    return { h5pactivityAttemptsResult: h };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

