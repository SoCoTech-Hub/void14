import type { AnalyticsModelLogId } from "@soco/analytics-db/schema/analyticsModelLogs";
import { and, db, eq } from "@soco/analytics-db";
import {
  analyticsModelLogIdSchema,
  analyticsModelLogs,
} from "@soco/analytics-db/schema/analyticsModelLogs";
import { getUserAuth } from "@soco/auth-services";

export const getAnalyticsModelLogs = async () => {
  const { session } = await getUserAuth();
  const rows = await db
    .select()
    .from(analyticsModelLogs)
    .where(eq(analyticsModelLogs.userId, session?.user.id!));
  const a = rows;
  return { analyticsModelLogs: a };
};

export const getAnalyticsModelLogById = async (id: AnalyticsModelLogId) => {
  const { session } = await getUserAuth();
  const { id: analyticsModelLogId } = analyticsModelLogIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(analyticsModelLogs)
    .where(
      and(
        eq(analyticsModelLogs.id, analyticsModelLogId),
        eq(analyticsModelLogs.userId, session?.user.id!),
      ),
    );
  if (row === undefined) return {};
  const a = row;
  return { analyticsModelLog: a };
};
