import { db } from "@soco/user-db/client";
import { and, eq } from "@soco/user-db";
import { 
  UserDeviceId, 
  NewUserDeviceParams,
  UpdateUserDeviceParams, 
  updateUserDeviceSchema,
  insertUserDeviceSchema, 
  userDevices,
  userDeviceIdSchema 
} from "@soco/user-db/schema/userDevices";
import { getUserAuth } from "@/lib/auth/utils";

export const createUserDevice = async (userDevice: NewUserDeviceParams) => {
  const { session } = await getUserAuth();
  const newUserDevice = insertUserDeviceSchema.parse({ ...userDevice, userId: session?.user.id! });
  try {
    const [u] =  await db.insert(userDevices).values(newUserDevice).returning();
    return { userDevice: u };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateUserDevice = async (id: UserDeviceId, userDevice: UpdateUserDeviceParams) => {
  const { session } = await getUserAuth();
  const { id: userDeviceId } = userDeviceIdSchema.parse({ id });
  const newUserDevice = updateUserDeviceSchema.parse({ ...userDevice, userId: session?.user.id! });
  try {
    const [u] =  await db
     .update(userDevices)
     .set({...newUserDevice, updatedAt: new Date() })
     .where(and(eq(userDevices.id, userDeviceId!), eq(userDevices.userId, session?.user.id!)))
     .returning();
    return { userDevice: u };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteUserDevice = async (id: UserDeviceId) => {
  const { session } = await getUserAuth();
  const { id: userDeviceId } = userDeviceIdSchema.parse({ id });
  try {
    const [u] =  await db.delete(userDevices).where(and(eq(userDevices.id, userDeviceId!), eq(userDevices.userId, session?.user.id!)))
    .returning();
    return { userDevice: u };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

