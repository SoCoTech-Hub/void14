import { and, eq } from "drizzle-orm";

import { getUserAuth } from "@soco/auth/utils";

import { db } from "../db/index";
import {
  AnalyticsPredictionActionId,
  analyticsPredictionActionIdSchema,
  analyticsPredictionActions,
  insertAnalyticsPredictionActionSchema,
  NewAnalyticsPredictionActionParams,
  UpdateAnalyticsPredictionActionParams,
  updateAnalyticsPredictionActionSchema,
} from "../db/schema/analyticsPredictionActions";

export const createAnalyticsPredictionAction = async (
  analyticsPredictionAction: NewAnalyticsPredictionActionParams,
) => {
  const { session } = await getUserAuth();
  const newAnalyticsPredictionAction =
    insertAnalyticsPredictionActionSchema.parse({
      ...analyticsPredictionAction,
      userId: session?.user.id!,
    });
  try {
    const [a] = await db
      .insert(analyticsPredictionActions)
      .values(newAnalyticsPredictionAction)
      .returning();
    return { analyticsPredictionAction: a };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateAnalyticsPredictionAction = async (
  id: AnalyticsPredictionActionId,
  analyticsPredictionAction: UpdateAnalyticsPredictionActionParams,
) => {
  const { session } = await getUserAuth();
  const { id: analyticsPredictionActionId } =
    analyticsPredictionActionIdSchema.parse({ id });
  const newAnalyticsPredictionAction =
    updateAnalyticsPredictionActionSchema.parse({
      ...analyticsPredictionAction,
      userId: session?.user.id!,
    });
  try {
    const [a] = await db
      .update(analyticsPredictionActions)
      .set({ ...newAnalyticsPredictionAction, updatedAt: new Date() })
      .where(
        and(
          eq(analyticsPredictionActions.id, analyticsPredictionActionId!),
          eq(analyticsPredictionActions.userId, session?.user.id!),
        ),
      )
      .returning();
    return { analyticsPredictionAction: a };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteAnalyticsPredictionAction = async (
  id: AnalyticsPredictionActionId,
) => {
  const { session } = await getUserAuth();
  const { id: analyticsPredictionActionId } =
    analyticsPredictionActionIdSchema.parse({ id });
  try {
    const [a] = await db
      .delete(analyticsPredictionActions)
      .where(
        and(
          eq(analyticsPredictionActions.id, analyticsPredictionActionId!),
          eq(analyticsPredictionActions.userId, session?.user.id!),
        ),
      )
      .returning();
    return { analyticsPredictionAction: a };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
