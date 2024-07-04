import { and, eq } from "drizzle-orm";

import { getUserAuth } from "@soco/auth/utils";

import type { AnalyticsModelId } from "../db/schema/analyticsModels";
import { db } from "../db/index";
import {
  analyticsModelIdSchema,
  analyticsModels,
} from "../db/schema/analyticsModels";

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
