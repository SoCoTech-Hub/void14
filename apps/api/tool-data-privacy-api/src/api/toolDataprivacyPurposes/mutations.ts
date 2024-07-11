import { getUserAuth } from "@soco/auth-service";
import { and, eq } from "@soco/tool-data-privacy-db";
import { db } from "@soco/tool-data-privacy-db/client";
import {
  insertToolDataprivacyPurposeSchema,
  NewToolDataprivacyPurposeParams,
  ToolDataprivacyPurposeId,
  toolDataprivacyPurposeIdSchema,
  toolDataprivacyPurposes,
  UpdateToolDataprivacyPurposeParams,
  updateToolDataprivacyPurposeSchema,
} from "@soco/tool-data-privacy-db/schema/toolDataprivacyPurposes";

export const createToolDataprivacyPurpose = async (
  toolDataprivacyPurpose: NewToolDataprivacyPurposeParams,
) => {
  const { session } = await getUserAuth();
  const newToolDataprivacyPurpose = insertToolDataprivacyPurposeSchema.parse({
    ...toolDataprivacyPurpose,
    userId: session?.user.id!,
  });
  try {
    const [t] = await db
      .insert(toolDataprivacyPurposes)
      .values(newToolDataprivacyPurpose)
      .returning();
    return { toolDataprivacyPurpose: t };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateToolDataprivacyPurpose = async (
  id: ToolDataprivacyPurposeId,
  toolDataprivacyPurpose: UpdateToolDataprivacyPurposeParams,
) => {
  const { session } = await getUserAuth();
  const { id: toolDataprivacyPurposeId } = toolDataprivacyPurposeIdSchema.parse(
    { id },
  );
  const newToolDataprivacyPurpose = updateToolDataprivacyPurposeSchema.parse({
    ...toolDataprivacyPurpose,
    userId: session?.user.id!,
  });
  try {
    const [t] = await db
      .update(toolDataprivacyPurposes)
      .set({ ...newToolDataprivacyPurpose, updatedAt: new Date() })
      .where(
        and(
          eq(toolDataprivacyPurposes.id, toolDataprivacyPurposeId!),
          eq(toolDataprivacyPurposes.userId, session?.user.id!),
        ),
      )
      .returning();
    return { toolDataprivacyPurpose: t };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteToolDataprivacyPurpose = async (
  id: ToolDataprivacyPurposeId,
) => {
  const { session } = await getUserAuth();
  const { id: toolDataprivacyPurposeId } = toolDataprivacyPurposeIdSchema.parse(
    { id },
  );
  try {
    const [t] = await db
      .delete(toolDataprivacyPurposes)
      .where(
        and(
          eq(toolDataprivacyPurposes.id, toolDataprivacyPurposeId!),
          eq(toolDataprivacyPurposes.userId, session?.user.id!),
        ),
      )
      .returning();
    return { toolDataprivacyPurpose: t };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
