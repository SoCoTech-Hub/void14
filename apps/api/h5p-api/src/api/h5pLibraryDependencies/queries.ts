import type { H5pLibraryDependencyId } from "@soco/h5p-db/schema/h5pLibraryDependencies";
import { eq } from "@soco/h5p-db";
import { db } from "@soco/h5p-db/client";
import { h5pLibraries } from "@soco/h5p-db/schema/h5pLibraries";
import {
  h5pLibraryDependencies,
  h5pLibraryDependencyIdSchema,
} from "@soco/h5p-db/schema/h5pLibraryDependencies";

export const getH5pLibraryDependencies = async () => {
  const rows = await db
    .select({
      h5pLibraryDependency: h5pLibraryDependencies,
      h5pLibrary: h5pLibraries,
    })
    .from(h5pLibraryDependencies)
    .leftJoin(
      h5pLibraries,
      eq(h5pLibraryDependencies.h5pLibraryId, h5pLibraries.id),
    );
  const h = rows.map((r) => ({
    ...r.h5pLibraryDependency,
    h5pLibrary: r.h5pLibrary,
  }));
  return { h5pLibraryDependencies: h };
};

export const getH5pLibraryDependencyById = async (
  id: H5pLibraryDependencyId,
) => {
  const { id: h5pLibraryDependencyId } = h5pLibraryDependencyIdSchema.parse({
    id,
  });
  const [row] = await db
    .select({
      h5pLibraryDependency: h5pLibraryDependencies,
      h5pLibrary: h5pLibraries,
    })
    .from(h5pLibraryDependencies)
    .where(eq(h5pLibraryDependencies.id, h5pLibraryDependencyId))
    .leftJoin(
      h5pLibraries,
      eq(h5pLibraryDependencies.h5pLibraryId, h5pLibraries.id),
    );
  if (row === undefined) return {};
  const h = { ...row.h5pLibraryDependency, h5pLibrary: row.h5pLibrary };
  return { h5pLibraryDependency: h };
};
