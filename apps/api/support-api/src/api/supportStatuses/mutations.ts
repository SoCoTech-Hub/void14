import { db } from "@soco/support-db/client";
import { eq } from "@soco/support-db";
import { 
  SupportStatusId, 
  NewSupportStatusParams,
  UpdateSupportStatusParams, 
  updateSupportStatusSchema,
  insertSupportStatusSchema, 
  supportStatuses,
  supportStatusIdSchema 
} from "@soco/support-db/schema/supportStatuses";

export const createSupportStatus = async (supportStatus: NewSupportStatusParams) => {
  const newSupportStatus = insertSupportStatusSchema.parse(supportStatus);
  try {
    const [s] =  await db.insert(supportStatuses).values(newSupportStatus).returning();
    return { supportStatus: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateSupportStatus = async (id: SupportStatusId, supportStatus: UpdateSupportStatusParams) => {
  const { id: supportStatusId } = supportStatusIdSchema.parse({ id });
  const newSupportStatus = updateSupportStatusSchema.parse(supportStatus);
  try {
    const [s] =  await db
     .update(supportStatuses)
     .set(newSupportStatus)
     .where(eq(supportStatuses.id, supportStatusId!))
     .returning();
    return { supportStatus: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteSupportStatus = async (id: SupportStatusId) => {
  const { id: supportStatusId } = supportStatusIdSchema.parse({ id });
  try {
    const [s] =  await db.delete(supportStatuses).where(eq(supportStatuses.id, supportStatusId!))
    .returning();
    return { supportStatus: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

