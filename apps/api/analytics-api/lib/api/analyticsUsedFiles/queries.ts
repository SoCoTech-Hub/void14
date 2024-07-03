import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { type AnalyticsUsedFileId, analyticsUsedFileIdSchema, analyticsUsedFiles } from "@/lib/db/schema/analyticsUsedFiles";

export const getAnalyticsUsedFiles = async () => {
  const rows = await db.select().from(analyticsUsedFiles);
  const a = rows
  return { analyticsUsedFiles: a };
};

export const getAnalyticsUsedFileById = async (id: AnalyticsUsedFileId) => {
  const { id: analyticsUsedFileId } = analyticsUsedFileIdSchema.parse({ id });
  const [row] = await db.select().from(analyticsUsedFiles).where(eq(analyticsUsedFiles.id, analyticsUsedFileId));
  if (row === undefined) return {};
  const a = row;
  return { analyticsUsedFile: a };
};


