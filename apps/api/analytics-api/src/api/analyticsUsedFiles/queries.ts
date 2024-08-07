import type { AnalyticsUsedFileId } from "@soco/analytics-db/schema/analyticsUsedFiles";
import { eq } from "@soco/analytics-db";
import { db } from "@soco/analytics-db/client";
import {
  analyticsUsedFileIdSchema,
  analyticsUsedFiles,
} from "@soco/analytics-db/schema/analyticsUsedFiles";

export const getAnalyticsUsedFiles = async () => {
  const rows = await db.select().from(analyticsUsedFiles);
  const a = rows;
  return { analyticsUsedFiles: a };
};

export const getAnalyticsUsedFileById = async (id: AnalyticsUsedFileId) => {
  const { id: analyticsUsedFileId } = analyticsUsedFileIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(analyticsUsedFiles)
    .where(eq(analyticsUsedFiles.id, analyticsUsedFileId));
  if (row === undefined) return {};
  const a = row;
  return { analyticsUsedFile: a };
};
