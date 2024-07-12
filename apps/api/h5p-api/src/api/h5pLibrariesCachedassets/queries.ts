import type { H5pLibrariesCachedassetId } from "@soco/h5p-db/schema/h5pLibrariesCachedassets";
import { eq } from "@soco/h5p-db";
import { db } from "@soco/h5p-db/client";
import { h5pLibraries } from "@soco/h5p-db/schema/h5pLibraries";
import {
  h5pLibrariesCachedassetIdSchema,
  h5pLibrariesCachedassets,
} from "@soco/h5p-db/schema/h5pLibrariesCachedassets";

export const getH5pLibrariesCachedassets = async () => {
  const rows = await db
    .select({
      h5pLibrariesCachedasset: h5pLibrariesCachedassets,
      h5pLibrary: h5pLibraries,
    })
    .from(h5pLibrariesCachedassets)
    .leftJoin(
      h5pLibraries,
      eq(h5pLibrariesCachedassets.h5pLibraryId, h5pLibraries.id),
    );
  const h = rows.map((r) => ({
    ...r.h5pLibrariesCachedasset,
    h5pLibrary: r.h5pLibrary,
  }));
  return { h5pLibrariesCachedassets: h };
};

export const getH5pLibrariesCachedassetById = async (
  id: H5pLibrariesCachedassetId,
) => {
  const { id: h5pLibrariesCachedassetId } =
    h5pLibrariesCachedassetIdSchema.parse({ id });
  const [row] = await db
    .select({
      h5pLibrariesCachedasset: h5pLibrariesCachedassets,
      h5pLibrary: h5pLibraries,
    })
    .from(h5pLibrariesCachedassets)
    .where(eq(h5pLibrariesCachedassets.id, h5pLibrariesCachedassetId))
    .leftJoin(
      h5pLibraries,
      eq(h5pLibrariesCachedassets.h5pLibraryId, h5pLibraries.id),
    );
  if (row === undefined) return {};
  const h = { ...row.h5pLibrariesCachedasset, h5pLibrary: row.h5pLibrary };
  return { h5pLibrariesCachedasset: h };
};
