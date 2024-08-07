import type {
  InfectedFileId,
  NewInfectedFileParams,
  UpdateInfectedFileParams,
} from "@soco/file-db/schema/infectedFiles";
import { getUserAuth } from "@soco/auth-service";
import { and, eq } from "@soco/file-db";
import { db } from "@soco/file-db/client";
import {
  infectedFileIdSchema,
  infectedFiles,
  insertInfectedFileSchema,
  updateInfectedFileSchema,
} from "@soco/file-db/schema/infectedFiles";

export const createInfectedFile = async (
  infectedFile: NewInfectedFileParams,
) => {
  const { session } = await getUserAuth();
  const newInfectedFile = insertInfectedFileSchema.parse({
    ...infectedFile,
    userId: session?.user.id!,
  });
  try {
    const [i] = await db
      .insert(infectedFiles)
      .values(newInfectedFile)
      .returning();
    return { infectedFile: i };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateInfectedFile = async (
  id: InfectedFileId,
  infectedFile: UpdateInfectedFileParams,
) => {
  const { session } = await getUserAuth();
  const { id: infectedFileId } = infectedFileIdSchema.parse({ id });
  const newInfectedFile = updateInfectedFileSchema.parse({
    ...infectedFile,
    userId: session?.user.id!,
  });
  try {
    const [i] = await db
      .update(infectedFiles)
      .set({ ...newInfectedFile, updatedAt: new Date() })
      .where(
        and(
          eq(infectedFiles.id, infectedFileId!),
          eq(infectedFiles.userId, session?.user.id!),
        ),
      )
      .returning();
    return { infectedFile: i };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteInfectedFile = async (id: InfectedFileId) => {
  const { session } = await getUserAuth();
  const { id: infectedFileId } = infectedFileIdSchema.parse({ id });
  try {
    const [i] = await db
      .delete(infectedFiles)
      .where(
        and(
          eq(infectedFiles.id, infectedFileId!),
          eq(infectedFiles.userId, session?.user.id!),
        ),
      )
      .returning();
    return { infectedFile: i };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
