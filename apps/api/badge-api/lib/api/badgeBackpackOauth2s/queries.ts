import { db } from "@/lib/db/index";
import { eq, and } from "drizzle-orm";
import { getUserAuth } from "@/lib/auth/utils";
import { type BadgeBackpackOauth2Id, badgeBackpackOauth2IdSchema, badgeBackpackOauth2s } from "@/lib/db/schema/badgeBackpackOauth2s";

export const getBadgeBackpackOauth2s = async () => {
  const { session } = await getUserAuth();
  const rows = await db.select().from(badgeBackpackOauth2s).where(eq(badgeBackpackOauth2s.userId, session?.user.id!));
  const b = rows
  return { badgeBackpackOauth2s: b };
};

export const getBadgeBackpackOauth2ById = async (id: BadgeBackpackOauth2Id) => {
  const { session } = await getUserAuth();
  const { id: badgeBackpackOauth2Id } = badgeBackpackOauth2IdSchema.parse({ id });
  const [row] = await db.select().from(badgeBackpackOauth2s).where(and(eq(badgeBackpackOauth2s.id, badgeBackpackOauth2Id), eq(badgeBackpackOauth2s.userId, session?.user.id!)));
  if (row === undefined) return {};
  const b = row;
  return { badgeBackpackOauth2: b };
};


