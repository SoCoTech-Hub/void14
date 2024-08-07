import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { 
  type BadgeCriteriaId, 
  type NewBadgeCriteriaParams,
  type UpdateBadgeCriteriaParams, 
  updateBadgeCriteriaSchema,
  insertBadgeCriteriaSchema, 
  badgeCriterias,
  badgeCriteriaIdSchema 
} from "@/lib/db/schema/badgeCriterias";

export const createBadgeCriteria = async (badgeCriteria: NewBadgeCriteriaParams) => {
  const newBadgeCriteria = insertBadgeCriteriaSchema.parse(badgeCriteria);
  try {
    const [b] =  await db.insert(badgeCriterias).values(newBadgeCriteria).returning();
    return { badgeCriteria: b };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateBadgeCriteria = async (id: BadgeCriteriaId, badgeCriteria: UpdateBadgeCriteriaParams) => {
  const { id: badgeCriteriaId } = badgeCriteriaIdSchema.parse({ id });
  const newBadgeCriteria = updateBadgeCriteriaSchema.parse(badgeCriteria);
  try {
    const [b] =  await db
     .update(badgeCriterias)
     .set(newBadgeCriteria)
     .where(eq(badgeCriterias.id, badgeCriteriaId!))
     .returning();
    return { badgeCriteria: b };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteBadgeCriteria = async (id: BadgeCriteriaId) => {
  const { id: badgeCriteriaId } = badgeCriteriaIdSchema.parse({ id });
  try {
    const [b] =  await db.delete(badgeCriterias).where(eq(badgeCriterias.id, badgeCriteriaId!))
    .returning();
    return { badgeCriteria: b };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

