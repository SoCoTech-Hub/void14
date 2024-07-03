import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { type FolderId, folderIdSchema, folders } from "@/lib/db/schema/folders";

export const getFolders = async () => {
  const rows = await db.select().from(folders);
  const f = rows
  return { folders: f };
};

export const getFolderById = async (id: FolderId) => {
  const { id: folderId } = folderIdSchema.parse({ id });
  const [row] = await db.select().from(folders).where(eq(folders.id, folderId));
  if (row === undefined) return {};
  const f = row;
  return { folder: f };
};


