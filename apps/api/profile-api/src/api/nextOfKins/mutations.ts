import { db } from "@soco/profile-db/index";
import { and, eq } from "drizzle-orm";
import { 
  NextOfKinId, 
  NewNextOfKinParams,
  UpdateNextOfKinParams, 
  updateNextOfKinSchema,
  insertNextOfKinSchema, 
  nextOfKins,
  nextOfKinIdSchema 
} from "@soco/profile-db/schema/nextOfKins";
import { getUserAuth } from "@/lib/auth/utils";

export const createNextOfKin = async (nextOfKin: NewNextOfKinParams) => {
  const { session } = await getUserAuth();
  const newNextOfKin = insertNextOfKinSchema.parse({ ...nextOfKin, userId: session?.user.id! });
  try {
    const [n] =  await db.insert(nextOfKins).values(newNextOfKin).returning();
    return { nextOfKin: n };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateNextOfKin = async (id: NextOfKinId, nextOfKin: UpdateNextOfKinParams) => {
  const { session } = await getUserAuth();
  const { id: nextOfKinId } = nextOfKinIdSchema.parse({ id });
  const newNextOfKin = updateNextOfKinSchema.parse({ ...nextOfKin, userId: session?.user.id! });
  try {
    const [n] =  await db
     .update(nextOfKins)
     .set({...newNextOfKin, updatedAt: new Date() })
     .where(and(eq(nextOfKins.id, nextOfKinId!), eq(nextOfKins.userId, session?.user.id!)))
     .returning();
    return { nextOfKin: n };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteNextOfKin = async (id: NextOfKinId) => {
  const { session } = await getUserAuth();
  const { id: nextOfKinId } = nextOfKinIdSchema.parse({ id });
  try {
    const [n] =  await db.delete(nextOfKins).where(and(eq(nextOfKins.id, nextOfKinId!), eq(nextOfKins.userId, session?.user.id!)))
    .returning();
    return { nextOfKin: n };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

