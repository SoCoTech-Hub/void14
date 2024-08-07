import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { 
  type LtiAccessTokenId, 
  type NewLtiAccessTokenParams,
  type UpdateLtiAccessTokenParams, 
  updateLtiAccessTokenSchema,
  insertLtiAccessTokenSchema, 
  ltiAccessTokens,
  ltiAccessTokenIdSchema 
} from "@/lib/db/schema/ltiAccessTokens";

export const createLtiAccessToken = async (ltiAccessToken: NewLtiAccessTokenParams) => {
  const newLtiAccessToken = insertLtiAccessTokenSchema.parse(ltiAccessToken);
  try {
    const [l] =  await db.insert(ltiAccessTokens).values(newLtiAccessToken).returning();
    return { ltiAccessToken: l };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateLtiAccessToken = async (id: LtiAccessTokenId, ltiAccessToken: UpdateLtiAccessTokenParams) => {
  const { id: ltiAccessTokenId } = ltiAccessTokenIdSchema.parse({ id });
  const newLtiAccessToken = updateLtiAccessTokenSchema.parse(ltiAccessToken);
  try {
    const [l] =  await db
     .update(ltiAccessTokens)
     .set({...newLtiAccessToken, updatedAt: new Date() })
     .where(eq(ltiAccessTokens.id, ltiAccessTokenId!))
     .returning();
    return { ltiAccessToken: l };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteLtiAccessToken = async (id: LtiAccessTokenId) => {
  const { id: ltiAccessTokenId } = ltiAccessTokenIdSchema.parse({ id });
  try {
    const [l] =  await db.delete(ltiAccessTokens).where(eq(ltiAccessTokens.id, ltiAccessTokenId!))
    .returning();
    return { ltiAccessToken: l };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

