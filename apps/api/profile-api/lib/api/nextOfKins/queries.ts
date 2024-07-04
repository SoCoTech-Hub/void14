import { and, eq } from "drizzle-orm";

import { getUserAuth } from "@soco/auth/utils";

import type { NextOfKinId } from "../db/schema/nextOfKins";
import { db } from "../db/index";
import { nextOfKinIdSchema, nextOfKins } from "../db/schema/nextOfKins";

export const getNextOfKins = async () => {
  const { session } = await getUserAuth();
  const rows = await db
    .select()
    .from(nextOfKins)
    .where(eq(nextOfKins.userId, session?.user.id!));
  const n = rows;
  return { nextOfKins: n };
};

export const getNextOfKinById = async (id: NextOfKinId) => {
  const { session } = await getUserAuth();
  const { id: nextOfKinId } = nextOfKinIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(nextOfKins)
    .where(
      and(
        eq(nextOfKins.id, nextOfKinId),
        eq(nextOfKins.userId, session?.user.id!),
      ),
    );
  if (row === undefined) return {};
  const n = row;
  return { nextOfKin: n };
};
