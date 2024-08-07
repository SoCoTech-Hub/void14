import type {
  BadgeIssueId,
  NewBadgeIssueParams,
  UpdateBadgeIssueParams,
} from "@soco/badge-db/schema/badgeIssues";
import { getUserAuth } from "@soco/auth-service";
import { and, eq } from "@soco/badge-db";
import { db } from "@soco/badge-db/client";
import {
  badgeIssueIdSchema,
  badgeIssues,
  insertBadgeIssueSchema,
  updateBadgeIssueSchema,
} from "@soco/badge-db/schema/badgeIssues";

export const createBadgeIssue = async (badgeIssue: NewBadgeIssueParams) => {
  const { session } = await getUserAuth();
  const newBadgeIssue = insertBadgeIssueSchema.parse({
    ...badgeIssue,
    userId: session?.user.id!,
  });
  try {
    const [b] = await db.insert(badgeIssues).values(newBadgeIssue).returning();
    return { badgeIssue: b };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateBadgeIssue = async (
  id: BadgeIssueId,
  badgeIssue: UpdateBadgeIssueParams,
) => {
  const { session } = await getUserAuth();
  const { id: badgeIssueId } = badgeIssueIdSchema.parse({ id });
  const newBadgeIssue = updateBadgeIssueSchema.parse({
    ...badgeIssue,
    userId: session?.user.id!,
  });
  try {
    const [b] = await db
      .update(badgeIssues)
      .set(newBadgeIssue)
      .where(
        and(
          eq(badgeIssues.id, badgeIssueId!),
          eq(badgeIssues.userId, session?.user.id!),
        ),
      )
      .returning();
    return { badgeIssue: b };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteBadgeIssue = async (id: BadgeIssueId) => {
  const { session } = await getUserAuth();
  const { id: badgeIssueId } = badgeIssueIdSchema.parse({ id });
  try {
    const [b] = await db
      .delete(badgeIssues)
      .where(
        and(
          eq(badgeIssues.id, badgeIssueId!),
          eq(badgeIssues.userId, session?.user.id!),
        ),
      )
      .returning();
    return { badgeIssue: b };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
