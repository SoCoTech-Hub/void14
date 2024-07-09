import { and, eq } from "drizzle-orm";

import type { UserDeviceId } from "@soco/user-db/schema/userDevices";
import { getUserAuth } from "@soco/auth-services";
import { db } from "@soco/user-db/index";
import {
  userDeviceIdSchema,
  userDevices,
} from "@soco/user-db/schema/userDevices";

export const getUserDevices = async () => {
  const { session } = await getUserAuth();
  const rows = await db
    .select()
    .from(userDevices)
    .where(eq(userDevices.userId, session?.user.id!));
  const u = rows;
  return { userDevices: u };
};

export const getUserDeviceById = async (id: UserDeviceId) => {
  const { session } = await getUserAuth();
  const { id: userDeviceId } = userDeviceIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(userDevices)
    .where(
      and(
        eq(userDevices.id, userDeviceId),
        eq(userDevices.userId, session?.user.id!),
      ),
    );
  if (row === undefined) return {};
  const u = row;
  return { userDevice: u };
};
