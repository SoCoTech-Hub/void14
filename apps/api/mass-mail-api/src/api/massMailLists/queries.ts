import { db } from "@soco/mass-mail-db/client";
import { eq, and } from "@soco/mass-mail-db";
import { getUserAuth } from "@/lib/auth/utils";
import { type MassMailListId, massMailListIdSchema, massMailLists } from "@soco/mass-mail-db/schema/massMailLists";

export const getMassMailLists = async () => {
  const { session } = await getUserAuth();
  const rows = await db.select().from(massMailLists).where(eq(massMailLists.userId, session?.user.id!));
  const m = rows
  return { massMailLists: m };
};

export const getMassMailListById = async (id: MassMailListId) => {
  const { session } = await getUserAuth();
  const { id: massMailListId } = massMailListIdSchema.parse({ id });
  const [row] = await db.select().from(massMailLists).where(and(eq(massMailLists.id, massMailListId), eq(massMailLists.userId, session?.user.id!)));
  if (row === undefined) return {};
  const m = row;
  return { massMailList: m };
};


