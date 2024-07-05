import { and, eq } from "drizzle-orm";

import { getUserAuth } from "@soco/auth/utils";

import type { BursaryId } from "../../db/schema/bursaries";
import { db } from "../../db/index";
import { bursaries, bursaryIdSchema } from "../../db/schema/bursaries";

export const getBursaries = async () => {
  const { session } = await getUserAuth();
  const rows = await db
    .select()
    .from(bursaries)
    .where(eq(bursaries.userId, session?.user.id!));
  const b = rows;
  return { bursaries: b };
};

export const getBursaryById = async (id: BursaryId) => {
  const { session } = await getUserAuth();
  const { id: bursaryId } = bursaryIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(bursaries)
    .where(
      and(eq(bursaries.id, bursaryId), eq(bursaries.userId, session?.user.id!)),
    );
  if (row === undefined) return {};
  const b = row;
  return { bursary: b };
};
