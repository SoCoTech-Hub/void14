import type { FileId } from "@soco/file-db/schema/files";
import { getUserAuth } from "@soco/auth-service";
import { and, eq } from "@soco/file-db";
import { db } from "@soco/file-db/client";
import { fileIdSchema, files } from "@soco/file-db/schema/files";

export const getFiles = async () => {
  const { session } = await getUserAuth();
  const rows = await db
    .select()
    .from(files)
    .where(eq(files.userId, session?.user.id!));
  const f = rows;
  return { files: f };
};

export const getFileById = async (id: FileId) => {
  const { session } = await getUserAuth();
  const { id: fileId } = fileIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(files)
    .where(and(eq(files.id, fileId), eq(files.userId, session?.user.id!)));
  if (row === undefined) return {};
  const f = row;
  return { file: f };
};
