import { and, eq } from "drizzle-orm";

import { getUserAuth } from "@soco/auth-services";
import { db } from "@soco/report-builder-db/index";
import {
  insertReportbuilderFilterSchema,
  NewReportbuilderFilterParams,
  ReportbuilderFilterId,
  reportbuilderFilterIdSchema,
  reportbuilderFilters,
  UpdateReportbuilderFilterParams,
  updateReportbuilderFilterSchema,
} from "@soco/report-builder-db/schema/reportbuilderFilters";

export const createReportbuilderFilter = async (
  reportbuilderFilter: NewReportbuilderFilterParams,
) => {
  const { session } = await getUserAuth();
  const newReportbuilderFilter = insertReportbuilderFilterSchema.parse({
    ...reportbuilderFilter,
    userId: session?.user.id!,
  });
  try {
    const [r] = await db
      .insert(reportbuilderFilters)
      .values(newReportbuilderFilter)
      .returning();
    return { reportbuilderFilter: r };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateReportbuilderFilter = async (
  id: ReportbuilderFilterId,
  reportbuilderFilter: UpdateReportbuilderFilterParams,
) => {
  const { session } = await getUserAuth();
  const { id: reportbuilderFilterId } = reportbuilderFilterIdSchema.parse({
    id,
  });
  const newReportbuilderFilter = updateReportbuilderFilterSchema.parse({
    ...reportbuilderFilter,
    userId: session?.user.id!,
  });
  try {
    const [r] = await db
      .update(reportbuilderFilters)
      .set({ ...newReportbuilderFilter, updatedAt: new Date() })
      .where(
        and(
          eq(reportbuilderFilters.id, reportbuilderFilterId!),
          eq(reportbuilderFilters.userId, session?.user.id!),
        ),
      )
      .returning();
    return { reportbuilderFilter: r };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteReportbuilderFilter = async (id: ReportbuilderFilterId) => {
  const { session } = await getUserAuth();
  const { id: reportbuilderFilterId } = reportbuilderFilterIdSchema.parse({
    id,
  });
  try {
    const [r] = await db
      .delete(reportbuilderFilters)
      .where(
        and(
          eq(reportbuilderFilters.id, reportbuilderFilterId!),
          eq(reportbuilderFilters.userId, session?.user.id!),
        ),
      )
      .returning();
    return { reportbuilderFilter: r };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};