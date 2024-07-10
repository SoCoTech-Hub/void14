import { db } from "@soco/h5p-db/client";
import { eq } from "@soco/h5p-db";
import { type H5pContentsLibraryId, h5pContentsLibraryIdSchema, h5pContentsLibraries } from "@soco/h5p-db/schema/h5pContentsLibraries";

export const getH5pContentsLibraries = async () => {
  const rows = await db.select().from(h5pContentsLibraries);
  const h = rows
  return { h5pContentsLibraries: h };
};

export const getH5pContentsLibraryById = async (id: H5pContentsLibraryId) => {
  const { id: h5pContentsLibraryId } = h5pContentsLibraryIdSchema.parse({ id });
  const [row] = await db.select().from(h5pContentsLibraries).where(eq(h5pContentsLibraries.id, h5pContentsLibraryId));
  if (row === undefined) return {};
  const h = row;
  return { h5pContentsLibrary: h };
};


