import type {
  NewToolDataprivacyRequestParams,
  ToolDataprivacyRequestId,
  UpdateToolDataprivacyRequestParams,
} from "@soco/tool-data-privacy-db/schema/toolDataprivacyRequests";
import { getUserAuth } from "@soco/auth-service";
import { and, eq } from "@soco/tool-data-privacy-db";
import { db } from "@soco/tool-data-privacy-db/client";
import {
  insertToolDataprivacyRequestSchema,
  toolDataprivacyRequestIdSchema,
  toolDataprivacyRequests,
  updateToolDataprivacyRequestSchema,
} from "@soco/tool-data-privacy-db/schema/toolDataprivacyRequests";

export const createToolDataprivacyRequest = async (
  toolDataprivacyRequest: NewToolDataprivacyRequestParams,
) => {
  const { session } = await getUserAuth();
  const newToolDataprivacyRequest = insertToolDataprivacyRequestSchema.parse({
    ...toolDataprivacyRequest,
    userId: session?.user.id!,
  });
  try {
    const [t] = await db
      .insert(toolDataprivacyRequests)
      .values(newToolDataprivacyRequest)
      .returning();
    return { toolDataprivacyRequest: t };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateToolDataprivacyRequest = async (
  id: ToolDataprivacyRequestId,
  toolDataprivacyRequest: UpdateToolDataprivacyRequestParams,
) => {
  const { session } = await getUserAuth();
  const { id: toolDataprivacyRequestId } = toolDataprivacyRequestIdSchema.parse(
    { id },
  );
  const newToolDataprivacyRequest = updateToolDataprivacyRequestSchema.parse({
    ...toolDataprivacyRequest,
    userId: session?.user.id!,
  });
  try {
    const [t] = await db
      .update(toolDataprivacyRequests)
      .set({ ...newToolDataprivacyRequest, updatedAt: new Date() })
      .where(
        and(
          eq(toolDataprivacyRequests.id, toolDataprivacyRequestId!),
          eq(toolDataprivacyRequests.userId, session?.user.id!),
        ),
      )
      .returning();
    return { toolDataprivacyRequest: t };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteToolDataprivacyRequest = async (
  id: ToolDataprivacyRequestId,
) => {
  const { session } = await getUserAuth();
  const { id: toolDataprivacyRequestId } = toolDataprivacyRequestIdSchema.parse(
    { id },
  );
  try {
    const [t] = await db
      .delete(toolDataprivacyRequests)
      .where(
        and(
          eq(toolDataprivacyRequests.id, toolDataprivacyRequestId!),
          eq(toolDataprivacyRequests.userId, session?.user.id!),
        ),
      )
      .returning();
    return { toolDataprivacyRequest: t };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
