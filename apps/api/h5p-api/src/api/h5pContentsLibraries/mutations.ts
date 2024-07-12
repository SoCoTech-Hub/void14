import type {
  H5pContentsLibraryId,
  NewH5pContentsLibraryParams,
  UpdateH5pContentsLibraryParams,
} from "@soco/h5p-db/schema/h5pContentsLibraries";
import { eq } from "@soco/h5p-db";
import { db } from "@soco/h5p-db/client";
import {
  h5pContentsLibraries,
  h5pContentsLibraryIdSchema,
  insertH5pContentsLibrarySchema,
  updateH5pContentsLibrarySchema,
} from "@soco/h5p-db/schema/h5pContentsLibraries";

export const createH5pContentsLibrary = async (
  h5pContentsLibrary: NewH5pContentsLibraryParams,
) => {
  const newH5pContentsLibrary =
    insertH5pContentsLibrarySchema.parse(h5pContentsLibrary);
  try {
    const [h] = await db
      .insert(h5pContentsLibraries)
      .values(newH5pContentsLibrary)
      .returning();
    return { h5pContentsLibrary: h };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateH5pContentsLibrary = async (
  id: H5pContentsLibraryId,
  h5pContentsLibrary: UpdateH5pContentsLibraryParams,
) => {
  const { id: h5pContentsLibraryId } = h5pContentsLibraryIdSchema.parse({ id });
  const newH5pContentsLibrary =
    updateH5pContentsLibrarySchema.parse(h5pContentsLibrary);
  try {
    const [h] = await db
      .update(h5pContentsLibraries)
      .set(newH5pContentsLibrary)
      .where(eq(h5pContentsLibraries.id, h5pContentsLibraryId!))
      .returning();
    return { h5pContentsLibrary: h };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteH5pContentsLibrary = async (id: H5pContentsLibraryId) => {
  const { id: h5pContentsLibraryId } = h5pContentsLibraryIdSchema.parse({ id });
  try {
    const [h] = await db
      .delete(h5pContentsLibraries)
      .where(eq(h5pContentsLibraries.id, h5pContentsLibraryId!))
      .returning();
    return { h5pContentsLibrary: h };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
