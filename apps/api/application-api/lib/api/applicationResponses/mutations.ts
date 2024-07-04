import { and, eq } from "drizzle-orm";

import { getUserAuth } from "@soco/auth/utils";

import { db } from "../db/index";
import {
  ApplicationResponseId,
  applicationResponseIdSchema,
  applicationResponses,
  insertApplicationResponseSchema,
  NewApplicationResponseParams,
  UpdateApplicationResponseParams,
  updateApplicationResponseSchema,
} from "../db/schema/applicationResponses";

export const createApplicationResponse = async (
  applicationResponse: NewApplicationResponseParams,
) => {
  const { session } = await getUserAuth();
  const newApplicationResponse = insertApplicationResponseSchema.parse({
    ...applicationResponse,
    userId: session?.user.id!,
  });
  try {
    const [a] = await db
      .insert(applicationResponses)
      .values(newApplicationResponse)
      .returning();
    return { applicationResponse: a };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateApplicationResponse = async (
  id: ApplicationResponseId,
  applicationResponse: UpdateApplicationResponseParams,
) => {
  const { session } = await getUserAuth();
  const { id: applicationResponseId } = applicationResponseIdSchema.parse({
    id,
  });
  const newApplicationResponse = updateApplicationResponseSchema.parse({
    ...applicationResponse,
    userId: session?.user.id!,
  });
  try {
    const [a] = await db
      .update(applicationResponses)
      .set({ ...newApplicationResponse, updatedAt: new Date() })
      .where(
        and(
          eq(applicationResponses.id, applicationResponseId!),
          eq(applicationResponses.userId, session?.user.id!),
        ),
      )
      .returning();
    return { applicationResponse: a };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteApplicationResponse = async (id: ApplicationResponseId) => {
  const { session } = await getUserAuth();
  const { id: applicationResponseId } = applicationResponseIdSchema.parse({
    id,
  });
  try {
    const [a] = await db
      .delete(applicationResponses)
      .where(
        and(
          eq(applicationResponses.id, applicationResponseId!),
          eq(applicationResponses.userId, session?.user.id!),
        ),
      )
      .returning();
    return { applicationResponse: a };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
