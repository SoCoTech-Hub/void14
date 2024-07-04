import { and, eq } from "drizzle-orm";

import { getUserAuth } from "@soco/auth/utils";

import { db } from "../db/index";
import {
  insertQualificationsResponseSchema,
  NewQualificationsResponseParams,
  QualificationsResponseId,
  qualificationsResponseIdSchema,
  qualificationsResponses,
  UpdateQualificationsResponseParams,
  updateQualificationsResponseSchema,
} from "../db/schema/qualificationsResponses";

export const createQualificationsResponse = async (
  qualificationsResponse: NewQualificationsResponseParams,
) => {
  const { session } = await getUserAuth();
  const newQualificationsResponse = insertQualificationsResponseSchema.parse({
    ...qualificationsResponse,
    userId: session?.user.id!,
  });
  try {
    const [q] = await db
      .insert(qualificationsResponses)
      .values(newQualificationsResponse)
      .returning();
    return { qualificationsResponse: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateQualificationsResponse = async (
  id: QualificationsResponseId,
  qualificationsResponse: UpdateQualificationsResponseParams,
) => {
  const { session } = await getUserAuth();
  const { id: qualificationsResponseId } = qualificationsResponseIdSchema.parse(
    { id },
  );
  const newQualificationsResponse = updateQualificationsResponseSchema.parse({
    ...qualificationsResponse,
    userId: session?.user.id!,
  });
  try {
    const [q] = await db
      .update(qualificationsResponses)
      .set(newQualificationsResponse)
      .where(
        and(
          eq(qualificationsResponses.id, qualificationsResponseId!),
          eq(qualificationsResponses.userId, session?.user.id!),
        ),
      )
      .returning();
    return { qualificationsResponse: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteQualificationsResponse = async (
  id: QualificationsResponseId,
) => {
  const { session } = await getUserAuth();
  const { id: qualificationsResponseId } = qualificationsResponseIdSchema.parse(
    { id },
  );
  try {
    const [q] = await db
      .delete(qualificationsResponses)
      .where(
        and(
          eq(qualificationsResponses.id, qualificationsResponseId!),
          eq(qualificationsResponses.userId, session?.user.id!),
        ),
      )
      .returning();
    return { qualificationsResponse: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
