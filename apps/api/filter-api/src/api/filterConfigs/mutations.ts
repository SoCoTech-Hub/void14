import type {
  FilterConfigId,
  NewFilterConfigParams,
  UpdateFilterConfigParams,
} from "@soco/filter-db/schema/filterConfigs";
import { eq } from "@soco/filter-db";
import { db } from "@soco/filter-db/client";
import {
  filterConfigIdSchema,
  filterConfigs,
  insertFilterConfigSchema,
  updateFilterConfigSchema,
} from "@soco/filter-db/schema/filterConfigs";

export const createFilterConfig = async (
  filterConfig: NewFilterConfigParams,
) => {
  const newFilterConfig = insertFilterConfigSchema.parse(filterConfig);
  try {
    const [f] = await db
      .insert(filterConfigs)
      .values(newFilterConfig)
      .returning();
    return { filterConfig: f };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateFilterConfig = async (
  id: FilterConfigId,
  filterConfig: UpdateFilterConfigParams,
) => {
  const { id: filterConfigId } = filterConfigIdSchema.parse({ id });
  const newFilterConfig = updateFilterConfigSchema.parse(filterConfig);
  try {
    const [f] = await db
      .update(filterConfigs)
      .set(newFilterConfig)
      .where(eq(filterConfigs.id, filterConfigId!))
      .returning();
    return { filterConfig: f };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteFilterConfig = async (id: FilterConfigId) => {
  const { id: filterConfigId } = filterConfigIdSchema.parse({ id });
  try {
    const [f] = await db
      .delete(filterConfigs)
      .where(eq(filterConfigs.id, filterConfigId!))
      .returning();
    return { filterConfig: f };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
