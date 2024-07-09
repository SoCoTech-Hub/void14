import { and, eq } from "drizzle-orm";

import type { MassMailListId } from "@soco/mass-mail-db/schema/massMailLists";
import { getUserAuth } from "@soco/auth-services";
import { db } from "@soco/mass-mail-db/index";
import {
  massMailListIdSchema,
  massMailLists,
} from "@soco/mass-mail-db/schema/massMailLists";

export const getMassMailLists = async () => {
  const { session } = await getUserAuth();
  const rows = await db
    .select()
    .from(massMailLists)
    .where(eq(massMailLists.userId, session?.user.id!));
  const m = rows;
  return { massMailLists: m };
};

export const getMassMailListById = async (id: MassMailListId) => {
  const { session } = await getUserAuth();
  const { id: massMailListId } = massMailListIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(massMailLists)
    .where(
      and(
        eq(massMailLists.id, massMailListId),
        eq(massMailLists.userId, session?.user.id!),
      ),
    );
  if (row === undefined) return {};
  const m = row;
  return { massMailList: m };
};
