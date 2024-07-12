import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { 
  type MassMailListsRecipientId, 
  type NewMassMailListsRecipientParams,
  type UpdateMassMailListsRecipientParams, 
  updateMassMailListsRecipientSchema,
  insertMassMailListsRecipientSchema, 
  massMailListsRecipients,
  massMailListsRecipientIdSchema 
} from "@/lib/db/schema/massMailListsRecipients";

export const createMassMailListsRecipient = async (massMailListsRecipient: NewMassMailListsRecipientParams) => {
  const newMassMailListsRecipient = insertMassMailListsRecipientSchema.parse(massMailListsRecipient);
  try {
    const [m] =  await db.insert(massMailListsRecipients).values(newMassMailListsRecipient).returning();
    return { massMailListsRecipient: m };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateMassMailListsRecipient = async (id: MassMailListsRecipientId, massMailListsRecipient: UpdateMassMailListsRecipientParams) => {
  const { id: massMailListsRecipientId } = massMailListsRecipientIdSchema.parse({ id });
  const newMassMailListsRecipient = updateMassMailListsRecipientSchema.parse(massMailListsRecipient);
  try {
    const [m] =  await db
     .update(massMailListsRecipients)
     .set(newMassMailListsRecipient)
     .where(eq(massMailListsRecipients.id, massMailListsRecipientId!))
     .returning();
    return { massMailListsRecipient: m };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteMassMailListsRecipient = async (id: MassMailListsRecipientId) => {
  const { id: massMailListsRecipientId } = massMailListsRecipientIdSchema.parse({ id });
  try {
    const [m] =  await db.delete(massMailListsRecipients).where(eq(massMailListsRecipients.id, massMailListsRecipientId!))
    .returning();
    return { massMailListsRecipient: m };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

