import { eq } from "drizzle-orm";

import type { H5pLibraryId } from "../db/schema/h5pLibraries";
import { db } from "../db/index";
import { h5pLibraries, h5pLibraryIdSchema } from "../db/schema/h5pLibraries";

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
