import type {
  NewSearchIndexRequestParams,
  SearchIndexRequestId,
  UpdateSearchIndexRequestParams,
} from "@soco/search-db/schema/searchIndexRequests";
import { eq } from "@soco/search-db";
import { db } from "@soco/search-db/client";
import {
  insertSearchIndexRequestSchema,
  searchIndexRequestIdSchema,
  searchIndexRequests,
  updateSearchIndexRequestSchema,
} from "@soco/search-db/schema/searchIndexRequests";

export const createSearchIndexRequest = async (
  searchIndexRequest: NewSearchIndexRequestParams,
) => {
  const newSearchIndexRequest =
    insertSearchIndexRequestSchema.parse(searchIndexRequest);
  try {
    const [s] = await db
      .insert(searchIndexRequests)
      .values(newSearchIndexRequest)
      .returning();
    return { searchIndexRequest: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateSearchIndexRequest = async (
  id: SearchIndexRequestId,
  searchIndexRequest: UpdateSearchIndexRequestParams,
) => {
  const { id: searchIndexRequestId } = searchIndexRequestIdSchema.parse({ id });
  const newSearchIndexRequest =
    updateSearchIndexRequestSchema.parse(searchIndexRequest);
  try {
    const [s] = await db
      .update(searchIndexRequests)
      .set({ ...newSearchIndexRequest, updatedAt: new Date() })
      .where(eq(searchIndexRequests.id, searchIndexRequestId!))
      .returning();
    return { searchIndexRequest: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteSearchIndexRequest = async (id: SearchIndexRequestId) => {
  const { id: searchIndexRequestId } = searchIndexRequestIdSchema.parse({ id });
  try {
    const [s] = await db
      .delete(searchIndexRequests)
      .where(eq(searchIndexRequests.id, searchIndexRequestId!))
      .returning();
    return { searchIndexRequest: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
