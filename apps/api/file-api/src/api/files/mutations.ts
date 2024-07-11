import { getUserAuth } from "@soco/auth-service";
import { and, eq } from "@soco/file-db";
import { db } from "@soco/file-db/client";
import {
  FileId,
  fileIdSchema,
  files,
  insertFileSchema,
  NewFileParams,
  UpdateFileParams,
  updateFileSchema,
} from "@soco/file-db/schema/files";

export const createFile = async (file: NewFileParams) => {
  const { session } = await getUserAuth();
  const newFile = insertFileSchema.parse({
    ...file,
    userId: session?.user.id!,
  });
  try {
    const [f] = await db.insert(files).values(newFile).returning();
    return { file: f };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateFile = async (id: FileId, file: UpdateFileParams) => {
  const { session } = await getUserAuth();
  const { id: fileId } = fileIdSchema.parse({ id });
  const newFile = updateFileSchema.parse({
    ...file,
    userId: session?.user.id!,
  });
  try {
    const [f] = await db
      .update(files)
      .set({ ...newFile, updatedAt: new Date() })
      .where(and(eq(files.id, fileId!), eq(files.userId, session?.user.id!)))
      .returning();
    return { file: f };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteFile = async (id: FileId) => {
  const { session } = await getUserAuth();
  const { id: fileId } = fileIdSchema.parse({ id });
  try {
    const [f] = await db
      .delete(files)
      .where(and(eq(files.id, fileId!), eq(files.userId, session?.user.id!)))
      .returning();
    return { file: f };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
