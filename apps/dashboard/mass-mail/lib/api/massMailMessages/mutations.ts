import { db } from "@/lib/db/index";
import { and, eq } from "drizzle-orm";
import { 
  type MassMailMessageId, 
  type NewMassMailMessageParams,
  type UpdateMassMailMessageParams, 
  updateMassMailMessageSchema,
  insertMassMailMessageSchema, 
  massMailMessages,
  massMailMessageIdSchema 
} from "@/lib/db/schema/massMailMessages";
import { getUserAuth } from "@/lib/auth/utils";

export const createMassMailMessage = async (massMailMessage: NewMassMailMessageParams) => {
  const { session } = await getUserAuth();
  const newMassMailMessage = insertMassMailMessageSchema.parse({ ...massMailMessage, userId: session?.user.id! });
  try {
    const [m] =  await db.insert(massMailMessages).values(newMassMailMessage).returning();
    return { massMailMessage: m };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateMassMailMessage = async (id: MassMailMessageId, massMailMessage: UpdateMassMailMessageParams) => {
  const { session } = await getUserAuth();
  const { id: massMailMessageId } = massMailMessageIdSchema.parse({ id });
  const newMassMailMessage = updateMassMailMessageSchema.parse({ ...massMailMessage, userId: session?.user.id! });
  try {
    const [m] =  await db
     .update(massMailMessages)
     .set({...newMassMailMessage, updatedAt: new Date() })
     .where(and(eq(massMailMessages.id, massMailMessageId!), eq(massMailMessages.userId, session?.user.id!)))
     .returning();
    return { massMailMessage: m };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteMassMailMessage = async (id: MassMailMessageId) => {
  const { session } = await getUserAuth();
  const { id: massMailMessageId } = massMailMessageIdSchema.parse({ id });
  try {
    const [m] =  await db.delete(massMailMessages).where(and(eq(massMailMessages.id, massMailMessageId!), eq(massMailMessages.userId, session?.user.id!)))
    .returning();
    return { massMailMessage: m };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

