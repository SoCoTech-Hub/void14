import type {
  CohortMemberId,
  NewCohortMemberParams,
  UpdateCohortMemberParams,
} from "@soco/cohort-db/schema/cohortMembers";
import { getUserAuth } from "@soco/auth-service";
import { and, eq } from "@soco/cohort-db";
import { db } from "@soco/cohort-db/client";
import {
  cohortMemberIdSchema,
  cohortMembers,
  insertCohortMemberSchema,
  updateCohortMemberSchema,
} from "@soco/cohort-db/schema/cohortMembers";

export const createCohortMember = async (
  cohortMember: NewCohortMemberParams,
) => {
  const { session } = await getUserAuth();
  const newCohortMember = insertCohortMemberSchema.parse({
    ...cohortMember,
    userId: session?.user.id!,
  });
  try {
    const [c] = await db
      .insert(cohortMembers)
      .values(newCohortMember)
      .returning();
    return { cohortMember: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateCohortMember = async (
  id: CohortMemberId,
  cohortMember: UpdateCohortMemberParams,
) => {
  const { session } = await getUserAuth();
  const { id: cohortMemberId } = cohortMemberIdSchema.parse({ id });
  const newCohortMember = updateCohortMemberSchema.parse({
    ...cohortMember,
    userId: session?.user.id!,
  });
  try {
    const [c] = await db
      .update(cohortMembers)
      .set({ ...newCohortMember, updatedAt: new Date() })
      .where(
        and(
          eq(cohortMembers.id, cohortMemberId!),
          eq(cohortMembers.userId, session?.user.id!),
        ),
      )
      .returning();
    return { cohortMember: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteCohortMember = async (id: CohortMemberId) => {
  const { session } = await getUserAuth();
  const { id: cohortMemberId } = cohortMemberIdSchema.parse({ id });
  try {
    const [c] = await db
      .delete(cohortMembers)
      .where(
        and(
          eq(cohortMembers.id, cohortMemberId!),
          eq(cohortMembers.userId, session?.user.id!),
        ),
      )
      .returning();
    return { cohortMember: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
