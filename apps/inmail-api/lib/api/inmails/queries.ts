import { db } from "@/lib/db/index";
import { eq, and } from "drizzle-orm";
import { getUserAuth } from "@/lib/auth/utils";
import { type InmailId, inmailIdSchema, inmails } from "@/lib/db/schema/inmails";

export const getInmails = async () => {
  const { session } = await getUserAuth();
  const rows = await db.select().from(inmails).where(eq(inmails.userId, session?.user.id!));
  const i = rows
  return { inmails: i };
};

export const getInmailById = async (id: InmailId) => {
  const { session } = await getUserAuth();
  const { id: inmailId } = inmailIdSchema.parse({ id });
  const [row] = await db.select().from(inmails).where(and(eq(inmails.id, inmailId), eq(inmails.userId, session?.user.id!)));
  if (row === undefined) return {};
  const i = row;
  return { inmail: i };
};


