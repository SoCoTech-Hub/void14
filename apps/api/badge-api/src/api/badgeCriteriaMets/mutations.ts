import { db } from "@soco/badge-db/client";
import { and, eq } from "@soco/badge-db";
import { 
  type BadgeCriteriaMetId, 
  type NewBadgeCriteriaMetParams,
  type UpdateBadgeCriteriaMetParams, 
  updateBadgeCriteriaMetSchema,
  insertBadgeCriteriaMetSchema, 
  badgeCriteriaMets,
  badgeCriteriaMetIdSchema 
} from "@soco/badge-db/schema/badgeCriteriaMets";
import { getUserAuth } from "@soco/auth-service";

export const createBadgeCriteriaMet = async (badgeCriteriaMet: NewBadgeCriteriaMetParams) => {
  const { session } = await getUserAuth();
  const newBadgeCriteriaMet = insertBadgeCriteriaMetSchema.parse({ ...badgeCriteriaMet, userId: session?.user.id! });
  try {
    const [b] =  await db.insert(badgeCriteriaMets).values(newBadgeCriteriaMet).returning();
    return { badgeCriteriaMet: b };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateBadgeCriteriaMet = async (id: BadgeCriteriaMetId, badgeCriteriaMet: UpdateBadgeCriteriaMetParams) => {
  const { session } = await getUserAuth();
  const { id: badgeCriteriaMetId } = badgeCriteriaMetIdSchema.parse({ id });
  const newBadgeCriteriaMet = updateBadgeCriteriaMetSchema.parse({ ...badgeCriteriaMet, userId: session?.user.id! });
  try {
    const [b] =  await db
     .update(badgeCriteriaMets)
     .set(newBadgeCriteriaMet)
     .where(and(eq(badgeCriteriaMets.id, badgeCriteriaMetId!), eq(badgeCriteriaMets.userId, session?.user.id!)))
     .returning();
    return { badgeCriteriaMet: b };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteBadgeCriteriaMet = async (id: BadgeCriteriaMetId) => {
  const { session } = await getUserAuth();
  const { id: badgeCriteriaMetId } = badgeCriteriaMetIdSchema.parse({ id });
  try {
    const [b] =  await db.delete(badgeCriteriaMets).where(and(eq(badgeCriteriaMets.id, badgeCriteriaMetId!), eq(badgeCriteriaMets.userId, session?.user.id!)))
    .returning();
    return { badgeCriteriaMet: b };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

