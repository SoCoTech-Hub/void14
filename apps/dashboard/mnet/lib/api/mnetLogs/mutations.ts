import { db } from "@/lib/db/index";
import { and, eq } from "drizzle-orm";
import { 
  type MnetLogId, 
  type NewMnetLogParams,
  type UpdateMnetLogParams, 
  updateMnetLogSchema,
  insertMnetLogSchema, 
  mnetLogs,
  mnetLogIdSchema 
} from "@/lib/db/schema/mnetLogs";
import { getUserAuth } from "@/lib/auth/utils";

export const createMnetLog = async (mnetLog: NewMnetLogParams) => {
  const { session } = await getUserAuth();
  const newMnetLog = insertMnetLogSchema.parse({ ...mnetLog, userId: session?.user.id! });
  try {
    const [m] =  await db.insert(mnetLogs).values(newMnetLog).returning();
    return { mnetLog: m };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateMnetLog = async (id: MnetLogId, mnetLog: UpdateMnetLogParams) => {
  const { session } = await getUserAuth();
  const { id: mnetLogId } = mnetLogIdSchema.parse({ id });
  const newMnetLog = updateMnetLogSchema.parse({ ...mnetLog, userId: session?.user.id! });
  try {
    const [m] =  await db
     .update(mnetLogs)
     .set(newMnetLog)
     .where(and(eq(mnetLogs.id, mnetLogId!), eq(mnetLogs.userId, session?.user.id!)))
     .returning();
    return { mnetLog: m };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteMnetLog = async (id: MnetLogId) => {
  const { session } = await getUserAuth();
  const { id: mnetLogId } = mnetLogIdSchema.parse({ id });
  try {
    const [m] =  await db.delete(mnetLogs).where(and(eq(mnetLogs.id, mnetLogId!), eq(mnetLogs.userId, session?.user.id!)))
    .returning();
    return { mnetLog: m };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

