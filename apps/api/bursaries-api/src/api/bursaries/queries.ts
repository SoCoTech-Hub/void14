import { db } from "@soco/bursaries-db/index";
import { eq, and } from "drizzle-orm";
import { getUserAuth } from "@/lib/auth/utils";
import { type BursaryId, bursaryIdSchema, bursaries } from "@soco/bursaries-db/schema/bursaries";

export const getBursaries = async () => {
  const { session } = await getUserAuth();
  const rows = await db.select().from(bursaries).where(eq(bursaries.userId, session?.user.id!));
  const b = rows
  return { bursaries: b };
};

export const getBursaryById = async (id: BursaryId) => {
  const { session } = await getUserAuth();
  const { id: bursaryId } = bursaryIdSchema.parse({ id });
  const [row] = await db.select().from(bursaries).where(and(eq(bursaries.id, bursaryId), eq(bursaries.userId, session?.user.id!)));
  if (row === undefined) return {};
  const b = row;
  return { bursary: b };
};


