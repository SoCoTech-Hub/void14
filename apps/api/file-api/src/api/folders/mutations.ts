import type {
  FolderId,
  NewFolderParams,
  UpdateFolderParams,
} from "@soco/file-db/schema/folders";
import { eq } from "@soco/file-db";
import { db } from "@soco/file-db/client";
import {
  folderIdSchema,
  folders,
  insertFolderSchema,
  updateFolderSchema,
} from "@soco/file-db/schema/folders";

export const createFolder = async (folder: NewFolderParams) => {
  const newFolder = insertFolderSchema.parse(folder);
  try {
    const [f] = await db.insert(folders).values(newFolder).returning();
    return { folder: f };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateFolder = async (
  id: FolderId,
  folder: UpdateFolderParams,
) => {
  const { id: folderId } = folderIdSchema.parse({ id });
  const newFolder = updateFolderSchema.parse(folder);
  try {
    const [f] = await db
      .update(folders)
      .set({ ...newFolder, updatedAt: new Date() })
      .where(eq(folders.id, folderId!))
      .returning();
    return { folder: f };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteFolder = async (id: FolderId) => {
  const { id: folderId } = folderIdSchema.parse({ id });
  try {
    const [f] = await db
      .delete(folders)
      .where(eq(folders.id, folderId!))
      .returning();
    return { folder: f };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
