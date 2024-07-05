import { eq } from "drizzle-orm";

import type { AnalyticsUsedAnalysableId } from "../../db/schema/analyticsUsedAnalysables";
import { db } from "../../db/index";
import {
  analyticsUsedAnalysableIdSchema,
  analyticsUsedAnalysables,
} from "../../db/schema/analyticsUsedAnalysables";

export const getAnalyticsUsedAnalysables = async () => {
  const rows = await db.select().from(analyticsUsedAnalysables);
  const a = rows;
  return { analyticsUsedAnalysables: a };
};

export const getAnalyticsUsedAnalysableById = async (
  id: AnalyticsUsedAnalysableId,
) => {
  const { id: analyticsUsedAnalysableId } =
    analyticsUsedAnalysableIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(analyticsUsedAnalysables)
    .where(eq(analyticsUsedAnalysables.id, analyticsUsedAnalysableId));
  if (row === undefined) return {};
  const a = row;
  return { analyticsUsedAnalysable: a };
};
