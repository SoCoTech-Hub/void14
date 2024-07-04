import { and, eq } from "drizzle-orm";

import { getUserAuth } from "@soco/auth/utils";

import { db } from "../db/index";
import {
  insertReportbuilderAudienceSchema,
  NewReportbuilderAudienceParams,
  ReportbuilderAudienceId,
  reportbuilderAudienceIdSchema,
  reportbuilderAudiences,
  UpdateReportbuilderAudienceParams,
  updateReportbuilderAudienceSchema,
} from "../db/schema/reportbuilderAudiences";

export const createReportbuilderAudience = async (
  reportbuilderAudience: NewReportbuilderAudienceParams,
) => {
  const { session } = await getUserAuth();
  const newReportbuilderAudience = insertReportbuilderAudienceSchema.parse({
    ...reportbuilderAudience,
    userId: session?.user.id!,
  });
  try {
    const [r] = await db
      .insert(reportbuilderAudiences)
      .values(newReportbuilderAudience)
      .returning();
    return { reportbuilderAudience: r };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateReportbuilderAudience = async (
  id: ReportbuilderAudienceId,
  reportbuilderAudience: UpdateReportbuilderAudienceParams,
) => {
  const { session } = await getUserAuth();
  const { id: reportbuilderAudienceId } = reportbuilderAudienceIdSchema.parse({
    id,
  });
  const newReportbuilderAudience = updateReportbuilderAudienceSchema.parse({
    ...reportbuilderAudience,
    userId: session?.user.id!,
  });
  try {
    const [r] = await db
      .update(reportbuilderAudiences)
      .set({ ...newReportbuilderAudience, updatedAt: new Date() })
      .where(
        and(
          eq(reportbuilderAudiences.id, reportbuilderAudienceId!),
          eq(reportbuilderAudiences.userId, session?.user.id!),
        ),
      )
      .returning();
    return { reportbuilderAudience: r };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteReportbuilderAudience = async (
  id: ReportbuilderAudienceId,
) => {
  const { session } = await getUserAuth();
  const { id: reportbuilderAudienceId } = reportbuilderAudienceIdSchema.parse({
    id,
  });
  try {
    const [r] = await db
      .delete(reportbuilderAudiences)
      .where(
        and(
          eq(reportbuilderAudiences.id, reportbuilderAudienceId!),
          eq(reportbuilderAudiences.userId, session?.user.id!),
        ),
      )
      .returning();
    return { reportbuilderAudience: r };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
