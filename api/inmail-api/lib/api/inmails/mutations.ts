import { db } from "@/lib/db/index";
import { and, eq } from "drizzle-orm";
import { 
  InmailId, 
  NewInmailParams,
  UpdateInmailParams, 
  updateInmailSchema,
  insertInmailSchema, 
  inmails,
  inmailIdSchema 
} from "@/lib/db/schema/inmails";
import { getUserAuth } from "@/lib/auth/utils";

export const createInmail = async (inmail: NewInmailParams) => {
  const { session } = await getUserAuth();
  const newInmail = insertInmailSchema.parse({ ...inmail, userId: session?.user.id! });
  try {
    const [i] =  await db.insert(inmails).values(newInmail).returning();
    return { inmail: i };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateInmail = async (id: InmailId, inmail: UpdateInmailParams) => {
  const { session } = await getUserAuth();
  const { id: inmailId } = inmailIdSchema.parse({ id });
  const newInmail = updateInmailSchema.parse({ ...inmail, userId: session?.user.id! });
  try {
    const [i] =  await db
     .update(inmails)
     .set({...newInmail, updatedAt: new Date() })
     .where(and(eq(inmails.id, inmailId!), eq(inmails.userId, session?.user.id!)))
     .returning();
    return { inmail: i };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteInmail = async (id: InmailId) => {
  const { session } = await getUserAuth();
  const { id: inmailId } = inmailIdSchema.parse({ id });
  try {
    const [i] =  await db.delete(inmails).where(and(eq(inmails.id, inmailId!), eq(inmails.userId, session?.user.id!)))
    .returning();
    return { inmail: i };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

