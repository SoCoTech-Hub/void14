import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { 
  ImscpId, 
  NewImscpParams,
  UpdateImscpParams, 
  updateImscpSchema,
  insertImscpSchema, 
  imscps,
  imscpIdSchema 
} from "@/lib/db/schema/imscps";

export const createImscp = async (imscp: NewImscpParams) => {
  const newImscp = insertImscpSchema.parse(imscp);
  try {
    const [i] =  await db.insert(imscps).values(newImscp).returning();
    return { imscp: i };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateImscp = async (id: ImscpId, imscp: UpdateImscpParams) => {
  const { id: imscpId } = imscpIdSchema.parse({ id });
  const newImscp = updateImscpSchema.parse(imscp);
  try {
    const [i] =  await db
     .update(imscps)
     .set({...newImscp, updatedAt: new Date() })
     .where(eq(imscps.id, imscpId!))
     .returning();
    return { imscp: i };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteImscp = async (id: ImscpId) => {
  const { id: imscpId } = imscpIdSchema.parse({ id });
  try {
    const [i] =  await db.delete(imscps).where(eq(imscps.id, imscpId!))
    .returning();
    return { imscp: i };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

