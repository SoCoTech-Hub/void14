import { eq } from "drizzle-orm";

import type { AnalyticsIndicatorCalcId } from "../db/schema/analyticsIndicatorCalcs";
import { db } from "../db/index";
import {
  analyticsIndicatorCalcIdSchema,
  analyticsIndicatorCalcs,
} from "../db/schema/analyticsIndicatorCalcs";

export const getAnalyticsIndicatorCalcs = async () => {
  const rows = await db.select().from(analyticsIndicatorCalcs);
  const a = rows;
  return { analyticsIndicatorCalcs: a };
};

export const getAnalyticsIndicatorCalcById = async (
  id: AnalyticsIndicatorCalcId,
) => {
  const { id: analyticsIndicatorCalcId } = analyticsIndicatorCalcIdSchema.parse(
    { id },
  );
  const [row] = await db
    .select()
    .from(analyticsIndicatorCalcs)
    .where(eq(analyticsIndicatorCalcs.id, analyticsIndicatorCalcId));
  if (row === undefined) return {};
  const a = row;
  return { analyticsIndicatorCalc: a };
};
