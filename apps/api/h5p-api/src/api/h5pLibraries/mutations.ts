import type {
  H5pLibraryId,
  NewH5pLibraryParams,
  UpdateH5pLibraryParams,
} from "@soco/h5p-db/schema/h5pLibraries";
import { eq } from "@soco/h5p-db";
import { db } from "@soco/h5p-db/client";
import {
  h5pLibraries,
  h5pLibraryIdSchema,
  insertH5pLibrarySchema,
  updateH5pLibrarySchema,
} from "@soco/h5p-db/schema/h5pLibraries";

export const createH5pLibrary = async (h5pLibrary: NewH5pLibraryParams) => {
  const newH5pLibrary = insertH5pLibrarySchema.parse(h5pLibrary);
  try {
    const [h] = await db.insert(h5pLibraries).values(newH5pLibrary).returning();
    return { h5pLibrary: h };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateH5pLibrary = async (
  id: H5pLibraryId,
  h5pLibrary: UpdateH5pLibraryParams,
) => {
  const { id: h5pLibraryId } = h5pLibraryIdSchema.parse({ id });
  const newH5pLibrary = updateH5pLibrarySchema.parse(h5pLibrary);
  try {
    const [h] = await db
      .update(h5pLibraries)
      .set(newH5pLibrary)
      .where(eq(h5pLibraries.id, h5pLibraryId!))
      .returning();
    return { h5pLibrary: h };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteH5pLibrary = async (id: H5pLibraryId) => {
  const { id: h5pLibraryId } = h5pLibraryIdSchema.parse({ id });
  try {
    const [h] = await db
      .delete(h5pLibraries)
      .where(eq(h5pLibraries.id, h5pLibraryId!))
      .returning();
    return { h5pLibrary: h };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
