import type { AnalyticsModelId } from "@soco/analytics-db/schema/analyticsModels";
import { and, db, eq } from "@soco/analytics-db";
import {
  analyticsModelIdSchema,
  analyticsModels,
} from "@soco/analytics-db/schema/analyticsModels";
import { getUserAuth } from "@soco/auth-services";

export const getAnalyticsModels = async () => {
  const { session } = await getUserAuth();
  const rows = await db
    .select()
    .from(analyticsModels)
    .where(eq(analyticsModels.userId, session?.user.id!));
  const a = rows;
  return { analyticsModels: a };
};

export const getAnalyticsModelById = async (id: AnalyticsModelId) => {
  const { session } = await getUserAuth();
  const { id: analyticsModelId } = analyticsModelIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(analyticsModels)
    .where(
      and(
        eq(analyticsModels.id, analyticsModelId),
        eq(analyticsModels.userId, session?.user.id!),
      ),
    );
  if (row === undefined) return {};
  const a = row;
  return { analyticsModel: a };
};
