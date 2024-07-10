import { db } from "@soco/analytics-db/client";
import { eq, and } from "@soco/analytics-db";
import { getUserAuth } from "@/lib/auth/utils";
import { type AnalyticsPredictionActionId, analyticsPredictionActionIdSchema, analyticsPredictionActions } from "@soco/analytics-db/schema/analyticsPredictionActions";

export const getAnalyticsPredictionActions = async () => {
  const { session } = await getUserAuth();
  const rows = await db.select().from(analyticsPredictionActions).where(eq(analyticsPredictionActions.userId, session?.user.id!));
  const a = rows
  return { analyticsPredictionActions: a };
};

export const getAnalyticsPredictionActionById = async (id: AnalyticsPredictionActionId) => {
  const { session } = await getUserAuth();
  const { id: analyticsPredictionActionId } = analyticsPredictionActionIdSchema.parse({ id });
  const [row] = await db.select().from(analyticsPredictionActions).where(and(eq(analyticsPredictionActions.id, analyticsPredictionActionId), eq(analyticsPredictionActions.userId, session?.user.id!)));
  if (row === undefined) return {};
  const a = row;
  return { analyticsPredictionAction: a };
};


