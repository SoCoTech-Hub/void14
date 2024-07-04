import { and, eq } from "drizzle-orm";

import { getUserAuth } from "@soco/auth/utils";

import { db } from "../db/index";
import {
  insertUserDeviceSchema,
  NewUserDeviceParams,
  UpdateUserDeviceParams,
  updateUserDeviceSchema,
  UserDeviceId,
  userDeviceIdSchema,
  userDevices,
} from "../db/schema/userDevices";

export const createUserDevice = async (userDevice: NewUserDeviceParams) => {
  const { session } = await getUserAuth();
  const newUserDevice = insertUserDeviceSchema.parse({
    ...userDevice,
    userId: session?.user.id!,
  });
  try {
    const [u] = await db.insert(userDevices).values(newUserDevice).returning();
    return { userDevice: u };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateUserDevice = async (
  id: UserDeviceId,
  userDevice: UpdateUserDeviceParams,
) => {
  const { session } = await getUserAuth();
  const { id: userDeviceId } = userDeviceIdSchema.parse({ id });
  const newUserDevice = updateUserDeviceSchema.parse({
    ...userDevice,
    userId: session?.user.id!,
  });
  try {
    const [u] = await db
      .update(userDevices)
      .set({ ...newUserDevice, updatedAt: new Date() })
      .where(
        and(
          eq(userDevices.id, userDeviceId!),
          eq(userDevices.userId, session?.user.id!),
        ),
      )
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
    const [u] = await db
      .delete(userDevices)
      .where(
        and(
          eq(userDevices.id, userDeviceId!),
          eq(userDevices.userId, session?.user.id!),
        ),
      )
      .returning();
    return { userDevice: u };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
