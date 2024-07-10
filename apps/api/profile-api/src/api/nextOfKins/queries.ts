import { db } from "@soco/profile-db/client";
import { eq, and } from "@soco/profile-db";
import { getUserAuth } from "@/lib/auth/utils";
import { type NextOfKinId, nextOfKinIdSchema, nextOfKins } from "@soco/profile-db/schema/nextOfKins";

export const getNextOfKins = async () => {
  const { session } = await getUserAuth();
  const rows = await db.select().from(nextOfKins).where(eq(nextOfKins.userId, session?.user.id!));
  const n = rows
  return { nextOfKins: n };
};

export const getNextOfKinById = async (id: NextOfKinId) => {
  const { session } = await getUserAuth();
  const { id: nextOfKinId } = nextOfKinIdSchema.parse({ id });
  const [row] = await db.select().from(nextOfKins).where(and(eq(nextOfKins.id, nextOfKinId), eq(nextOfKins.userId, session?.user.id!)));
  if (row === undefined) return {};
  const n = row;
  return { nextOfKin: n };
};


