import { eq } from "drizzle-orm";

import type { SearchIndexRequestId } from "../../db/schema/searchIndexRequests";
import { db } from "../../db/index";
import {
  searchIndexRequestIdSchema,
  searchIndexRequests,
} from "../../db/schema/searchIndexRequests";

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
