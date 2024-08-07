import type { H5pLibraryId } from "@soco/h5p-db/schema/h5pLibraries";
import { eq } from "@soco/h5p-db";
import { db } from "@soco/h5p-db/client";
import {
  h5pLibraries,
  h5pLibraryIdSchema,
} from "@soco/h5p-db/schema/h5pLibraries";

export const getH5pLibraries = async () => {
  const rows = await db.select().from(h5pLibraries);
  const h = rows;
  return { h5pLibraries: h };
};

export const getH5pLibraryById = async (id: H5pLibraryId) => {
  const { id: h5pLibraryId } = h5pLibraryIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(h5pLibraries)
    .where(eq(h5pLibraries.id, h5pLibraryId));
  if (row === undefined) return {};
  const h = row;
  return { h5pLibrary: h };
};
