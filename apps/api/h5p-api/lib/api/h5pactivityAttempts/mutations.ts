import { db } from "@/lib/db/index";
import { and, eq } from "drizzle-orm";
import { 
  H5pactivityAttemptId, 
  NewH5pactivityAttemptParams,
  UpdateH5pactivityAttemptParams, 
  updateH5pactivityAttemptSchema,
  insertH5pactivityAttemptSchema, 
  h5pactivityAttempts,
  h5pactivityAttemptIdSchema 
} from "@/lib/db/schema/h5pactivityAttempts";
import { getUserAuth } from "@soco/auth/utils";

export const createH5pactivityAttempt = async (h5pactivityAttempt: NewH5pactivityAttemptParams) => {
  const { session } = await getUserAuth();
  const newH5pactivityAttempt = insertH5pactivityAttemptSchema.parse({ ...h5pactivityAttempt, userId: session?.user.id! });
  try {
    const [h] =  await db.insert(h5pactivityAttempts).values(newH5pactivityAttempt).returning();
    return { h5pactivityAttempt: h };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateH5pactivityAttempt = async (id: H5pactivityAttemptId, h5pactivityAttempt: UpdateH5pactivityAttemptParams) => {
  const { session } = await getUserAuth();
  const { id: h5pactivityAttemptId } = h5pactivityAttemptIdSchema.parse({ id });
  const newH5pactivityAttempt = updateH5pactivityAttemptSchema.parse({ ...h5pactivityAttempt, userId: session?.user.id! });
  try {
    const [h] =  await db
     .update(h5pactivityAttempts)
     .set({...newH5pactivityAttempt, updatedAt: new Date() })
     .where(and(eq(h5pactivityAttempts.id, h5pactivityAttemptId!), eq(h5pactivityAttempts.userId, session?.user.id!)))
     .returning();
    return { h5pactivityAttempt: h };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteH5pactivityAttempt = async (id: H5pactivityAttemptId) => {
  const { session } = await getUserAuth();
  const { id: h5pactivityAttemptId } = h5pactivityAttemptIdSchema.parse({ id });
  try {
    const [h] =  await db.delete(h5pactivityAttempts).where(and(eq(h5pactivityAttempts.id, h5pactivityAttemptId!), eq(h5pactivityAttempts.userId, session?.user.id!)))
    .returning();
    return { h5pactivityAttempt: h };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

