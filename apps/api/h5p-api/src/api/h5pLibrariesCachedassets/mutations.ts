import { db } from "@soco/h5p-db/client";
import { eq } from "@soco/h5p-db";
import { 
  H5pLibrariesCachedassetId, 
  NewH5pLibrariesCachedassetParams,
  UpdateH5pLibrariesCachedassetParams, 
  updateH5pLibrariesCachedassetSchema,
  insertH5pLibrariesCachedassetSchema, 
  h5pLibrariesCachedassets,
  h5pLibrariesCachedassetIdSchema 
} from "@soco/h5p-db/schema/h5pLibrariesCachedassets";

export const createH5pLibrariesCachedasset = async (h5pLibrariesCachedasset: NewH5pLibrariesCachedassetParams) => {
  const newH5pLibrariesCachedasset = insertH5pLibrariesCachedassetSchema.parse(h5pLibrariesCachedasset);
  try {
    const [h] =  await db.insert(h5pLibrariesCachedassets).values(newH5pLibrariesCachedasset).returning();
    return { h5pLibrariesCachedasset: h };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateH5pLibrariesCachedasset = async (id: H5pLibrariesCachedassetId, h5pLibrariesCachedasset: UpdateH5pLibrariesCachedassetParams) => {
  const { id: h5pLibrariesCachedassetId } = h5pLibrariesCachedassetIdSchema.parse({ id });
  const newH5pLibrariesCachedasset = updateH5pLibrariesCachedassetSchema.parse(h5pLibrariesCachedasset);
  try {
    const [h] =  await db
     .update(h5pLibrariesCachedassets)
     .set(newH5pLibrariesCachedasset)
     .where(eq(h5pLibrariesCachedassets.id, h5pLibrariesCachedassetId!))
     .returning();
    return { h5pLibrariesCachedasset: h };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteH5pLibrariesCachedasset = async (id: H5pLibrariesCachedassetId) => {
  const { id: h5pLibrariesCachedassetId } = h5pLibrariesCachedassetIdSchema.parse({ id });
  try {
    const [h] =  await db.delete(h5pLibrariesCachedassets).where(eq(h5pLibrariesCachedassets.id, h5pLibrariesCachedassetId!))
    .returning();
    return { h5pLibrariesCachedasset: h };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

