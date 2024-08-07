import type {
  LtiId,
  NewLtiParams,
  UpdateLtiParams,
} from "@soco/lti-db/schema/ltis";
import { eq } from "@soco/lti-db";
import { db } from "@soco/lti-db/client";
import {
  insertLtiSchema,
  ltiIdSchema,
  ltis,
  updateLtiSchema,
} from "@soco/lti-db/schema/ltis";

export const createLti = async (lti: NewLtiParams) => {
  const newLti = insertLtiSchema.parse(lti);
  try {
    const [l] = await db.insert(ltis).values(newLti).returning();
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
    const [l] = await db
      .update(ltis)
      .set({ ...newLti, updatedAt: new Date() })
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
    const [l] = await db.delete(ltis).where(eq(ltis.id, ltiId!)).returning();
    return { lti: l };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
