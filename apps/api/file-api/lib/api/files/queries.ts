import { and, eq } from "drizzle-orm";

import { getUserAuth } from "@soco/auth/utils";

import type { FileId } from "../../db/schema/files";
import { db } from "../../db/index";
import { fileIdSchema, files } from "../../db/schema/files";

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
