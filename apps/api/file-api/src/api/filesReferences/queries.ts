import { db } from "@soco/file-db/client";
import { eq } from "@soco/file-db";
import { type FilesReferenceId, filesReferenceIdSchema, filesReferences } from "@soco/file-db/schema/filesReferences";

export const getFilesReferences = async () => {
  const rows = await db.select().from(filesReferences);
  const f = rows
  return { filesReferences: f };
};

export const getFilesReferenceById = async (id: FilesReferenceId) => {
  const { id: filesReferenceId } = filesReferenceIdSchema.parse({ id });
  const [row] = await db.select().from(filesReferences).where(eq(filesReferences.id, filesReferenceId));
  if (row === undefined) return {};
  const f = row;
  return { filesReference: f };
};


