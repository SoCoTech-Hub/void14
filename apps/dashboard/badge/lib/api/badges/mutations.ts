import { db } from "@/lib/db/index";
import { and, eq } from "drizzle-orm";
import { 
  type BadgeId, 
  type NewBadgeParams,
  type UpdateBadgeParams, 
  updateBadgeSchema,
  insertBadgeSchema, 
  badges,
  badgeIdSchema 
} from "@/lib/db/schema/badges";
import { getUserAuth } from "@/lib/auth/utils";

export const createBadge = async (badge: NewBadgeParams) => {
  const { session } = await getUserAuth();
  const newBadge = insertBadgeSchema.parse({ ...badge, userId: session?.user.id! });
  try {
    const [b] =  await db.insert(badges).values(newBadge).returning();
    return { badge: b };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateBadge = async (id: BadgeId, badge: UpdateBadgeParams) => {
  const { session } = await getUserAuth();
  const { id: badgeId } = badgeIdSchema.parse({ id });
  const newBadge = updateBadgeSchema.parse({ ...badge, userId: session?.user.id! });
  try {
    const [b] =  await db
     .update(badges)
     .set({...newBadge, updatedAt: new Date() })
     .where(and(eq(badges.id, badgeId!), eq(badges.userId, session?.user.id!)))
     .returning();
    return { badge: b };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteBadge = async (id: BadgeId) => {
  const { session } = await getUserAuth();
  const { id: badgeId } = badgeIdSchema.parse({ id });
  try {
    const [b] =  await db.delete(badges).where(and(eq(badges.id, badgeId!), eq(badges.userId, session?.user.id!)))
    .returning();
    return { badge: b };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

