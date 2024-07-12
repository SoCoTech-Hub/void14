import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { 
  type MnetServiceId, 
  type NewMnetServiceParams,
  type UpdateMnetServiceParams, 
  updateMnetServiceSchema,
  insertMnetServiceSchema, 
  mnetServices,
  mnetServiceIdSchema 
} from "@/lib/db/schema/mnetServices";

export const createMnetService = async (mnetService: NewMnetServiceParams) => {
  const newMnetService = insertMnetServiceSchema.parse(mnetService);
  try {
    const [m] =  await db.insert(mnetServices).values(newMnetService).returning();
    return { mnetService: m };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateMnetService = async (id: MnetServiceId, mnetService: UpdateMnetServiceParams) => {
  const { id: mnetServiceId } = mnetServiceIdSchema.parse({ id });
  const newMnetService = updateMnetServiceSchema.parse(mnetService);
  try {
    const [m] =  await db
     .update(mnetServices)
     .set(newMnetService)
     .where(eq(mnetServices.id, mnetServiceId!))
     .returning();
    return { mnetService: m };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteMnetService = async (id: MnetServiceId) => {
  const { id: mnetServiceId } = mnetServiceIdSchema.parse({ id });
  try {
    const [m] =  await db.delete(mnetServices).where(eq(mnetServices.id, mnetServiceId!))
    .returning();
    return { mnetService: m };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

