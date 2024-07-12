import type { SearchIndexRequestId } from "@soco/search-db/schema/searchIndexRequests";
import { eq } from "@soco/search-db";
import { db } from "@soco/search-db/client";
import {
  searchIndexRequestIdSchema,
  searchIndexRequests,
} from "@soco/search-db/schema/searchIndexRequests";

export const getSearchIndexRequests = async () => {
  const rows = await db.select().from(searchIndexRequests);
  const s = rows;
  return { searchIndexRequests: s };
};

export const getSearchIndexRequestById = async (id: SearchIndexRequestId) => {
  const { id: searchIndexRequestId } = searchIndexRequestIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(searchIndexRequests)
    .where(eq(searchIndexRequests.id, searchIndexRequestId));
  if (row === undefined) return {};
  const s = row;
  return { searchIndexRequest: s };
};
