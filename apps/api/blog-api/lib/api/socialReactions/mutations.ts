import { and, eq } from "drizzle-orm";

import { getUserAuth } from "@soco/auth/utils";

import { db } from "../db/index";
import {
  insertSocialReactionSchema,
  NewSocialReactionParams,
  SocialReactionId,
  socialReactionIdSchema,
  socialReactions,
  UpdateSocialReactionParams,
  updateSocialReactionSchema,
} from "../db/schema/socialReactions";

export const createSocialReaction = async (
  socialReaction: NewSocialReactionParams,
) => {
  const { session } = await getUserAuth();
  const newSocialReaction = insertSocialReactionSchema.parse({
    ...socialReaction,
    userId: session?.user.id!,
  });
  try {
    const [s] = await db
      .insert(socialReactions)
      .values(newSocialReaction)
      .returning();
    return { socialReaction: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateSocialReaction = async (
  id: SocialReactionId,
  socialReaction: UpdateSocialReactionParams,
) => {
  const { session } = await getUserAuth();
  const { id: socialReactionId } = socialReactionIdSchema.parse({ id });
  const newSocialReaction = updateSocialReactionSchema.parse({
    ...socialReaction,
    userId: session?.user.id!,
  });
  try {
    const [s] = await db
      .update(socialReactions)
      .set({ ...newSocialReaction, updatedAt: new Date() })
      .where(
        and(
          eq(socialReactions.id, socialReactionId!),
          eq(socialReactions.userId, session?.user.id!),
        ),
      )
      .returning();
    return { socialReaction: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteSocialReaction = async (id: SocialReactionId) => {
  const { session } = await getUserAuth();
  const { id: socialReactionId } = socialReactionIdSchema.parse({ id });
  try {
    const [s] = await db
      .delete(socialReactions)
      .where(
        and(
          eq(socialReactions.id, socialReactionId!),
          eq(socialReactions.userId, session?.user.id!),
        ),
      )
      .returning();
    return { socialReaction: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};