import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { 
  LtiId, 
  NewLtiParams,
  UpdateLtiParams, 
  updateLtiSchema,
  insertLtiSchema, 
  ltis,
  ltiIdSchema 
} from "@/lib/db/schema/ltis";

export const createLti = async (lti: NewLtiParams) => {
  const newLti = insertLtiSchema.parse(lti);
  try {
    const [l] =  await db.insert(ltis).values(newLti).returning();
    return { lti: l };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateLti = async (id: LtiId, lti: UpdateLtiParams) => {
  const { id: ltiId } = ltiIdSchema.parse({ id });
  const newLti = updateLtiSchema.parse(lti);
  try {
    const [l] =  await db
     .update(ltis)
     .set({...newLti, updatedAt: new Date() })
     .where(eq(ltis.id, ltiId!))
     .returning();
    return { lti: l };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteLti = async (id: LtiId) => {
  const { id: ltiId } = ltiIdSchema.parse({ id });
  try {
    const [l] =  await db.delete(ltis).where(eq(ltis.id, ltiId!))
    .returning();
    return { lti: l };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

