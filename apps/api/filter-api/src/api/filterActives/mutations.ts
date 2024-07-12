import type {
  FilterActiveId,
  NewFilterActiveParams,
  UpdateFilterActiveParams,
} from "@soco/filter-db/schema/filterActives";
import { eq } from "@soco/filter-db";
import { db } from "@soco/filter-db/client";
import {
  filterActiveIdSchema,
  filterActives,
  insertFilterActiveSchema,
  updateFilterActiveSchema,
} from "@soco/filter-db/schema/filterActives";

export const createFilterActive = async (
  filterActive: NewFilterActiveParams,
) => {
  const newFilterActive = insertFilterActiveSchema.parse(filterActive);
  try {
    const [f] = await db
      .insert(filterActives)
      .values(newFilterActive)
      .returning();
    return { filterActive: f };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateFilterActive = async (
  id: FilterActiveId,
  filterActive: UpdateFilterActiveParams,
) => {
  const { id: filterActiveId } = filterActiveIdSchema.parse({ id });
  const newFilterActive = updateFilterActiveSchema.parse(filterActive);
  try {
    const [f] = await db
      .update(filterActives)
      .set(newFilterActive)
      .where(eq(filterActives.id, filterActiveId!))
      .returning();
    return { filterActive: f };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteFilterActive = async (id: FilterActiveId) => {
  const { id: filterActiveId } = filterActiveIdSchema.parse({ id });
  try {
    const [f] = await db
      .delete(filterActives)
      .where(eq(filterActives.id, filterActiveId!))
      .returning();
    return { filterActive: f };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
